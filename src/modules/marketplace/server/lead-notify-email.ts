import { Resend } from "resend";
import type { MarketplaceLeadStatus } from "@prisma/client";

type TurrivaEmailPayload = {
  leadId: string;
  clientName: string;
  clientPhone: string;
  city: string;
  categorySlug: string;
  categoryLabel: string;
  projectDetails: string;
  budgetRange?: string | null;
  status: MarketplaceLeadStatus;
};

type GraphicsHouseEmailPayload = {
  leadId: string;
  clientName: string;
  clientPhone: string;
  companyName?: string | null;
  citySlug?: string | null;
  projectType: string;
  projectDetails: string;
  budgetRange?: string | null;
  locale: string;
};

export async function sendTurrivaLeadEmail(payload: TurrivaEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toRaw = process.env.TURRIVA_LEAD_EMAIL?.trim();
  if (!apiKey || !toRaw) return;

  const to = toRaw.split(",").map((e) => e.trim()).filter(Boolean);
  if (to.length === 0) return;

  const from = process.env.RESEND_FROM?.trim() || "Ruwaq Leads <onboarding@resend.dev>";
  const subject = `[Ruwaq] ${payload.categoryLabel} — ${payload.clientName} (${payload.city})`;

  const text = [
    `New marketplace lead (${payload.status})`,
    `Lead ID: ${payload.leadId}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.clientPhone}`,
    `City: ${payload.city}`,
    `Category: ${payload.categorySlug} — ${payload.categoryLabel}`,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : null,
    "",
    "Project details:",
    payload.projectDetails,
    "",
    `Admin: ${process.env.NEXT_PUBLIC_APP_URL ?? "https://ruwaq.co"}/workspace/admin/leads`,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({ from, to, subject, text });
  } catch (err) {
    console.error("[marketplace-lead] Resend email failed", err);
  }
}

export async function sendGraphicsHouseLeadEmail(
  payload: GraphicsHouseEmailPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toRaw =
    process.env.GRAPHICS_HOUSE_LEAD_EMAIL?.trim() || process.env.TURRIVA_LEAD_EMAIL?.trim();
  if (!apiKey || !toRaw) return;

  const to = toRaw.split(",").map((e) => e.trim()).filter(Boolean);
  if (to.length === 0) return;

  const from = process.env.RESEND_FROM?.trim() || "Ruwaq Leads <onboarding@resend.dev>";
  const cityPart = payload.citySlug ? ` (${payload.citySlug})` : "";
  const subject = `[Ruwaq → GH] ${payload.projectType} — ${payload.clientName}${cityPart}`;

  const text = [
    "New Graphics House visualization lead from Ruwaq",
    `Lead ID: ${payload.leadId}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.clientPhone}`,
    payload.companyName ? `Company: ${payload.companyName}` : null,
    payload.citySlug ? `City: ${payload.citySlug}` : null,
    `Project type: ${payload.projectType}`,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : null,
    `Locale: ${payload.locale}`,
    "",
    "Project details:",
    payload.projectDetails,
    "",
    `Admin: ${process.env.NEXT_PUBLIC_APP_URL ?? "https://ruwaq.co"}/workspace/admin/leads`,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({ from, to, subject, text });
  } catch (err) {
    console.error("[partner-lead] Resend email failed", err);
  }
}
