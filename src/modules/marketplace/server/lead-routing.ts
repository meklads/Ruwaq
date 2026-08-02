import type { MarketplaceLeadStatus } from "@prisma/client";
import { getCategoryBySlug } from "@/shared/constants/marketplace-taxonomy";
import {
  sendRuwaqOpsLeadEmail,
  sendTurrivaLeadEmail,
} from "@/modules/marketplace/server/lead-notify-email";

const TURRIVA_SLUGS = new Set(["fit-out", "contracting"]);

export function resolveLeadStatus(categorySlug: string): MarketplaceLeadStatus {
  if (TURRIVA_SLUGS.has(categorySlug)) {
    return "ASSIGNED_TO_TURRIVA";
  }
  return "BROADCASTED_TO_PARTNERS";
}

export function buildRoutingNote(categorySlug: string): string {
  const cat = getCategoryBySlug(categorySlug);
  if (TURRIVA_SLUGS.has(categorySlug)) {
    return `Turriva capture: ${cat?.nameAr ?? categorySlug}`;
  }
  return `Partner broadcast: ${cat?.nameAr ?? categorySlug}`;
}

export async function notifyLeadRouting(payload: {
  leadId: string;
  status: MarketplaceLeadStatus;
  clientName: string;
  clientPhone: string;
  city: string;
  categorySlug: string;
  categoryLabel: string;
  projectDetails: string;
  budgetRange?: string | null;
  locale: "ar" | "en";
  referenceCode: string;
}) {
  const webhook = process.env.TURRIVA_LEAD_WEBHOOK_URL?.trim();
  const body = {
    source: "ruwaq.co",
    event: payload.status === "ASSIGNED_TO_TURRIVA" ? "turriva_lead" : "partner_broadcast",
    ...payload,
    turrivaUrl: "https://turriva.com",
  };

  console.info("[marketplace-lead]", JSON.stringify(body));

  await sendRuwaqOpsLeadEmail(payload);

  if (payload.status === "ASSIGNED_TO_TURRIVA") {
    await sendTurrivaLeadEmail(payload);
  }

  if (webhook && payload.status === "ASSIGNED_TO_TURRIVA") {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error("[marketplace-lead] webhook HTTP", res.status, await res.text());
      }
    } catch (err) {
      console.error("[marketplace-lead] webhook failed", err);
    }
  }

  const partnerWebhook = process.env.PARTNER_LEAD_WEBHOOK_URL?.trim();
  if (partnerWebhook && payload.status === "BROADCASTED_TO_PARTNERS") {
    try {
      const res = await fetch(partnerWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error("[marketplace-lead] partner webhook HTTP", res.status, await res.text());
      }
    } catch (err) {
      console.error("[marketplace-lead] partner webhook failed", err);
    }
  }
}
