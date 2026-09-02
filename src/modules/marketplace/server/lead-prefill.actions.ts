"use server";

import { db } from "@/shared/lib/db";
import { getSession } from "@/modules/auth/server/session";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { leadReferenceCode } from "@/modules/marketplace/lib/lead-phone";
import { parseBudgetRangeToAmount } from "@/modules/marketplace/lib/budget-range";
import type { CommercialMode } from "@/shared/types";
import type { Locale } from "@/shared/i18n/locale";

export type LeadProposalPrefill = {
  matchId: string;
  referenceCode: string;
  projectName: string;
  clientName: string;
  description: string;
  budget: number;
  commercialMode: CommercialMode;
  projectLocation: string;
  locale: Locale;
};

async function assertMatchOwnership(
  userId: string,
  email: string | null | undefined,
  matchId: string
): Promise<boolean> {
  const match = await db.marketplaceLeadMatch.findUnique({
    where: { id: matchId },
    select: {
      listing: {
        select: {
          ownerUserId: true,
          directoryApplication: { select: { contactEmail: true } },
        },
      },
    },
  });
  if (!match) return false;
  if (match.listing.ownerUserId === userId) return true;
  if (email && match.listing.directoryApplication?.contactEmail === email) return true;
  return false;
}

export async function getLeadProposalPrefill(
  matchId: string
): Promise<LeadProposalPrefill | null> {
  const session = await getSession();
  if (!session?.user?.id) return null;

  const allowed = await assertMatchOwnership(
    session.user.id,
    session.user.email,
    matchId
  );
  if (!allowed) return null;

  const match = await db.marketplaceLeadMatch.findUnique({
    where: { id: matchId },
    include: {
      lead: {
        include: { category: { select: { slug: true, nameAr: true, nameEn: true } } },
      },
    },
  });
  if (!match) return null;

  const lead = match.lead;
  const citySlug = citySlugFromEnum(lead.city);
  const cityMeta = getCityBySlug(citySlug);
  const categoryMeta = getCategoryBySlug(lead.category.slug);
  const referenceCode = leadReferenceCode(lead.id);
  const categoryNameAr = categoryMeta?.nameAr ?? lead.category.nameAr;
  const categoryNameEn = categoryMeta?.nameEn ?? lead.category.nameEn;
  const cityNameAr = cityMeta?.nameAr ?? lead.city;
  const cityNameEn = cityMeta?.nameEn ?? lead.city;
  const locale: Locale = lead.locale === "en" ? "en" : "ar";

  const { amount, isEstimate } = parseBudgetRangeToAmount(lead.budgetRange);
  const commercialMode: CommercialMode =
    isEstimate || amount <= 0 ? "estimate_only" : "fixed_price";

  const projectName =
    locale === "ar"
      ? `${categoryNameAr} — ${referenceCode}`
      : `${categoryNameEn} — ${referenceCode}`;

  const projectLocation = locale === "ar" ? cityNameAr : cityNameEn;

  const budgetNote = lead.budgetRange?.trim()
    ? locale === "ar"
      ? `\n\nالميزانية المشار إليها: ${lead.budgetRange}`
      : `\n\nIndicated budget: ${lead.budgetRange}`
    : "";

  return {
    matchId,
    referenceCode,
    projectName,
    clientName: lead.clientName,
    description: `${lead.projectDetails.trim()}${budgetNote}`,
    budget: amount,
    commercialMode,
    projectLocation,
    locale,
  };
}
