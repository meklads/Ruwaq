"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import { getOffPlanProject } from "@/content/off-plan-projects";
import { normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import { logUsageEvent } from "@/shared/lib/usage-events";

const roleKeys = ["end_buyer", "investor", "broker"] as const;

export type ProjectLeadRole = (typeof roleKeys)[number];

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

const submitProjectBrochureLeadSchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  clientPhone: ksaPhone,
  clientEmail: z.string().trim().email().max(160),
  role: z.enum(roleKeys),
  projectSlug: z.string().trim().min(2).max(80),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitProjectBrochureLeadInput = z.infer<typeof submitProjectBrochureLeadSchema>;

export type SubmitProjectBrochureLeadResult =
  | { success: true; leadId: string }
  | { success: false; error: string };

const roleLabels: Record<ProjectLeadRole, { ar: string; en: string }> = {
  end_buyer: { ar: "مشتري نهائي", en: "End buyer" },
  investor: { ar: "مستثمر", en: "Investor" },
  broker: { ar: "وسيط", en: "Broker" },
};

export async function submitProjectBrochureLead(
  input: SubmitProjectBrochureLeadInput
): Promise<SubmitProjectBrochureLeadResult> {
  const parsed = submitProjectBrochureLeadSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (issue?.message === "invalid_phone") return { success: false, error: "invalid_phone" };
    return { success: false, error: "validation" };
  }

  const data = parsed.data;
  const project = getOffPlanProject(data.projectSlug);
  if (!project) return { success: false, error: "validation" };

  const roleLabel = roleLabels[data.role][data.locale];
  const projectName = data.locale === "ar" ? project.titleAr : project.titleEn;
  const message = [
    `Off-plan brochure download: ${projectName}`,
    `Project slug: ${project.slug}`,
    `Role: ${roleLabel}`,
    `Email: ${data.clientEmail}`,
    `Locale: ${data.locale}`,
  ].join("\n");

  try {
    const lead = await db.consultationLead.create({
      data: {
        name: data.clientName,
        phone: data.clientPhone,
        message,
        city: project.citySlug === "riyadh" ? "riyadh" : project.citySlug,
        interest: data.role,
        source: "off_plan_brochure",
        locale: data.locale,
        projectType: "off_plan",
      },
    });

    logUsageEvent("off_plan_brochure_lead", {
      metadata: {
        leadId: lead.id,
        projectSlug: project.slug,
        role: data.role,
        locale: data.locale,
      },
    });

    return { success: true, leadId: lead.id };
  } catch (err) {
    console.error("[submitProjectBrochureLead]", err);
    return { success: false, error: "server" };
  }
}
