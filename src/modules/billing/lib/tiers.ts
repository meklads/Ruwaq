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
    nameAr: "التجريبية",
    nameEn: "Starter",
    priceSar: 0,
    monthlyProposalLimit: 3,
    pdfWatermark: true,
    fullClausePacks: false,
    whiteLabelPdf: false,
    directorySortRank: TIER_DIRECTORY_SORT.STARTER,
    directoryFeatured: false,
    directoryVerifiedBadge: false,
    leadPriority: false,
    featuresAr: [
      "3 عروض شهرياً",
      "علامة مائية خفيفة على PDF",
      "إدراج عادي في الدليل",
    ],
    featuresEn: [
      "3 proposals / month",
      "Subtle PDF footer watermark",
      "Standard directory listing",
    ],
  },
  VERIFIED: {
    id: "VERIFIED",
    nameAr: "المعتمد",
    nameEn: "Verified",
    priceSar: 199,
    monthlyProposalLimit: 30,
    pdfWatermark: false,
    fullClausePacks: true,
    whiteLabelPdf: false,
    directorySortRank: TIER_DIRECTORY_SORT.VERIFIED,
    directoryFeatured: false,
    directoryVerifiedBadge: true,
    leadPriority: false,
    featuresAr: [
      "30 عرضاً شهرياً",
      "34 بنداً قانونياً وتقنياً",
      "PDF نظيف بدون علامة مائية",
      "شارة «معتمد» في الدليل",
    ],
    featuresEn: [
      "30 proposals / month",
      "Full clause template library",
      "Clean unbranded PDFs",
      "Verified badge in directory",
    ],
  },
  PRO: {
    id: "PRO",
    nameAr: "النخبة",
    nameEn: "PRO",
    priceSar: 499,
    monthlyProposalLimit: null,
    pdfWatermark: false,
    fullClausePacks: true,
    whiteLabelPdf: true,
    directorySortRank: TIER_DIRECTORY_SORT.PRO,
    directoryFeatured: true,
    directoryVerifiedBadge: true,
    leadPriority: true,
    featuresAr: [
      "عروض غير محدودة",
      "PDF بالهوية الكاملة (white-label)",
      "ظهور مميز في الدليل",
      "أولوية في توجيه طلبات العملاء",
    ],
    featuresEn: [
      "Unlimited proposals",
      "White-label PDF branding",
      "Featured directory placement",
      "Priority client lead routing",
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
