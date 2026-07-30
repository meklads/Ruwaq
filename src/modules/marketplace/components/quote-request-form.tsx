"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { submitLead } from "@/modules/marketplace/server/lead.actions";
import { submitVisualizationLead } from "@/modules/marketplace/server/visualization-lead.actions";
import { trackEvent } from "@/shared/lib/analytics";
import { QuoteRequestSuccessModal } from "@/modules/marketplace/components/quote-request-success-modal";
import { graphicsHouseReferralUrl } from "@/shared/constants/brand";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const PROJECT_TYPE_KEYS = [
  "residential",
  "commercial",
  "hospitality",
  "mixed_use",
  "government",
  "other",
] as const;

type QuoteIntent = "marketplace" | "visualization";

type Props = {
  copy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  locale: Locale;
  initialCity?: string;
  initialCategory?: string;
  initialIntent?: QuoteIntent;
  variant?: "page" | "modal";
  onSuccessClose?: () => void;
};

export function QuoteRequestForm({
  copy,
  visualizationCopy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
  initialIntent = "marketplace",
  variant = "page",
  onSuccessClose,
}: Props) {
  const resolvedCity = parseCitySlug(initialCity);
  const resolvedCategory = parseCategorySlug(initialCategory);

  const [intent, setIntent] = useState<QuoteIntent>(initialIntent);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [citySlug, setCitySlug] = useState(resolvedCity);
  const [categorySlug, setCategorySlug] = useState(resolvedCategory);
  const [projectType, setProjectType] =
    useState<(typeof PROJECT_TYPE_KEYS)[number]>("residential");
  const [projectDetails, setProjectDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [marketplaceSuccess, setMarketplaceSuccess] = useState<{
    referenceCode: string;
    whatsAppUrl: string | null;
  } | null>(null);
  const [visualizationSuccess, setVisualizationSuccess] = useState(false);

  useEffect(() => {
    setCitySlug(parseCitySlug(initialCity));
    setCategorySlug(parseCategorySlug(initialCategory));
  }, [initialCity, initialCategory]);

  useEffect(() => {
    setIntent(initialIntent);
  }, [initialIntent]);

  const isVisualization = intent === "visualization";
  const ghUrl = graphicsHouseReferralUrl("request_quote_visualization");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    if (isVisualization) {
      const result = await submitVisualizationLead({
        clientName,
        clientPhone,
        companyName: companyName || undefined,
        citySlug,
        projectType,
        projectDetails,
        budgetRange: budgetRange || undefined,
        locale,
        referrer: "request_quote",
      });
      setPending(false);
      if (!result.success) {
        const key = result.error as keyof typeof visualizationCopy.errors;
        setError(visualizationCopy.errors[key] ?? visualizationCopy.errors.server);
        return;
      }
      setVisualizationSuccess(true);
      trackEvent("visualization_lead", { referrer: "request_quote", locale });
      return;
    }

    const result = await submitLead({
      clientName,
      clientPhone,
      citySlug,
      categorySlug,
      projectDetails,
      budgetRange: budgetRange || undefined,
      locale,
    });
    setPending(false);
    if (!result.success) {
      const key = result.error as keyof typeof copy.errors;
      setError(copy.errors[key] ?? copy.errors.server);
      return;
    }
    setMarketplaceSuccess({
      referenceCode: result.referenceCode,
      whatsAppUrl: result.whatsAppUrl,
    });
    trackEvent("quote_submit", { category: categorySlug, city: citySlug, locale });
  };

  if (visualizationSuccess) {
    return (
      <div className="mx-auto max-w-xl space-y-5 text-center">
        <div className="ruwaq-join-editorial-success">
          <h2 className="ruwaq-ad-section-title text-2xl">{copy.visualizationSuccess.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {copy.visualizationSuccess.subtitle}
          </p>
          <a
            href={ghUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ruwaq-pro-btn-outline mt-8 inline-flex px-6 py-2.5"
          >
            {copy.visualizationSuccess.externalCta}
          </a>
        </div>
      </div>
    );
  }

  if (marketplaceSuccess) {
    return (
      <QuoteRequestSuccessModal
        copy={copy.successModal}
        locale={locale}
        referenceCode={marketplaceSuccess.referenceCode}
        whatsAppUrl={marketplaceSuccess.whatsAppUrl}
        onClose={onSuccessClose}
        variant={variant === "modal" ? "inline" : "overlay"}
      />
    );
  }

  const formClass =
    variant === "modal"
      ? "ruwaq-form-card mx-auto max-w-xl space-y-5 border-0 shadow-none"
      : "mx-auto max-w-xl space-y-5";

  const labelClass = variant === "page" ? "ruwaq-ad-field-label" : "ruwaq-label";
  const fieldClass = variant === "page" ? "ruwaq-ad-field" : "ruwaq-field";
  const titleClass =
    variant === "page" ? "ruwaq-ad-section-title text-center" : "ruwaq-app-title pt-2 text-center text-xl";
  const submitClass =
    variant === "page"
      ? "ruwaq-pro-btn-solid w-full px-8 py-3 disabled:opacity-50"
      : "btn-ruwaq-primary w-full disabled:opacity-50";

  const pageTitle = isVisualization ? copy.visualizationTitle : copy.title;
  const pageSubtitle = isVisualization ? copy.visualizationSubtitle : null;

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {variant === "page" ? (
        <h1 className={titleClass}>{pageTitle}</h1>
      ) : (
        <h2 className={titleClass}>{pageTitle}</h2>
      )}
      {pageSubtitle ? (
        <p className="text-center text-sm leading-relaxed text-neutral-600">{pageSubtitle}</p>
      ) : null}

      <div>
        <p className={labelClass}>{copy.requestTypeLabel}</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setIntent("marketplace")}
            className={`border px-4 py-3 text-start text-sm transition-colors ${
              intent === "marketplace"
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-950"
            }`}
          >
            {copy.requestTypes.marketplace}
          </button>
          <button
            type="button"
            onClick={() => setIntent("visualization")}
            className={`border px-4 py-3 text-start text-sm transition-colors ${
              intent === "visualization"
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-950"
            }`}
          >
            {copy.requestTypes.visualization}
          </button>
        </div>
        {isVisualization ? (
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">
            {copy.visualizationHint}{" "}
            <Link href="/visualization" className="underline underline-offset-2 hover:text-neutral-950">
              {copy.visualizationPageLink}
            </Link>
          </p>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      ) : null}

      <div>
        <label className={labelClass}>{copy.fields.name}</label>
        <input
          className={fieldClass}
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>

      {isVisualization ? (
        <div>
          <label className={labelClass}>{visualizationCopy.fields.company}</label>
          <input
            className={fieldClass}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={visualizationCopy.fields.companyPlaceholder}
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
      ) : null}

      <div>
        <label className={labelClass}>{copy.fields.phone}</label>
        <input
          className={fieldClass}
          type="tel"
          inputMode="tel"
          placeholder={copy.fields.phonePlaceholder}
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          required
          dir="ltr"
        />
      </div>

      <div className={`grid gap-5 ${isVisualization ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div>
          <label className={labelClass}>{copy.fields.city}</label>
          <select
            className={fieldClass}
            value={citySlug}
            onChange={(e) => setCitySlug(parseCitySlug(e.target.value))}
          >
            {MARKETPLACE_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>

        {isVisualization ? (
          <div>
            <label className={labelClass}>{visualizationCopy.fields.projectType}</label>
            <select
              className={fieldClass}
              value={projectType}
              onChange={(e) =>
                setProjectType(e.target.value as (typeof PROJECT_TYPE_KEYS)[number])
              }
              required
            >
              {PROJECT_TYPE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {visualizationCopy.projectTypes[key]}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className={labelClass}>{copy.fields.category}</label>
            <select
              className={fieldClass}
              value={categorySlug}
              onChange={(e) => setCategorySlug(parseCategorySlug(e.target.value))}
            >
              {MARKETPLACE_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {locale === "ar" ? c.nameAr : c.nameEn}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>{copy.fields.details}</label>
        <textarea
          className={fieldClass}
          rows={5}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          required
          minLength={10}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.budget}</label>
        <input
          className={fieldClass}
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>

      <button type="submit" disabled={pending} className={submitClass}>
        {pending
          ? copy.submitting
          : isVisualization
            ? copy.visualizationSubmit
            : copy.submit}
      </button>
    </form>
  );
}
