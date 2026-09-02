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
import {
  PROJECT_LAUNCH_INQUIRY_KEYS,
  PROJECT_LAUNCH_SERVICE_KEYS,
  type ProjectLaunchInquiryKey,
  type ProjectLaunchServiceKey,
} from "@/modules/marketplace/lib/project-launch";
import { submitLead } from "@/modules/marketplace/server/lead.actions";
import { submitVisualizationLead } from "@/modules/marketplace/server/visualization-lead.actions";
import { trackEvent } from "@/shared/lib/analytics";
import { QuoteRequestSuccessModal } from "@/modules/marketplace/components/quote-request-success-modal";
import { ProjectLaunchBanner } from "@/modules/marketplace/components/project-launch-banner";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";
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
  initialProjectDetails?: string;
  initialBudgetRange?: string;
  variant?: "page" | "modal" | "landing";
  lockCategory?: boolean;
  onSuccessClose?: () => void;
};

export function QuoteRequestForm({
  copy,
  visualizationCopy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
  initialIntent = "marketplace",
  initialProjectDetails = "",
  initialBudgetRange = "",
  variant = "page",
  lockCategory = false,
  onSuccessClose,
}: Props) {
  const resolvedCity = parseCitySlug(initialCity);
  const resolvedCategory = parseCategorySlug(initialCategory);

  const [intent, setIntent] = useState<QuoteIntent>(initialIntent);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [serviceInterest, setServiceInterest] = useState<ProjectLaunchServiceKey | "">("");
  const [inquiryType, setInquiryType] = useState<ProjectLaunchInquiryKey | "">("");
  const [citySlug, setCitySlug] = useState(resolvedCity);
  const [categorySlug, setCategorySlug] = useState(resolvedCategory);
  const [projectType, setProjectType] =
    useState<(typeof PROJECT_TYPE_KEYS)[number]>("residential");
  const [projectDetails, setProjectDetails] = useState(initialProjectDetails);
  const [budgetRange, setBudgetRange] = useState(initialBudgetRange);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [marketplaceSuccess, setMarketplaceSuccess] = useState<{
    leadId: string;
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

  useEffect(() => {
    if (initialProjectDetails) setProjectDetails(initialProjectDetails);
  }, [initialProjectDetails]);

  useEffect(() => {
    if (initialBudgetRange) setBudgetRange(initialBudgetRange);
  }, [initialBudgetRange]);

  const isVisualization = intent === "visualization";
  const isCompactModal = variant === "modal" && !isVisualization;
  const projectLaunchUrl = graphicsHouseProjectLaunchReferralUrl("request_quote_visualization");

  const buildCompactProjectDetails = () => {
    const typeLabel = visualizationCopy.projectTypes[projectType];
    return locale === "ar" ? `طلب سريع — ${typeLabel}` : `Quick request — ${typeLabel}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    if (isVisualization) {
      const result = await submitVisualizationLead({
        clientName,
        clientPhone,
        clientEmail: clientEmail.trim(),
        companyName: companyName || undefined,
        jobTitle: jobTitle || undefined,
        serviceInterest: serviceInterest || undefined,
        inquiryType: inquiryType || undefined,
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
      clientEmail: !isCompactModal && clientEmail.trim() ? clientEmail.trim() : undefined,
      citySlug: lockJeddah ? "jeddah" : citySlug,
      categorySlug,
      projectDetails: isCompactModal
        ? projectDetails.trim().length >= 10
          ? projectDetails
          : buildCompactProjectDetails()
        : projectDetails,
      budgetRange: budgetRange.trim() || undefined,
      locale,
    });
    setPending(false);
    if (!result.success) {
      const key = result.error as keyof typeof copy.errors;
      setError(copy.errors[key] ?? copy.errors.server);
      return;
    }
    setMarketplaceSuccess({
      leadId: result.leadId,
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
            href={projectLaunchUrl}
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
      <div className={variant === "modal" ? "px-6 pb-8 pt-10" : undefined}>
        <QuoteRequestSuccessModal
          copy={copy.successModal}
          locale={locale}
          referenceCode={marketplaceSuccess.referenceCode}
          leadId={marketplaceSuccess.leadId}
          whatsAppUrl={marketplaceSuccess.whatsAppUrl}
          onClose={onSuccessClose}
          variant={variant === "modal" ? "inline" : "overlay"}
        />
      </div>
    );
  }

  const formClass =
    variant === "modal"
      ? "ruwaq-form-card mx-auto max-w-xl space-y-4 px-6 pb-8 pt-10"
      : variant === "landing"
        ? "mx-auto max-w-xl space-y-4"
        : "mx-auto max-w-xl space-y-5";

  const labelClass =
    variant === "page" || variant === "landing" ? "ruwaq-ad-field-label" : "ruwaq-label";
  const fieldClass = variant === "page" || variant === "landing" ? "ruwaq-ad-field" : "ruwaq-field";
  const titleClass =
    variant === "page" ? "ruwaq-ad-section-title text-center" : "ruwaq-app-title pt-2 text-center text-xl";
  const submitClass =
    variant === "page" || variant === "landing"
      ? "ruwaq-pro-btn-solid w-full px-8 py-3 disabled:opacity-50"
      : "btn-ruwaq-primary w-full disabled:opacity-50";

  const pageTitle = isVisualization ? copy.visualizationTitle : isCompactModal ? copy.modalTitle : copy.title;
  const pageSubtitle = isVisualization
    ? copy.visualizationSubtitle
    : isCompactModal
      ? copy.modalSubtitle
      : null;
  const lockJeddah = (variant === "page" || variant === "landing") && !isVisualization;
  const jeddahCity = MARKETPLACE_CITIES.find((c) => c.slug === "jeddah");
  const lockedCategory = MARKETPLACE_CATEGORIES.find((c) => c.slug === categorySlug);
  const projectLaunchHintUrl = graphicsHouseProjectLaunchReferralUrl("request_quote_hint");

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {variant === "page" ? (
        <h1 className={titleClass}>{pageTitle}</h1>
      ) : variant === "modal" ? (
        <h2 className={titleClass}>{pageTitle}</h2>
      ) : null}
      {pageSubtitle ? (
        <p className="text-center text-sm leading-relaxed text-neutral-600">{pageSubtitle}</p>
      ) : null}
      {variant === "page" && !isVisualization ? (
        <p className="text-center text-sm leading-relaxed text-neutral-600">{copy.pageLead}</p>
      ) : null}

      {variant === "page" ? (
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
              <a
                href={projectLaunchHintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-neutral-950"
              >
                {copy.visualizationPageLink}
              </a>
              {" · "}
              <Link href="/visualization" className="underline underline-offset-2 hover:text-neutral-950">
                {locale === "ar" ? "النموذج الكامل" : "Full form"}
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}

      {isVisualization && variant === "page" ? (
        <ProjectLaunchBanner
          copy={visualizationCopy}
          locale={locale}
          campaign="request_quote_banner"
        />
      ) : null}

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

      {!isCompactModal ? (
        <div>
          <label className={labelClass}>
            {isVisualization ? visualizationCopy.fields.email : copy.fields.email}
          </label>
          <input
            className={fieldClass}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={
              isVisualization
                ? visualizationCopy.fields.emailPlaceholder
                : copy.fields.emailPlaceholder
            }
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required={isVisualization}
            dir="ltr"
          />
          {!isVisualization ? (
            <p className="mt-1 text-xs text-neutral-500">{copy.fields.emailHint}</p>
          ) : null}
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

      {isVisualization ? (
        <div>
          <label className={labelClass}>{visualizationCopy.fields.jobTitle}</label>
          <input
            className={fieldClass}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
      ) : null}

      <div className={isCompactModal ? "grid gap-4 sm:grid-cols-2" : undefined}>
        <div>
          <label className={labelClass}>{copy.fields.city}</label>
          {lockJeddah ? (
            <>
              <p className={`${fieldClass} bg-neutral-50 text-neutral-800`}>
                {jeddahCity ? (locale === "ar" ? jeddahCity.nameAr : jeddahCity.nameEn) : "Jeddah"}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">{copy.jeddahOnlyNote}</p>
            </>
          ) : (
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
          )}
        </div>

        {isCompactModal ? (
          <div>
            <label className={labelClass}>{copy.fields.projectType}</label>
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
        ) : isVisualization ? (
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
        ) : lockCategory ? (
          <div>
            <label className={labelClass}>{copy.fields.category}</label>
            <p className={`${fieldClass} bg-neutral-50 text-neutral-800`}>
              {lockedCategory
                ? locale === "ar"
                  ? lockedCategory.nameAr
                  : lockedCategory.nameEn
                : categorySlug}
            </p>
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

      {isVisualization ? (
        <>
          <div>
            <label className={labelClass}>{visualizationCopy.fields.serviceInterest}</label>
            <select
              className={fieldClass}
              value={serviceInterest}
              onChange={(e) =>
                setServiceInterest(e.target.value as ProjectLaunchServiceKey | "")
              }
            >
              <option value="">{visualizationCopy.fields.servicePlaceholder}</option>
              {PROJECT_LAUNCH_SERVICE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {visualizationCopy.serviceInterests[key]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{visualizationCopy.fields.inquiryType}</label>
            <select
              className={fieldClass}
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value as ProjectLaunchInquiryKey | "")}
            >
              <option value="">{visualizationCopy.fields.inquiryPlaceholder}</option>
              {PROJECT_LAUNCH_INQUIRY_KEYS.map((key) => (
                <option key={key} value={key}>
                  {visualizationCopy.inquiryTypes[key]}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : null}

      {!isCompactModal ? (
        <>
          <div>
            <label className={labelClass}>
              {isVisualization ? visualizationCopy.fields.details : copy.fields.details}
            </label>
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
            <label className={labelClass}>
              {isVisualization ? visualizationCopy.fields.budget : copy.fields.budget}
            </label>
            <input
              className={fieldClass}
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </div>
        </>
      ) : null}

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
