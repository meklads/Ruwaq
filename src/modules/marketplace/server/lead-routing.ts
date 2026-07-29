import type { MarketplaceLeadStatus } from "@prisma/client";
import { getCategoryBySlug } from "@/shared/constants/marketplace-taxonomy";

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
  projectDetails: string;
}) {
  const webhook = process.env.TURRIVA_LEAD_WEBHOOK_URL?.trim();
  const body = {
    source: "ruwaq.co",
    ...payload,
    turrivaUrl: "https://turriva.com",
  };

  console.info("[marketplace-lead]", JSON.stringify(body));

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("[marketplace-lead] webhook failed", err);
    }
  }
}
