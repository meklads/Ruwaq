import type { RuwaqTier } from "@prisma/client";
import {
  getTierConfig,
  resolveCompanyTier,
  tierAllowsAnotherProposal,
} from "@/modules/billing/lib/tiers";

/**
 * Ruwaq product access model (pre-payment launch).
 *
 * PUBLIC — no account
 *   Homepage, tours, guides, directory browse, request-quote, budget estimator
 *   1 guest AI proposal (cookie) then Google sign-in required
 *
 * STARTER — signed in + company identity (name, logo, email, CR or about)
 *   3 AI proposals / month, basic export template, Ruwaq footer + PDF watermark
 *
 * VERIFIED — manual /join approval (no online payment yet)
 *   30 proposals / month, full clause packs, directory badge, clean PDF (no watermark)
 *
 * PRO — curated directory partners
 *   Unlimited proposals, white-label PDF, featured directory, lead priority — no watermark
 *
 * PAID — future Moyasar/Tap (CompanyProfile.isPaid)
 *   Unlocks premium templates + removes watermark for VERIFIED tier
 *
 * BILLING_ENABLED only toggles checkout UI — freemium gates always apply.
 */

export type CompanyAccessProfile = {
  tier?: RuwaqTier | null;
  planId?: string | null;
  isPaid?: boolean | null;
};

export function resolveAccessTier(profile: CompanyAccessProfile | null | undefined): RuwaqTier {
  if (!profile) return "STARTER";
  return resolveCompanyTier(profile);
}

/** Premium PDF templates & header/footer skins — paid or PRO tier only. */
export function hasPremiumExportAccess(profile: CompanyAccessProfile | null | undefined): boolean {
  if (!profile) return false;
  if (profile.isPaid) return true;
  return resolveAccessTier(profile) === "PRO";
}

/** Client-name watermark + "Powered by Ruwaq" footer on PDF exports. */
export function shouldApplyRuwaqBranding(profile: CompanyAccessProfile | null | undefined): boolean {
  if (!profile) return true;
  if (profile.isPaid) return false;
  return getTierConfig(resolveAccessTier(profile)).pdfWatermark;
}

export function allowsAnotherProposal(
  profile: CompanyAccessProfile | null | undefined,
  usedThisMonth: number
): boolean {
  const tier = resolveAccessTier(profile);
  return tierAllowsAnotherProposal(tier, usedThisMonth);
}

export function hasFullClausePacks(profile: CompanyAccessProfile | null | undefined): boolean {
  return getTierConfig(resolveAccessTier(profile)).fullClausePacks;
}

/** Checkout buttons (PayPal today, Moyasar later). Off during data-growth phase. */
export function isOnlineCheckoutEnabled(): boolean {
  return (process.env.BILLING_ENABLED ?? "false").trim().toLowerCase() === "true";
}
