import type { MarketplaceLeadStatus } from "@prisma/client";
import type { RuwaqTier } from "@prisma/client";
import { db } from "@/shared/lib/db";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import { listingHeroFromSlug } from "@/modules/marketplace/lib/listing-image";

function isPlausibleLeadId(id: string): boolean {
  return /^[a-z][a-z0-9]{20,32}$/i.test(id.trim());
}

export type MatchResponseStatus = "pending" | "viewed" | "responded";

export type PublicLeadMatch = {
  rank: number;
  companyNameAr: string;
  companyNameEn: string;
  listingSlug: string;
  whatsapp: string | null;
  heroImage: string;
  descriptionExcerpt: string;
  isVerified: boolean;
  isFeatured: boolean;
  directoryTier: RuwaqTier;
  responseStatus: MatchResponseStatus;
  responseTimeHours: number | null;
};

export type PublicLeadStatus = {
  id: string;
  referenceCode: string;
  clientName: string;
  status: MarketplaceLeadStatus;
  createdAt: Date;
  cityNameAr: string;
  cityNameEn: string;
  categoryNameAr: string;
  categoryNameEn: string;
  matches: PublicLeadMatch[];
};

function excerpt(text: string, max = 140): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trim()}…`;
}

function responseStatus(
  viewedAt: Date | null,
  respondedAt: Date | null
): MatchResponseStatus {
  if (respondedAt) return "responded";
  if (viewedAt) return "viewed";
  return "pending";
}

function responseHours(notifiedAt: Date | null, respondedAt: Date | null): number | null {
  if (!notifiedAt || !respondedAt) return null;
  const ms = respondedAt.getTime() - notifiedAt.getTime();
  if (ms <= 0) return null;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60)));
}

export async function getPublicLeadStatus(leadId: string): Promise<PublicLeadStatus | null> {
  if (!isPlausibleLeadId(leadId)) return null;

  const lead = await db.marketplaceLead.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      clientName: true,
      status: true,
      createdAt: true,
      city: true,
      category: { select: { slug: true, nameAr: true, nameEn: true } },
      matches: {
        orderBy: { rank: "asc" },
        select: {
          rank: true,
          notifiedAt: true,
          viewedAt: true,
          respondedAt: true,
          listing: {
            select: {
              slug: true,
              titleAr: true,
              titleEn: true,
              descriptionAr: true,
              descriptionEn: true,
              whatsapp: true,
              isVerified: true,
              isFeatured: true,
              directoryTier: true,
              images: true,
              category: { select: { slug: true } },
            },
          },
        },
      },
    },
  });

  if (!lead) return null;

  const citySlug = citySlugFromEnum(lead.city);
  const cityMeta = getCityBySlug(citySlug);
  const categoryMeta = getCategoryBySlug(lead.category.slug);

  return {
    id: lead.id,
    referenceCode: leadReferenceCode(lead.id),
    clientName: lead.clientName,
    status: lead.status,
    createdAt: lead.createdAt,
    cityNameAr: cityMeta?.nameAr ?? lead.city,
    cityNameEn: cityMeta?.nameEn ?? lead.city,
    categoryNameAr: categoryMeta?.nameAr ?? lead.category.nameAr,
    categoryNameEn: categoryMeta?.nameEn ?? lead.category.nameEn,
    matches: lead.matches.map((m) => {
      const listing = m.listing;
      const description =
        listing.descriptionAr || listing.descriptionEn || "";
      return {
        rank: m.rank,
        companyNameAr: listing.titleAr,
        companyNameEn: listing.titleEn ?? listing.titleAr,
        listingSlug: listing.slug,
        whatsapp: listing.whatsapp,
        heroImage: listingHeroFromSlug(
          listing.slug,
          listing.category.slug,
          listing.images
        ),
        descriptionExcerpt: excerpt(description),
        isVerified: listing.isVerified,
        isFeatured: listing.isFeatured,
        directoryTier: listing.directoryTier,
        responseStatus: responseStatus(m.viewedAt, m.respondedAt),
        responseTimeHours: responseHours(m.notifiedAt, m.respondedAt),
      };
    }),
  };
}
