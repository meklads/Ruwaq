"use server";

import { z } from "zod";
import type { DirectoryApplicationStatus } from "@prisma/client";
import { db } from "@/shared/lib/db";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
  MARKETPLACE_CATEGORIES,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { normalizeKsaPhone } from "@/modules/marketplace/lib/lead-phone";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { CURATED_PRO_SLUGS, sortByCuratedProOrder } from "@/content/curated-pro-listings";
import { joinStatusUrl } from "@/modules/marketplace/lib/join-status";
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
  contactEmail: z.string().trim().email().max(160),
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

function isPlausibleApplicationId(id: string): boolean {
  return /^[a-z][a-z0-9]{20,32}$/i.test(id.trim());
}

export type PublicJoinApplication = {
  id: string;
  companyName: string;
  status: DirectoryApplicationStatus;
  createdAt: Date;
  citySlug: MarketplaceCitySlug;
  cityNameAr: string;
  cityNameEn: string;
  categoryNameAr: string;
  categoryNameEn: string;
  listingSlug: string | null;
  reviewNote: string | null;
};

export async function getPublicJoinApplication(
  id: string
): Promise<PublicJoinApplication | null> {
  if (!isPlausibleApplicationId(id)) return null;

  const application = await db.directoryApplication.findUnique({
    where: { id: id.trim() },
    include: {
      category: { select: { slug: true } },
      listing: { select: { slug: true } },
    },
  });

  if (!application) return null;

  const citySlug = citySlugFromEnum(application.city);
  const cityMeta = getCityBySlug(citySlug);
  const categoryMeta = getCategoryBySlug(application.category.slug);

  return {
    id: application.id,
    companyName: application.companyName,
    status: application.status,
    createdAt: application.createdAt,
    citySlug,
    cityNameAr: cityMeta?.nameAr ?? citySlug,
    cityNameEn: cityMeta?.nameEn ?? citySlug,
    categoryNameAr: categoryMeta?.nameAr ?? application.category.slug,
    categoryNameEn: categoryMeta?.nameEn ?? application.category.slug,
    listingSlug: application.listing?.slug ?? null,
    reviewNote: application.status === "REJECTED" ? application.reviewNote : null,
  };
}

export async function getLatestJoinApplicationForEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  return db.directoryApplication.findFirst({
    where: { contactEmail: { equals: normalized, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true, companyName: true },
  });
}

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

  const contactEmail = data.contactEmail.trim();

  const application = await db.directoryApplication.create({
    data: {
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail,
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
  const statusUrl = joinStatusUrl(application.id);

  try {
    await sendJoinApplicationOpsEmail({
      applicationId: application.id,
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail,
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

  try {
    await sendJoinApplicationConfirmationEmail({
      locale: data.locale,
      contactName: data.contactName,
      contactEmail,
      companyName: data.companyName,
      statusUrl,
    });
  } catch (err) {
    console.error("[submitDirectoryApplication] confirmation email failed", err);
  }

  return { success: true, applicationId: application.id };
}

export async function getProShowcaseListings(citySlug?: MarketplaceCitySlug) {
  const city = citySlug ? getCityBySlug(citySlug) : null;

  const listings = await db.providerListing.findMany({
    where: {
      slug: { in: [...CURATED_PRO_SLUGS] },
      isVerified: true,
      directoryTier: "PRO",
      ...(city ? { city: city.enum } : {}),
    },
    include: { category: true },
  });

  return sortByCuratedProOrder(listings);
}
