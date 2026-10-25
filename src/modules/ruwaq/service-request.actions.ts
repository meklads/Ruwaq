"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import {
  buildWhatsAppUrl,
  leadReferenceCode,
  normalizeKsaPhone,
  supportWhatsAppE164,
} from "@/modules/marketplace/lib/lead-phone";
import {
  SERVICE_CITY_KEYS,
  SERVICE_KEYS,
  SERVICE_PROJECT_KEYS,
  SERVICE_STAGE_KEYS,
} from "@/modules/ruwaq/service-request";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { sendQuoteCheckOpsEmail } from "@/modules/marketplace/server/lead-notify-email";
import { logUsageEvent } from "@/shared/lib/usage-events";

const ksaPhone = z
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
  .transform((value) => normalizeKsaPhone(value));

const schema = z.object({
  service: z.enum(SERVICE_KEYS),
  clientName: z.string().trim().min(2).max(120),
  clientPhone: ksaPhone,
  city: z.enum(SERVICE_CITY_KEYS),
  projectType: z.enum(SERVICE_PROJECT_KEYS),
  stage: z.enum(SERVICE_STAGE_KEYS),
  areaSqm: z.coerce.number().int().min(20).max(50000).optional(),
  budget: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(2000).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitServiceRequestInput = z.input<typeof schema>;
export type SubmitServiceRequestResult =
  | { success: true; referenceCode: string; whatsAppUrl: string | null }
  | { success: false; error: "invalid_phone" | "validation" | "server" };

const CITY_ENUM: Record<string, "JEDDAH" | "MAKKAH" | "MADINAH" | null> = {
  jeddah: "JEDDAH",
  makkah: "MAKKAH",
  madinah: "MADINAH",
  other: null,
};

export async function submitServiceRequest(
  input: SubmitServiceRequestInput
): Promise<SubmitServiceRequestResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message;
    return { success: false, error: code === "invalid_phone" ? "invalid_phone" : "validation" };
  }
  const d = parsed.data;
  const ar = getSiteCopy("ar");
  const o = ar.serviceForm.options;
  const serviceLabel = d.service === "aman" ? ar.header.aman : ar.header.projectFile;

  const details = [
    `الخدمة: ${serviceLabel}`,
    `المدينة: ${o.city[d.city]}`,
    `المشروع: ${o.projectType[d.projectType]}`,
    `المرحلة: ${o.stage[d.stage]}`,
    d.areaSqm ? `المساحة: ${d.areaSqm} م²` : null,
    d.budget ? `الميزانية: ${d.budget}` : null,
    d.notes ? `ملاحظات العميل: ${d.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const lead = await db.partnerLead.create({
      data: {
        source: d.service === "aman" ? "RUWAQ_AMAN" : "RUWAQ_PROJECT_FILE",
        clientName: d.clientName,
        clientPhone: d.clientPhone,
        city: CITY_ENUM[d.city] ?? null,
        projectType: `${d.service}:${d.projectType}`,
        projectDetails: details,
        budgetRange: d.budget || null,
        locale: d.locale,
      },
    });
    const referenceCode = leadReferenceCode(lead.id);

    try {
      await sendQuoteCheckOpsEmail({
        leadId: lead.id,
        referenceCode,
        clientName: d.clientName,
        clientPhone: d.clientPhone,
        cityLabel: o.city[d.city],
        projectTypeLabel: o.projectType[d.projectType],
        packageLabel: serviceLabel,
        details,
        locale: d.locale,
      });
    } catch (err) {
      console.error("[submitServiceRequest] notify failed (lead saved)", err);
    }

    logUsageEvent("service_request_submitted", {
      metadata: { leadId: lead.id, service: d.service, stage: d.stage, city: d.city, locale: d.locale },
    });

    const support = supportWhatsAppE164();
    const msg =
      d.locale === "en"
        ? `Hi Ruwaq,\nI requested ${d.service === "aman" ? "Ruwaq Aman" : "a Project File"} (ref: ${referenceCode}).\nName: ${d.clientName}`
        : `مرحباً رواق،\nطلبت ${serviceLabel} (مرجع: ${referenceCode}).\nالاسم: ${d.clientName}`;
    return {
      success: true,
      referenceCode,
      whatsAppUrl: support ? buildWhatsAppUrl(support, msg) : null,
    };
  } catch (err) {
    console.error("[submitServiceRequest]", err);
    return { success: false, error: "server" };
  }
}
