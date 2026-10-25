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
  QUOTE_CHECK_CITY_KEYS,
  QUOTE_CHECK_LEVEL_KEYS,
  QUOTE_CHECK_PACKAGE_KEYS,
  QUOTE_CHECK_PROJECT_KEYS,
  QUOTE_CHECK_SIGNED_KEYS,
} from "@/modules/marketplace/lib/quote-check";
import { getQuoteCheckCopy } from "@/modules/marketplace/lib/quote-check-copy";
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
  clientName: z.string().trim().min(2).max(120),
  clientPhone: ksaPhone,
  city: z.enum(QUOTE_CHECK_CITY_KEYS),
  projectType: z.enum(QUOTE_CHECK_PROJECT_KEYS),
  areaSqm: z.coerce.number().int().min(20).max(50000).optional(),
  level: z.enum(QUOTE_CHECK_LEVEL_KEYS),
  quotesCount: z.coerce.number().int().min(1).max(3),
  signed: z.enum(QUOTE_CHECK_SIGNED_KEYS),
  packageKey: z.enum(QUOTE_CHECK_PACKAGE_KEYS),
  notes: z.string().trim().max(2000).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitQuoteCheckInput = z.input<typeof schema>;

export type SubmitQuoteCheckResult =
  | { success: true; referenceCode: string; whatsAppUrl: string | null }
  | { success: false; error: "invalid_phone" | "validation" | "server" };

const CITY_ENUM: Record<string, "JEDDAH" | "MAKKAH" | "MADINAH" | null> = {
  jeddah: "JEDDAH",
  makkah: "MAKKAH",
  madinah: "MADINAH",
  other: null,
};

export async function submitQuoteCheck(
  input: SubmitQuoteCheckInput
): Promise<SubmitQuoteCheckResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message;
    return { success: false, error: code === "invalid_phone" ? "invalid_phone" : "validation" };
  }
  const data = parsed.data;
  const copy = getQuoteCheckCopy(data.locale);
  const opt = copy.form.options;

  const cityLabel = opt.city[data.city];
  const projectTypeLabel = opt.projectType[data.projectType];
  const packageLabel = opt.package[data.packageKey];

  const details = [
    `الخدمة: افحص عرض سعرك (/check)`,
    `الباقة: ${packageLabel}`,
    `المدينة: ${cityLabel}`,
    `المشروع: ${projectTypeLabel}`,
    data.areaSqm ? `المساحة: ${data.areaSqm} م²` : null,
    `مستوى التشطيب: ${opt.level[data.level]}`,
    `عدد العروض: ${data.quotesCount}`,
    `وقّع مع المقاول: ${opt.signed[data.signed]}`,
    data.notes ? `ملاحظات العميل: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const lead = await db.partnerLead.create({
      data: {
        source: "RUWAQ_QUOTE_CHECK",
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        city: CITY_ENUM[data.city] ?? null,
        projectType: `quote_check:${data.projectType}`,
        projectDetails: details,
        budgetRange: data.packageKey,
        locale: data.locale,
      },
    });

    const referenceCode = leadReferenceCode(lead.id);

    try {
      await sendQuoteCheckOpsEmail({
        leadId: lead.id,
        referenceCode,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        cityLabel,
        projectTypeLabel,
        packageLabel,
        details,
        locale: data.locale,
      });
    } catch (err) {
      console.error("[submitQuoteCheck] notify failed (lead saved)", err);
    }

    logUsageEvent("quote_check_submitted", {
      metadata: {
        leadId: lead.id,
        package: data.packageKey,
        projectType: data.projectType,
        city: data.city,
        signed: data.signed,
        locale: data.locale,
      },
    });

    const support = supportWhatsAppE164();
    const whatsAppUrl = support
      ? buildWhatsAppUrl(
          support,
          copy.whatsAppMessage({
            referenceCode,
            clientName: data.clientName,
            packageLabel,
            quotesCount: data.quotesCount,
          })
        )
      : null;

    return { success: true, referenceCode, whatsAppUrl };
  } catch (err) {
    console.error("[submitQuoteCheck]", err);
    return { success: false, error: "server" };
  }
}
