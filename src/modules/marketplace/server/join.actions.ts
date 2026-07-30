"use server";

import { z } from "zod";
import { db } from "@/shared/lib/db";
import {
  getCategoryBySlug,
  getCityBySlug,
  MARKETPLACE_CATEGORIES,
  type MarketplaceCategorySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import type { MarketplaceCitySlug } from "@/shared/constants/marketplace-taxonomy";
import {
  sendJoinApplicationConfirmationEmail,
  sendJoinApplicationOpsEmail,
} from "@/modules/marketplace/server/lead-notify-email";

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

const joinDirectorySchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  contactPhone: ksaPhone,
  contactEmail: z.string().trim().email().max(160).optional().or(z.literal("")),
  crNumber: z.string().trim().max(40).optional(),
  citySlug: z.enum(["jeddah", "makkah", "madinah"]),
  categorySlug: z.enum(categorySlugs),
  portfolioUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type JoinDirectoryInput = z.infer<typeof joinDirectorySchema>;

export type JoinDirectoryResult =
  | { success: true; applicationId: string }
  | { success: false; error: string };

export async function submitDirectoryApplication(
  input: JoinDirectoryInput
): Promise<JoinDirectoryResult> {
  const parsed = joinDirectorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "validation" };
  }

  const data = parsed.data;
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

  const application = await db.directoryApplication.create({
    data: {
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail?.trim() || null,
      crNumber: data.crNumber?.trim() || null,
      city: cityMeta.enum,
      categoryId: category.id,
      portfolioUrl: data.portfolioUrl?.trim() || null,
      message: data.message?.trim() || null,
      locale: data.locale,
    },
  });

  const cityLabel = data.locale === "ar" ? cityMeta.nameAr : cityMeta.nameEn;
  const categoryLabel = data.locale === "ar" ? categoryMeta.nameAr : categoryMeta.nameEn;

  try {
    await sendJoinApplicationOpsEmail({
      applicationId: application.id,
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail?.trim() || null,
      cityLabel,
      categoryLabel,
      crNumber: data.crNumber?.trim() || null,
      portfolioUrl: data.portfolioUrl?.trim() || null,
      message: data.message?.trim() || null,
      locale: data.locale,
    });
  } catch (err) {
    console.error("[submitDirectoryApplication] ops email failed", err);
  }

  const applicantEmail = data.contactEmail?.trim();
  if (applicantEmail) {
    try {
      await sendJoinApplicationConfirmationEmail({
        locale: data.locale,
        contactName: data.contactName,
        contactEmail: applicantEmail,
        companyName: data.companyName,
      });
    } catch (err) {
      console.error("[submitDirectoryApplication] confirmation email failed", err);
    }
  }

  return { success: true, applicationId: application.id };
}

export async function getProShowcaseListings(citySlug?: MarketplaceCitySlug) {
  const city = citySlug ? getCityBySlug(citySlug) : null;

  return db.providerListing.findMany({
    where: {
      isVerified: true,
      directoryTier: "PRO",
      ...(city ? { city: city.enum } : {}),
    },
    include: { category: true },
    orderBy: [{ directorySortRank: "asc" }, { updatedAt: "desc" }],
    take: 18,
  });
}
