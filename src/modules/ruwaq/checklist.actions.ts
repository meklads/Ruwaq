"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import { leadReferenceCode, normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import { sendQuoteCheckOpsEmail } from "@/modules/marketplace/server/lead-notify-email";
import { logUsageEvent } from "@/shared/lib/usage-events";

const schema = z.object({
  clientName: z.string().trim().min(2).max(120),
  clientPhone: z
    .string()
    .trim()
    .min(9)
    .max(24)
    .superRefine((value, ctx) => {
      try {
        normalizeKsaPhone(value);
      } catch {
        ctx.addIssue({ code: "custom", message: "invalid_phone" });
      }
    })
    .transform((value) => normalizeKsaPhone(value)),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type ChecklistLeadResult = { success: true } | { success: false; error: "invalid_phone" | "validation" | "server" };

/** Lead magnet: «١٢ سؤالاً قبل التوقيع». Stored as a nurture lead, ops notified. */
export async function submitChecklistLead(input: z.input<typeof schema>): Promise<ChecklistLeadResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message;
    return { success: false, error: code === "invalid_phone" ? "invalid_phone" : "validation" };
  }
  const d = parsed.data;
  const details = "طلب قائمة «١٢ سؤالاً قبل توقيع عقد التشطيب». تواصل مرة واحدة لسؤاله إن كان لديه عرض يرغب في فحصه.";

  try {
    const lead = await db.partnerLead.create({
      data: {
        source: "RUWAQ_CHECKLIST",
        clientName: d.clientName,
        clientPhone: d.clientPhone,
        projectType: "checklist",
        projectDetails: details,
        locale: d.locale,
      },
    });

    try {
      await sendQuoteCheckOpsEmail({
        leadId: lead.id,
        referenceCode: leadReferenceCode(lead.id),
        clientName: d.clientName,
        clientPhone: d.clientPhone,
        cityLabel: "—",
        projectTypeLabel: "—",
        packageLabel: "قائمة ١٢ سؤالاً (عميل محتمل)",
        details,
        locale: d.locale,
      });
    } catch (err) {
      console.error("[submitChecklistLead] notify failed (lead saved)", err);
    }

    logUsageEvent("checklist_lead_submitted", { metadata: { leadId: lead.id, locale: d.locale } });
    return { success: true };
  } catch (err) {
    console.error("[submitChecklistLead]", err);
    return { success: false, error: "server" };
  }
}
