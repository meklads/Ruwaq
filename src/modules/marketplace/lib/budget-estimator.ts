import type { Locale } from "@/shared/i18n/locale";

export type FitOutTier = "standard" | "premium" | "luxury";

/** Indicative SAR/m² bands for Western Region villa fit-out (non-binding). */
export const FIT_OUT_RATES_SAR_PER_SQM: Record<FitOutTier, { min: number; max: number }> = {
  standard: { min: 900, max: 1400 },
  premium: { min: 1400, max: 2200 },
  luxury: { min: 2200, max: 3800 },
};

export type BudgetEstimate = {
  areaSqm: number;
  tier: FitOutTier;
  minTotal: number;
  maxTotal: number;
};

export function estimateFitOutBudget(areaSqm: number, tier: FitOutTier): BudgetEstimate | null {
  if (!Number.isFinite(areaSqm) || areaSqm < 50 || areaSqm > 20000) {
    return null;
  }

  const rates = FIT_OUT_RATES_SAR_PER_SQM[tier];
  const minTotal = roundToNearest(areaSqm * rates.min, 5_000);
  const maxTotal = roundToNearest(areaSqm * rates.max, 5_000);

  return {
    areaSqm: Math.round(areaSqm),
    tier,
    minTotal,
    maxTotal: Math.max(maxTotal, minTotal + 5_000),
  };
}

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function formatEstimateAmount(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEstimateRange(
  estimate: BudgetEstimate,
  locale: Locale
): string {
  const min = formatEstimateAmount(estimate.minTotal, locale);
  const max = formatEstimateAmount(estimate.maxTotal, locale);
  const currency = locale === "ar" ? "ر.س" : "SAR";
  return `${min} – ${max} ${currency}`;
}

export function buildEstimateProjectDetails(
  estimate: BudgetEstimate,
  tierLabel: string,
  locale: Locale
): string {
  const range = formatEstimateRange(estimate, locale);
  if (locale === "ar") {
    return `تقدير أولي من حاسبة رواق — ${estimate.areaSqm} م²، ${tierLabel} — نطاق ${range}`;
  }
  return `Ruwaq budget estimator — ${estimate.areaSqm} m², ${tierLabel} — range ${range}`;
}
