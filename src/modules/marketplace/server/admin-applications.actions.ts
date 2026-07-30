"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { RuwaqTier } from "@prisma/client";
import { db } from "@/shared/lib/db";
import { categoryImageForSlug } from "@/content/marketing-images";
import { directoryFlagsForTier } from "@/modules/billing/lib/tiers";
import { buildUniqueListingSlug } from "@/modules/marketplace/lib/listing-slug";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import {
  sendJoinApplicationApprovedEmail,
  sendJoinApplicationRejectedEmail,
} from "@/modules/marketplace/server/lead-notify-email";
import { getAdminSessionEmail } from "@/modules/marketplace/server/require-admin";

const tierSchema = z.enum(["VERIFIED", "PRO"]);

const rejectSchema = z.object({
  applicationId: z.string().min(1),
  reviewNote: z.string().trim().min(10).max(2000),
});

const approveSchema = z.object({
  applicationId: z.string().min(1),
  tier: tierSchema.default("VERIFIED"),
});

export type AdminApplicationActionResult =
  | { success: true; listingSlug?: string }
  | {
      success: false;
      error: "unauthorized" | "not_found" | "already_reviewed" | "validation" | "server";
    };

function buildListingCopy(application: {
  companyName: string;
  message: string | null;
  locale: string;
  cityLabelAr: string;
  cityLabelEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
}): { descriptionAr: string; descriptionEn: string } {
  const trimmed = application.message?.trim();
  if (trimmed) {
    return { descriptionAr: trimmed, descriptionEn: trimmed };
  }

  return {
    descriptionAr: `${application.companyName} — شركة معتمدة في دليل رواق PRO ضمن قطاع ${application.categoryLabelAr} في ${application.cityLabelAr}.`,
    descriptionEn: `${application.companyName} — a verified Ruwaq PRO directory partner for ${application.categoryLabelEn} in ${application.cityLabelEn}.`,
  };
}

export async function approveDirectoryApplication(
  input: z.infer<typeof approveSchema>
): Promise<AdminApplicationActionResult> {
  const adminEmail = await getAdminSessionEmail();
  if (!adminEmail) return { success: false, error: "unauthorized" };

  const parsed = approveSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "validation" };

  const application = await db.directoryApplication.findUnique({
    where: { id: parsed.data.applicationId },
    include: { category: true },
  });
  if (!application) return { success: false, error: "not_found" };
  if (application.status === "APPROVED" || application.listingId) {
    return { success: false, error: "already_reviewed" };
  }
  if (application.status === "REJECTED") {
    return { success: false, error: "already_reviewed" };
  }

  const citySlug = citySlugFromEnum(application.city);
  const cityMeta = getCityBySlug(citySlug);
  const categoryMeta = getCategoryBySlug(application.category.slug);
  if (!cityMeta || !categoryMeta) return { success: false, error: "server" };

  const tier = parsed.data.tier as RuwaqTier;
  const tierFlags = directoryFlagsForTier(tier);
  const slug = await buildUniqueListingSlug({
    companyName: application.companyName,
    categorySlug: application.category.slug,
    citySlug,
    applicationId: application.id,
  });

  const descriptions = buildListingCopy({
    companyName: application.companyName,
    message: application.message,
    locale: application.locale,
    cityLabelAr: cityMeta.nameAr,
    cityLabelEn: cityMeta.nameEn,
    categoryLabelAr: categoryMeta.nameAr,
    categoryLabelEn: categoryMeta.nameEn,
  });

  const heroImage = categoryImageForSlug(application.category.slug);

  try {
    const listing = await db.$transaction(async (tx) => {
      const created = await tx.providerListing.create({
        data: {
          slug,
          titleAr: application.companyName,
          titleEn: application.companyName,
          descriptionAr: descriptions.descriptionAr,
          descriptionEn: descriptions.descriptionEn,
          city: application.city,
          categoryId: application.categoryId,
          phone: application.contactPhone,
          whatsapp: application.contactPhone,
          isVerified: tierFlags.isVerified,
          isFeatured: tierFlags.isFeatured,
          directoryTier: tierFlags.directoryTier,
          directorySortRank: tierFlags.directorySortRank,
          providerType: "EXECUTOR",
          images: [heroImage],
        },
      });

      await tx.directoryApplication.update({
        where: { id: application.id },
        data: {
          status: "APPROVED",
          listingId: created.id,
          reviewNote: null,
          reviewedAt: new Date(),
        },
      });

      return created;
    });

    const listingUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://ruwaq.co"}/listing/${listing.slug}`;

    if (application.contactEmail) {
      try {
        await sendJoinApplicationApprovedEmail({
          locale: application.locale === "en" ? "en" : "ar",
          contactName: application.contactName,
          contactEmail: application.contactEmail,
          companyName: application.companyName,
          listingUrl,
          tier: parsed.data.tier,
        });
      } catch (err) {
        console.error("[approveDirectoryApplication] approval email failed", err);
      }
    }

    revalidatePath("/workspace/admin/applications");
    revalidatePath("/pro");
    revalidatePath(`/${citySlug}/${application.category.slug}`);
    revalidatePath(`/listing/${listing.slug}`);

    return { success: true, listingSlug: listing.slug };
  } catch (err) {
    console.error("[approveDirectoryApplication]", err);
    return { success: false, error: "server" };
  }
}

export async function rejectDirectoryApplication(
  input: z.infer<typeof rejectSchema>
): Promise<AdminApplicationActionResult> {
  const adminEmail = await getAdminSessionEmail();
  if (!adminEmail) return { success: false, error: "unauthorized" };

  const parsed = rejectSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "validation" };

  const application = await db.directoryApplication.findUnique({
    where: { id: parsed.data.applicationId },
  });
  if (!application) return { success: false, error: "not_found" };
  if (application.status === "APPROVED" || application.listingId) {
    return { success: false, error: "already_reviewed" };
  }
  if (application.status === "REJECTED") {
    return { success: false, error: "already_reviewed" };
  }

  try {
    await db.directoryApplication.update({
      where: { id: application.id },
      data: {
        status: "REJECTED",
        reviewNote: parsed.data.reviewNote,
        reviewedAt: new Date(),
      },
    });

    if (application.contactEmail) {
      try {
        await sendJoinApplicationRejectedEmail({
          locale: application.locale === "en" ? "en" : "ar",
          contactName: application.contactName,
          contactEmail: application.contactEmail,
          companyName: application.companyName,
          reviewNote: parsed.data.reviewNote,
        });
      } catch (err) {
        console.error("[rejectDirectoryApplication] rejection email failed", err);
      }
    }

    revalidatePath("/workspace/admin/applications");
    return { success: true };
  } catch (err) {
    console.error("[rejectDirectoryApplication]", err);
    return { success: false, error: "server" };
  }
}
