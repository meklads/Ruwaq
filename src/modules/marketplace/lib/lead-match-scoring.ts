import type { ProviderType, RuwaqTier } from "@prisma/client";

export type LeadMatchCandidateInput = {
  id: string;
  titleAr: string;
  titleEn: string | null;
  directorySortRank: number;
  directoryTier: RuwaqTier;
  isFeatured: boolean;
  isVerified: boolean;
  providerType: ProviderType;
};

export type LeadMatchContext = {
  categorySlug: string;
  projectDetails: string;
  budgetRange?: string | null;
};

export type ScoredLeadMatch = {
  listingId: string;
  score: number;
  rank: number;
  label: string;
  reasons: string[];
};

const TIER_POINTS: Record<RuwaqTier, number> = {
  PRO: 40,
  VERIFIED: 25,
  STARTER: 5,
};

const CATEGORY_PROVIDER_FIT: Partial<
  Record<string, Partial<Record<ProviderType, number>>>
> = {
  "fit-out": { EXECUTOR: 8, SUPPLIER: 3 },
  contracting: { EXECUTOR: 10 },
  engineering: { CONSULTANT: 10, EXECUTOR: 4 },
  hvac: { EXECUTOR: 8, SUPPLIER: 4 },
  kitchens: { SUPPLIER: 10, EXECUTOR: 4 },
  "luxury-materials": { SUPPLIER: 10 },
  outdoor: { EXECUTOR: 8 },
  maintenance: { EXECUTOR: 8 },
};

function budgetSignalScore(
  budgetRange: string | null | undefined,
  locale: "ar" | "en"
): { score: number; reason?: string } {
  if (!budgetRange?.trim()) return { score: 0 };

  const text = budgetRange.toLowerCase();
  const numbers = [...budgetRange.matchAll(/(\d[\d,.]*)/g)].map((match) =>
    Number.parseFloat(match[1]?.replace(/,/g, "") ?? "0")
  );
  const hasMillion = /مليون|million|\bm\b/i.test(text);
  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  const normalized =
    hasMillion && max > 0 && max < 100 ? max * 1_000_000 : max >= 1000 ? max : max * 1000;

  if (normalized >= 1_000_000 || (hasMillion && max >= 1)) {
    return {
      score: 12,
      reason: locale === "ar" ? "إشارة ميزانية عالية" : "High budget signal",
    };
  }
  if (normalized >= 250_000) {
    return {
      score: 6,
      reason: locale === "ar" ? "ميزانية متوسطة–عالية" : "Mid–high budget",
    };
  }
  return { score: 0 };
}

function projectDetailBonus(
  projectDetails: string,
  categorySlug: string,
  locale: "ar" | "en"
): { score: number; reason?: string } {
  const text = projectDetails.toLowerCase();
  const villa = /فيلا|فلة|villa/i.test(projectDetails);
  const hotel = /فندق|hotel|ضيافة/i.test(projectDetails);
  const commercial = /تجاري|مكتب|commercial|retail/i.test(projectDetails);

  if (categorySlug === "fit-out" && villa) {
    return { score: 5, reason: locale === "ar" ? "مشروع فيلا" : "Villa project" };
  }
  if (categorySlug === "hvac" && hotel) {
    return { score: 5, reason: locale === "ar" ? "ضيافة / فندق" : "Hospitality project" };
  }
  if (categorySlug === "contracting" && commercial) {
    return { score: 4, reason: locale === "ar" ? "مشروع تجاري" : "Commercial project" };
  }
  if (/عاجل|urgent|أسبوع|week/i.test(text)) {
    return { score: 3, reason: locale === "ar" ? "جدول زمني ضيق" : "Tight timeline" };
  }
  return { score: 0 };
}

export function scoreLeadMatchCandidates(
  listings: LeadMatchCandidateInput[],
  locale: "ar" | "en" = "ar",
  limit = 3,
  lead?: LeadMatchContext
): ScoredLeadMatch[] {
  const budgetBonus = lead ? budgetSignalScore(lead.budgetRange, locale) : { score: 0 };
  const detailBonus = lead
    ? projectDetailBonus(lead.projectDetails, lead.categorySlug, locale)
    : { score: 0 };

  const scored = listings.map((listing) => {
    const reasons: string[] = [];
    let score = TIER_POINTS[listing.directoryTier] ?? 0;

    if (listing.directoryTier === "PRO") {
      reasons.push(locale === "ar" ? "شريك PRO" : "PRO partner");
    } else if (listing.directoryTier === "VERIFIED") {
      reasons.push(locale === "ar" ? "معتمد في الدليل" : "Verified directory");
    }

    if (listing.isFeatured) {
      score += 15;
      reasons.push(locale === "ar" ? "مميز في الدليل" : "Featured listing");
    }
    if (listing.isVerified) {
      score += 10;
    }
    score += Math.max(0, (2 - listing.directorySortRank) * 5);

    if (lead) {
      const providerFit =
        CATEGORY_PROVIDER_FIT[lead.categorySlug]?.[listing.providerType] ?? 0;
      if (providerFit > 0) {
        score += providerFit;
        reasons.push(
          locale === "ar" ? "ملاءمة نوع المزود" : "Provider type fit"
        );
      }
    }

    if (budgetBonus.score > 0 && listing.directoryTier === "PRO") {
      score += budgetBonus.score;
      if (budgetBonus.reason) reasons.push(budgetBonus.reason);
    } else if (budgetBonus.score > 0 && listing.directoryTier === "VERIFIED") {
      score += Math.round(budgetBonus.score * 0.6);
      if (budgetBonus.reason) reasons.push(budgetBonus.reason);
    }

    if (detailBonus.score > 0) {
      score += detailBonus.score;
      if (detailBonus.reason) reasons.push(detailBonus.reason);
    }

    return {
      listingId: listing.id,
      score,
      rank: 0,
      label: locale === "ar" ? listing.titleAr : (listing.titleEn ?? listing.titleAr),
      reasons,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
