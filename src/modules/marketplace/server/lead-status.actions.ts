"use server";

import type { MarketplaceLeadStatus } from "@prisma/client";
import { db } from "@/shared/lib/db";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";

function isPlausibleLeadId(id: string): boolean {
  return /^[a-z][a-z0-9]{20,32}$/i.test(id.trim());
}

export type PublicLeadMatch = {
  rank: number;
  companyName: string;
  listingSlug: string;
  whatsapp: string | null;
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
          listing: {
            select: {
              slug: true,
              titleAr: true,
              titleEn: true,
              whatsapp: true,
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
    matches: lead.matches.map((m) => ({
      rank: m.rank,
      companyName: m.listing.titleAr,
      listingSlug: m.listing.slug,
      whatsapp: m.listing.whatsapp,
    })),
  };
}
