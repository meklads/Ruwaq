"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import {
  getCategoryBySlug,
  getCityBySlug,
  MARKETPLACE_CATEGORIES,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import {
  buildRoutingNote,
  notifyLeadRouting,
  resolveLeadStatus,
} from "@/modules/marketplace/server/lead-routing";
import { sendClientLeadConfirmationEmail } from "@/modules/marketplace/server/lead-notify-email";
import { quoteStatusUrl } from "@/modules/marketplace/lib/quote-status";
import { logUsageEvent } from "@/shared/lib/usage-events";
import {
  buildClientFollowUpWhatsAppMessage,
  buildWhatsAppUrl,
  leadReferenceCode,
  normalizeKsaPhone,
  supportWhatsAppE164,
} from "@/modules/marketplace/lib/lead-phone";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";

const categorySlugs = MARKETPLACE_CATEGORIES.map((c) => c.slug) as [
  MarketplaceCategorySlug,
  ...MarketplaceCategorySlug[],
];

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

const submitLeadSchema = z.object({
  clientName: z.string().trim().min(2, { message: "validation" }).max(120),
  clientPhone: ksaPhone,
  citySlug: z.enum(["jeddah", "makkah", "madinah"]),
  categorySlug: z.enum(categorySlugs),
  projectDetails: z.string().trim().min(10, { message: "validation" }).max(4000),
  budgetRange: z.string().trim().max(80).optional(),
  clientEmail: z.string().trim().email().max(160).optional().or(z.literal("")),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type SubmitLeadInput = z.infer<typeof submitLeadSchema>;

export type SubmitLeadResult =
  | {
      success: true;
      leadId: string;
      status: string;
      referenceCode: string;
      whatsAppUrl: string | null;
    }
  | { success: false; error: string };

async function persistAndRouteLead(
  data: SubmitLeadInput
): Promise<SubmitLeadResult> {
  const citySlug = parseCitySlug(data.citySlug);
  const categorySlug = parseCategorySlug(data.categorySlug);
  const cityMeta = getCityBySlug(citySlug);
  const categoryMeta = getCategoryBySlug(categorySlug);
  if (!cityMeta || !categoryMeta) {
    return { success: false, error: "validation" };
  }

  const category = await db.serviceCategory.findUnique({
    where: { slug: categorySlug },
  });
  if (!category) {
    return { success: false, error: "category_missing" };
  }

  const status = resolveLeadStatus(categorySlug);
  const assignedTo = status === "ASSIGNED_TO_TURRIVA" ? "TURRIVA" : null;
  const baseRoutingNote = buildRoutingNote(categorySlug);

  const proPartners =
    status === "BROADCASTED_TO_PARTNERS"
      ? await db.providerListing.findMany({
          where: {
            city: cityMeta.enum,
            categoryId: category.id,
            directoryTier: "PRO",
            isVerified: true,
          },
          select: { titleAr: true },
          take: 5,
        })
      : [];

  const lead = await db.marketplaceLead.create({
    data: {
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail?.trim() || null,
      city: cityMeta.enum,
      categoryId: category.id,
      projectDetails: data.projectDetails,
      budgetRange: data.budgetRange || null,
      status,
      assignedTo,
      locale: data.locale,
      routingNote:
        proPartners.length > 0
          ? `${baseRoutingNote} · PRO priority: ${proPartners.map((p) => p.titleAr).join(", ")}`
          : baseRoutingNote,
    },
  });

  const categoryLabel =
    data.locale === "ar" ? categoryMeta.nameAr : categoryMeta.nameEn;
  const cityLabel = data.locale === "ar" ? cityMeta.nameAr : cityMeta.nameEn;
  const referenceCode = leadReferenceCode(lead.id);

  try {
    await notifyLeadRouting({
      leadId: lead.id,
      status,
      clientName: lead.clientName,
      clientPhone: lead.clientPhone,
      city: citySlug,
      categorySlug,
      categoryLabel,
      projectDetails: lead.projectDetails,
      budgetRange: lead.budgetRange,
      locale: data.locale,
      referenceCode,
    });
  } catch (err) {
    console.error("[submitLead] notifyLeadRouting failed (lead saved)", err);
  }

  const clientEmail = data.clientEmail?.trim();
  if (clientEmail) {
    try {
      await sendClientLeadConfirmationEmail({
        locale: data.locale,
        clientName: lead.clientName,
        clientEmail,
        referenceCode,
        cityLabel,
        categoryLabel,
        statusUrl: quoteStatusUrl(lead.id),
      });
    } catch (err) {
      console.error("[submitLead] client confirmation email failed", err);
    }
  }

  const supportPhone = supportWhatsAppE164();
  const whatsAppUrl = supportPhone
    ? buildWhatsAppUrl(
        supportPhone,
        buildClientFollowUpWhatsAppMessage({
          locale: data.locale,
          referenceCode,
          clientName: data.clientName,
          cityLabel,
          categoryLabel,
        })
      )
    : null;

  logUsageEvent("marketplace_lead_submitted", {
    metadata: {
      leadId: lead.id,
      citySlug,
      categorySlug,
      status,
      locale: data.locale,
    },
  });

  return {
    success: true,
    leadId: lead.id,
    status,
    referenceCode,
    whatsAppUrl,
  };
}

/** Server Action: validate, route, and save marketplace quote requests. */
export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const parsed = submitLeadSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const code = issue?.message;
    if (code === "invalid_phone") return { success: false, error: "invalid_phone" };
    if (code === "validation") return { success: false, error: "validation" };
    return { success: false, error: "validation" };
  }

  try {
    return await persistAndRouteLead(parsed.data);
  } catch (err) {
    console.error("[submitLead]", err);
    return { success: false, error: "server" };
  }
}

/** @deprecated Use `submitLead` — kept for existing imports */
export async function submitMarketplaceLeadAction(
  input: SubmitLeadInput
): Promise<SubmitLeadResult> {
  return submitLead(input);
}
