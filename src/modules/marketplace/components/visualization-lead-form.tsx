"use client";

import { useState } from "react";
import Link from "next/link";
import { MARKETPLACE_CITIES } from "@/shared/constants/marketplace-taxonomy";
import { submitVisualizationLead } from "@/modules/marketplace/server/visualization-lead.actions";
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

type Props = {
  copy: Messages["marketplace"]["visualization"];
  locale: Locale;
};

export function VisualizationLeadForm({ copy, locale }: Props) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [citySlug, setCitySlug] = useState<string>("");
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPE_KEYS)[number]>("residential");
  const [projectDetails, setProjectDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const ghUrl = graphicsHouseReferralUrl("visualization_form");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitVisualizationLead({
      clientName,
      clientPhone,
      companyName: companyName || undefined,
      citySlug: citySlug ? (citySlug as "jeddah" | "makkah" | "madinah") : undefined,
      projectType,
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
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="ruwaq-join-editorial-success">
        <h2 className="ruwaq-ad-section-title text-2xl">{copy.successTitle}</h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{copy.successBody}</p>
        <a
          href={ghUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-pro-btn-outline mt-8 inline-flex px-6 py-2.5"
        >
          {copy.externalCta}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="ruwaq-join-editorial-fields">
      {error ? (
        <div className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.name}</label>
        <input
          className="ruwaq-ad-field"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.company}</label>
        <input
          className="ruwaq-ad-field"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={copy.fields.companyPlaceholder}
          autoComplete="organization"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.phone}</label>
        <input
          className="ruwaq-ad-field"
          type="tel"
          dir="ltr"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder={copy.fields.phonePlaceholder}
          required
          autoComplete="tel"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.projectType}</label>
        <select
          className="ruwaq-ad-field"
          value={projectType}
          onChange={(e) =>
            setProjectType(e.target.value as (typeof PROJECT_TYPE_KEYS)[number])
          }
          required
        >
          {PROJECT_TYPE_KEYS.map((key) => (
            <option key={key} value={key}>
              {copy.projectTypes[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.city}</label>
        <select
          className="ruwaq-ad-field"
          value={citySlug}
          onChange={(e) => setCitySlug(e.target.value)}
        >
          <option value="">{copy.fields.cityOptional}</option>
          {MARKETPLACE_CITIES.map((city) => (
            <option key={city.slug} value={city.slug}>
              {locale === "ar" ? city.nameAr : city.nameEn}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.details}</label>
        <textarea
          className="ruwaq-ad-field min-h-[120px] resize-y"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.budget}</label>
        <input
          className="ruwaq-ad-field"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
        />
      </div>

      <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full px-8 py-3 disabled:opacity-50">
        {pending ? copy.submitting : copy.submit}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        {copy.privacyNote}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-950">
          {copy.privacyLink}
        </Link>
      </p>
    </form>
  );
}
