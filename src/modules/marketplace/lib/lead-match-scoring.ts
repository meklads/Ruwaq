import type { RuwaqTier } from "@prisma/client";

export type LeadMatchCandidateInput = {
  id: string;
  titleAr: string;
  titleEn: string | null;
  directorySortRank: number;
  directoryTier: RuwaqTier;
  isFeatured: boolean;
  isVerified: boolean;
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

export function scoreLeadMatchCandidates(
  listings: LeadMatchCandidateInput[],
  locale: "ar" | "en" = "ar",
  limit = 3
): ScoredLeadMatch[] {
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
