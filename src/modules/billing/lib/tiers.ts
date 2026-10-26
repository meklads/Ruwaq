import type { RuwaqTier } from "@prisma/client";

export type { RuwaqTier };

export type TierConfig = {
  id: RuwaqTier;
  nameAr: string;
  nameEn: string;
  priceSar: number;
  monthlyProposalLimit: number | null;
  pdfWatermark: boolean;
  fullClausePacks: boolean;
  whiteLabelPdf: boolean;
  directorySortRank: number;
  directoryFeatured: boolean;
  directoryVerifiedBadge: boolean;
  leadPriority: boolean;
  featuresAr: string[];
  featuresEn: string[];
};

/** PRO → 0, VERIFIED → 1, STARTER → 2 (lower rank = higher in directory) */
export const TIER_DIRECTORY_SORT: Record<RuwaqTier, number> = {
  PRO: 0,
  VERIFIED: 1,
  STARTER: 2,
};

export const TIERS: Record<RuwaqTier, TierConfig> = {
  STARTER: {
    id: "STARTER",
    nameAr: "الأساسية",
    nameEn: "Starter",
    priceSar: 0,
    monthlyProposalLimit: 3,
    pdfWatermark: true,
    fullClausePacks: false,
    whiteLabelPdf: false,
    directorySortRank: TIER_DIRECTORY_SORT.VERIFIED,
    directoryFeatured: false,
    directoryVerifiedBadge: false,
    leadPriority: false,
    featuresAr: [
      "٣ عروض شهرياً",
      "علامة مائية خفيفة على ملف PDF",
      "قوالب البنود الأساسية",
    ],
    featuresEn: [
      "3 proposals / month",
      "Subtle PDF footer watermark",
      "Core clause templates",
    ],
  },
  VERIFIED: {
    id: "VERIFIED",
    nameAr: "المهنية",
    nameEn: "Professional",
    priceSar: 199,
    monthlyProposalLimit: 30,
    pdfWatermark: false,
    fullClausePacks: true,
    whiteLabelPdf: false,
    directorySortRank: TIER_DIRECTORY_SORT.VERIFIED,
    directoryFeatured: false,
    directoryVerifiedBadge: false,
    leadPriority: false,
    featuresAr: [
      "٣٠ عرضاً شهرياً",
      "مكتبة البنود القانونية والفنية كاملة",
      "ملف PDF دون علامة مائية",
    ],
    featuresEn: [
      "30 proposals / month",
      "Full clause template library",
      "Clean unbranded PDFs",
    ],
  },
  PRO: {
    id: "PRO",
    nameAr: "المؤسسية",
    nameEn: "Enterprise",
    priceSar: 499,
    monthlyProposalLimit: null,
    pdfWatermark: false,
    fullClausePacks: true,
    whiteLabelPdf: true,
    // Ruwaq v2: paying for Nasaq never buys ranking, featuring or lead priority.
    directorySortRank: TIER_DIRECTORY_SORT.VERIFIED,
    directoryFeatured: false,
    directoryVerifiedBadge: false,
    leadPriority: false,
    featuresAr: [
      "عروض غير محدودة",
      "ملف PDF بهوية شركتك وحدها",
      "تخصيص كامل لهوية العرض",
    ],
    featuresEn: [
      "Unlimited proposals",
      "PDF with your brand only",
      "Full proposal branding",
    ],
  },
};

export const TIER_ORDER: RuwaqTier[] = ["STARTER", "VERIFIED", "PRO"];

/** Legacy planId → RuwaqTier (backward compat with CompanyProfile.planId). */
export function tierFromPlanId(planId: string | null | undefined): RuwaqTier {
  switch (planId) {
    case "business":
      return "PRO";
    case "professional":
    case "starter":
      return "VERIFIED";
    default:
      return "STARTER";
  }
}

export function resolveCompanyTier(profile: {
  tier?: RuwaqTier | null;
  planId?: string | null;
}): RuwaqTier {
  if (profile.tier && profile.tier in TIERS) return profile.tier;
  return tierFromPlanId(profile.planId);
}

export function getTierConfig(tier: RuwaqTier | string | null | undefined): TierConfig {
  if (tier && tier in TIERS) return TIERS[tier as RuwaqTier];
  return TIERS.STARTER;
}

export function tierAllowsAnotherProposal(tier: RuwaqTier, usedThisMonth: number): boolean {
  const config = getTierConfig(tier);
  if (config.monthlyProposalLimit === null) return true;
  return usedThisMonth < config.monthlyProposalLimit;
}

export function directoryFlagsForTier(tier: RuwaqTier, approvedForDirectory = true) {
  const config = getTierConfig(tier);
  return {
    directoryTier: tier,
    directorySortRank: config.directorySortRank,
    isFeatured: config.directoryFeatured,
    /** Legacy field — means approved for directory listing, not badge tier. */
    isVerified: approvedForDirectory,
  };
}
