"use server";

import { db } from "@/shared/lib/db";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import { getCompanyEntitlements } from "@/modules/billing/server/entitlements.service";

export type ContractorInboxLead = {
  matchId: string;
  rank: number;
  leadId: string;
  referenceCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
  projectDetails: string;
  budgetRange: string | null;
  status: string;
  createdAt: Date;
  cityNameAr: string;
  cityNameEn: string;
  categoryNameAr: string;
  categoryNameEn: string;
  listingTitle: string;
  viewedAt: Date | null;
  respondedAt: Date | null;
  responseChannel: string | null;
};

async function resolveContractorListingIds(
  userId: string,
  email: string | null | undefined
): Promise<string[]> {
  const owned = await db.providerListing.findMany({
    where: { ownerUserId: userId },
    select: { id: true },
  });
  if (owned.length > 0) return owned.map((l) => l.id);

  if (!email) return [];

  const applications = await db.directoryApplication.findMany({
    where: {
      contactEmail: email,
      status: "APPROVED",
      listingId: { not: null },
    },
    select: { listingId: true },
  });

  const listingIds = applications
    .map((a) => a.listingId)
    .filter((id): id is string => Boolean(id));

  if (listingIds.length > 0) {
    await db.providerListing.updateMany({
      where: { id: { in: listingIds }, ownerUserId: null },
      data: { ownerUserId: userId },
    });
  }

  return listingIds;
}

export type ContractorInboxAccess =
  | { allowed: true; leads: ContractorInboxLead[] }
  | {
      allowed: false;
      reason: "no_profile" | "tier_locked" | "no_listing";
      leads: [];
    };

export async function getContractorLeadInbox(
  userId: string,
  email: string | null | undefined
): Promise<ContractorInboxAccess> {
  const entitlements = await getCompanyEntitlements(userId);
  if (!entitlements) {
    return { allowed: false, reason: "no_profile", leads: [] };
  }

  if (entitlements.tier !== "VERIFIED" && entitlements.tier !== "PRO") {
    return { allowed: false, reason: "tier_locked", leads: [] };
  }

  const listingIds = await resolveContractorListingIds(userId, email);
  if (listingIds.length === 0) {
    return { allowed: false, reason: "no_listing", leads: [] };
  }

  const matches = await db.marketplaceLeadMatch.findMany({
    where: { listingId: { in: listingIds } },
    orderBy: [{ lead: { createdAt: "desc" } }, { rank: "asc" }],
    include: {
      listing: { select: { titleAr: true, titleEn: true } },
      lead: {
        include: { category: { select: { slug: true, nameAr: true, nameEn: true } } },
      },
    },
  });

  const leads: ContractorInboxLead[] = matches.map((match) => {
    const citySlug = citySlugFromEnum(match.lead.city);
    const cityMeta = getCityBySlug(citySlug);
    const categoryMeta = getCategoryBySlug(match.lead.category.slug);

    return {
      matchId: match.id,
      rank: match.rank,
      leadId: match.lead.id,
      referenceCode: leadReferenceCode(match.lead.id),
      clientName: match.lead.clientName,
      clientPhone: match.lead.clientPhone,
      clientEmail: match.lead.clientEmail,
      projectDetails: match.lead.projectDetails,
      budgetRange: match.lead.budgetRange,
      status: match.lead.status,
      createdAt: match.lead.createdAt,
      cityNameAr: cityMeta?.nameAr ?? match.lead.city,
      cityNameEn: cityMeta?.nameEn ?? match.lead.city,
      categoryNameAr: categoryMeta?.nameAr ?? match.lead.category.nameAr,
      categoryNameEn: categoryMeta?.nameEn ?? match.lead.category.nameEn,
      listingTitle: match.listing.titleAr,
      viewedAt: match.viewedAt,
      respondedAt: match.respondedAt,
      responseChannel: match.responseChannel,
    };
  });

  return { allowed: true, leads };
}
