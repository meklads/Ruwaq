"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import { getCityBySlug } from "@/shared/constants/marketplace-taxonomy";
import { parseCitySlug } from "@/modules/marketplace/lib/marketplace-slugs";
import { normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import { notifyGraphicsHouseLead } from "@/modules/marketplace/server/partner-lead-notify";

const projectTypeKeys = [
  "residential",
  "commercial",
  "hospitality",
  "mixed_use",
  "government",
  "other",
] as const;

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

const submitVisualizationLeadSchema = z.object({
  clientName: z.string().trim().min(2, { message: "validation" }).max(120),
  clientPhone: ksaPhone,
  companyName: z.string().trim().max(160).optional(),
  citySlug: z.enum(["jeddah", "makkah", "madinah"]).optional(),
  projectType: z.enum(projectTypeKeys),
  projectDetails: z.string().trim().min(10, { message: "validation" }).max(4000),
  budgetRange: z.string().trim().max(80).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitVisualizationLeadInput = z.infer<typeof submitVisualizationLeadSchema>;

export type SubmitVisualizationLeadResult =
  | { success: true; leadId: string }
  | { success: false; error: string };

export async function submitVisualizationLead(
  input: SubmitVisualizationLeadInput
): Promise<SubmitVisualizationLeadResult> {
  const parsed = submitVisualizationLeadSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const code = issue?.message;
    if (code === "invalid_phone") return { success: false, error: "invalid_phone" };
    return { success: false, error: "validation" };
  }

  const data = parsed.data;
  const citySlug = data.citySlug ? parseCitySlug(data.citySlug) : null;
  const cityMeta = citySlug ? getCityBySlug(citySlug) : null;

  try {
    const lead = await db.partnerLead.create({
      data: {
        source: "GRAPHICS_HOUSE",
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        companyName: data.companyName || null,
        city: cityMeta?.enum ?? null,
        projectType: data.projectType,
        projectDetails: data.projectDetails,
        budgetRange: data.budgetRange || null,
        locale: data.locale,
      },
    });

    try {
      await notifyGraphicsHouseLead({
        leadId: lead.id,
        clientName: lead.clientName,
        clientPhone: lead.clientPhone,
        companyName: lead.companyName,
        citySlug,
        projectType: lead.projectType,
        projectDetails: lead.projectDetails,
        budgetRange: lead.budgetRange,
        locale: data.locale,
      });
    } catch (err) {
      console.error("[submitVisualizationLead] notify failed (lead saved)", err);
    }

    return { success: true, leadId: lead.id };
  } catch (err) {
    console.error("[submitVisualizationLead]", err);
    return { success: false, error: "server" };
  }
}
