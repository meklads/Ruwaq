"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import { normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import {
  formatProjectLaunchDetails,
  PROJECT_LAUNCH_INQUIRY_KEYS,
  PROJECT_LAUNCH_SERVICE_KEYS,
} from "@/modules/marketplace/lib/project-launch";
import { notifyGraphicsHouseLead } from "@/modules/marketplace/server/partner-lead-notify";
import { logUsageEvent } from "@/shared/lib/usage-events";

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
  clientEmail: z.string().trim().email().max(160).optional().or(z.literal("")),
  companyName: z.string().trim().max(160).optional(),
  jobTitle: z.string().trim().max(120).optional(),
  serviceInterest: z.enum(PROJECT_LAUNCH_SERVICE_KEYS).optional(),
  inquiryType: z.enum(PROJECT_LAUNCH_INQUIRY_KEYS).optional(),
  projectType: z.enum(projectTypeKeys),
  projectDetails: z.string().trim().min(10, { message: "validation" }).max(4000),
  budgetRange: z.string().trim().max(80).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
  referrer: z.enum(["visualization_page", "request_quote"]).optional(),
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
  const projectDetails = formatProjectLaunchDetails({
    projectDetails: data.projectDetails,
    clientEmail: data.clientEmail || undefined,
    jobTitle: data.jobTitle,
    serviceInterest: data.serviceInterest,
    inquiryType: data.inquiryType,
    referrer: data.referrer,
  });

  try {
    const lead = await db.partnerLead.create({
      data: {
        source: "GRAPHICS_HOUSE",
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        companyName: data.companyName || null,
        city: null,
        projectType: data.projectType,
        projectDetails,
        budgetRange: data.budgetRange || null,
        locale: data.locale,
      },
    });

    try {
      await notifyGraphicsHouseLead({
        leadId: lead.id,
        clientName: lead.clientName,
        clientPhone: lead.clientPhone,
        clientEmail: data.clientEmail || undefined,
        companyName: lead.companyName,
        jobTitle: data.jobTitle,
        serviceInterest: data.serviceInterest,
        inquiryType: data.inquiryType,
        citySlug: null,
        projectType: lead.projectType,
        projectDetails: lead.projectDetails,
        budgetRange: lead.budgetRange,
        locale: data.locale,
        referrer: data.referrer,
      });
    } catch (err) {
      console.error("[submitVisualizationLead] notify failed (lead saved)", err);
    }

    logUsageEvent("visualization_lead_submitted", {
      metadata: {
        leadId: lead.id,
        projectType: data.projectType,
        referrer: data.referrer ?? "visualization_page",
        locale: data.locale,
      },
    });

    return { success: true, leadId: lead.id };
  } catch (err) {
    console.error("[submitVisualizationLead]", err);
    return { success: false, error: "server" };
  }
}
