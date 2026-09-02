import { sendGraphicsHouseLeadEmail } from "@/modules/marketplace/server/lead-notify-email";
import { GRAPHICS_HOUSE_URL } from "@/shared/constants/brand";

type GraphicsHouseLeadPayload = {
  leadId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  companyName?: string | null;
  jobTitle?: string;
  serviceInterest?: string;
  inquiryType?: string;
  citySlug?: string | null;
  projectType: string;
  projectDetails: string;
  budgetRange?: string | null;
  locale: string;
  referrer?: "visualization_page" | "request_quote";
};

export async function notifyGraphicsHouseLead(payload: GraphicsHouseLeadPayload): Promise<void> {
  const body = {
    source: "ruwaq.co",
    event: "graphics_house_lead",
    partnerUrl: GRAPHICS_HOUSE_URL,
    ...payload,
  };

  console.info("[partner-lead]", JSON.stringify(body));

  await sendGraphicsHouseLeadEmail(payload);

  const webhook = process.env.GRAPHICS_HOUSE_LEAD_WEBHOOK_URL?.trim();
  if (!webhook) return;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[partner-lead] GH webhook HTTP", res.status, await res.text());
    }
  } catch (err) {
    console.error("[partner-lead] GH webhook failed", err);
  }
}
