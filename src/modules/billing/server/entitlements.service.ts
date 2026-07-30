import { db } from "@/shared/lib/db";
import type { RuwaqTier } from "@prisma/client";
import { isBillingEnabled } from "@/shared/lib/env";
import {
  getTierConfig,
  resolveCompanyTier,
  tierAllowsAnotherProposal,
} from "@/modules/billing/lib/tiers";
import { syncDirectoryListingsForUser } from "@/modules/billing/server/directory-tier.service";

export type CompanyEntitlements = {
  tier: RuwaqTier;
  tierLabelAr: string;
  tierLabelEn: string;
  monthlyLimit: number | null;
  usedThisMonth: number;
  remainingThisMonth: number | null;
  canGenerateProposal: boolean;
  pdfWatermark: boolean;
  fullClausePacks: boolean;
  whiteLabelPdf: boolean;
  directoryVerifiedBadge: boolean;
  directoryFeatured: boolean;
  leadPriority: boolean;
};

export type ProposalGateResult =
  | { allowed: true; entitlements: CompanyEntitlements }
  | {
      allowed: false;
      code: "QUOTA_EXCEEDED" | "PROFILE_MISSING";
      entitlements: CompanyEntitlements;
    };

function startOfCurrentMonth(): Date {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function countProposalGenerationsThisMonth(userId: string): Promise<number> {
  return db.usageEvent.count({
    where: {
      type: "proposal_generated",
      userId,
      createdAt: { gte: startOfCurrentMonth() },
    },
  });
}

export async function getCompanyEntitlements(userId: string): Promise<CompanyEntitlements | null> {
  const profile = await db.companyProfile.findUnique({
    where: { userId },
    select: { tier: true, planId: true },
  });
  if (!profile) return null;

  const tier = resolveCompanyTier(profile);
  const config = getTierConfig(tier);
  const usedThisMonth = await countProposalGenerationsThisMonth(userId);
  const canGenerate =
    !isBillingEnabled() || tierAllowsAnotherProposal(tier, usedThisMonth);

  const remainingThisMonth =
    config.monthlyProposalLimit === null
      ? null
      : Math.max(0, config.monthlyProposalLimit - usedThisMonth);

  return {
    tier,
    tierLabelAr: config.nameAr,
    tierLabelEn: config.nameEn,
    monthlyLimit: config.monthlyProposalLimit,
    usedThisMonth,
    remainingThisMonth,
    canGenerateProposal: canGenerate,
    pdfWatermark: config.pdfWatermark,
    fullClausePacks: config.fullClausePacks,
    whiteLabelPdf: config.whiteLabelPdf,
    directoryVerifiedBadge: config.directoryVerifiedBadge,
    directoryFeatured: config.directoryFeatured,
    leadPriority: config.leadPriority,
  };
}

export async function assertProposalGenerationAllowed(
  userId: string
): Promise<ProposalGateResult> {
  const entitlements = await getCompanyEntitlements(userId);
  if (!entitlements) {
    return {
      allowed: false,
      code: "PROFILE_MISSING",
      entitlements: {
        tier: "STARTER",
        tierLabelAr: "التجريبية",
        tierLabelEn: "Starter",
        monthlyLimit: 3,
        usedThisMonth: 0,
        remainingThisMonth: 3,
        canGenerateProposal: false,
        pdfWatermark: true,
        fullClausePacks: false,
        whiteLabelPdf: false,
        directoryVerifiedBadge: false,
        directoryFeatured: false,
        leadPriority: false,
      },
    };
  }

  if (isBillingEnabled() && !entitlements.canGenerateProposal) {
    return { allowed: false, code: "QUOTA_EXCEEDED", entitlements };
  }

  return { allowed: true, entitlements };
}

export async function setCompanyTier(userId: string, tier: RuwaqTier): Promise<void> {
  await db.companyProfile.update({
    where: { userId },
    data: {
      tier,
      tierActivatedAt: new Date(),
      planId:
        tier === "PRO"
          ? "business"
          : tier === "VERIFIED"
            ? "professional"
            : "free",
    },
  });
  await syncDirectoryListingsForUser(userId, tier);
}

export async function getEntitlementsForProposalUser(
  proposalUserId: string | null | undefined
): Promise<CompanyEntitlements | null> {
  if (!proposalUserId) return null;
  return getCompanyEntitlements(proposalUserId);
}
