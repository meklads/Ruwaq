"use client";

import { useMemo, useState } from "react";
import { QuoteRequestCtaButton } from "@/modules/marketplace/components/quote-request-cta-button";
import {
  buildEstimateProjectDetails,
  estimateFitOutBudget,
  formatEstimateRange,
  type FitOutTier,
} from "@/modules/marketplace/lib/budget-estimator";
import { trackEvent } from "@/shared/lib/analytics";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const TIERS: FitOutTier[] = ["standard", "premium", "luxury"];

function formatResultMeta(
  template: string,
  areaSqm: number,
  tierLabel: string,
  locale: Locale
): string {
  const area = areaSqm.toLocaleString(locale === "ar" ? "ar-SA" : "en-SA");
  return template.replace("{area}", area).replace("{tier}", tierLabel);
}

type Props = {
  copy: Messages["marketplace"]["budgetEstimator"];
  quoteCopy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  closeLabel: string;
  locale: Locale;
};

export function BudgetEstimatorSection({
  copy,
  quoteCopy,
  visualizationCopy,
  closeLabel,
  locale,
}: Props) {
  const [areaSqm, setAreaSqm] = useState("300");
  const [tier, setTier] = useState<FitOutTier>("premium");
  const [hasInteracted, setHasInteracted] = useState(false);

  const parsedArea = Number.parseInt(areaSqm, 10);
  const estimate = useMemo(
    () => estimateFitOutBudget(parsedArea, tier),
    [parsedArea, tier]
  );

  const tierLabel = copy.tiers[tier];
  const rangeLabel = estimate ? formatEstimateRange(estimate, locale) : null;

  const onAreaChange = (value: string) => {
    setAreaSqm(value);
    setHasInteracted(true);
  };

  const onTierChange = (value: FitOutTier) => {
    setTier(value);
    setHasInteracted(true);
    const next = estimateFitOutBudget(parsedArea, value);
    if (next) {
      trackEvent("budget_estimate", {
        locale,
        tier: value,
        area_sqm: next.areaSqm,
      });
    }
  };

  const initialProjectDetails =
    estimate && tierLabel
      ? buildEstimateProjectDetails(estimate, tierLabel, locale)
      : undefined;

  return (
    <section
      className="ruwaq-budget-estimator"
      id="budget-estimator"
      aria-labelledby="budget-estimator-title"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-budget-estimator__header">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h2 id="budget-estimator-title" className="ruwaq-budget-estimator__title">
            {copy.title}
          </h2>
          <p className="ruwaq-budget-estimator__lead">{copy.subtitle}</p>
        </header>

        <div className="ruwaq-budget-estimator__panel">
          <div className="ruwaq-budget-estimator__fields">
            <div>
              <label className="ruwaq-ad-field-label" htmlFor="budget-estimator-area">
                {copy.areaLabel}
              </label>
              <input
                id="budget-estimator-area"
                className="ruwaq-ad-field mt-1.5"
                type="number"
                inputMode="numeric"
                min={50}
                max={20000}
                step={10}
                value={areaSqm}
                onChange={(e) => onAreaChange(e.target.value)}
                dir="ltr"
              />
              <p className="ruwaq-budget-estimator__hint">{copy.areaHint}</p>
            </div>

            <div>
              <label className="ruwaq-ad-field-label" htmlFor="budget-estimator-tier">
                {copy.tierLabel}
              </label>
              <select
                id="budget-estimator-tier"
                className="ruwaq-ad-field mt-1.5"
                value={tier}
                onChange={(e) => onTierChange(e.target.value as FitOutTier)}
              >
                {TIERS.map((key) => (
                  <option key={key} value={key}>
                    {copy.tiers[key]}
                  </option>
                ))}
              </select>
              <p className="ruwaq-budget-estimator__hint">{copy.tierDescriptions[tier]}</p>
            </div>
          </div>

          <div className="ruwaq-budget-estimator__result" aria-live="polite">
            {!estimate && hasInteracted ? (
              <p className="ruwaq-budget-estimator__error">{copy.invalidArea}</p>
            ) : estimate && rangeLabel ? (
              <>
                <p className="ruwaq-budget-estimator__result-label">{copy.resultLabel}</p>
                <p className="ruwaq-budget-estimator__result-value">{rangeLabel}</p>
                <p className="ruwaq-budget-estimator__result-meta">
                  {formatResultMeta(copy.resultMeta, estimate.areaSqm, tierLabel, locale)}
                </p>
              </>
            ) : (
              <p className="ruwaq-budget-estimator__placeholder">{copy.placeholder}</p>
            )}
          </div>

          <div className="ruwaq-budget-estimator__footer">
            <p className="ruwaq-budget-estimator__disclaimer">{copy.disclaimer}</p>
            <div className="ruwaq-budget-estimator__actions">
              <QuoteRequestCtaButton
                triggerLabel={copy.cta}
                closeLabel={closeLabel}
                copy={quoteCopy}
                visualizationCopy={visualizationCopy}
                locale={locale}
                initialCity="jeddah"
                initialCategory="fit-out"
                initialIntent="marketplace"
                initialProjectDetails={initialProjectDetails}
                initialBudgetRange={rangeLabel ?? undefined}
                className="ruwaq-pro-btn-solid px-7 py-2.5 text-[11px] disabled:opacity-50"
                disabled={!estimate}
              />
            </div>
            <p className="ruwaq-budget-estimator__bridge">{copy.ctaBridge}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
