"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { joinStatusPath } from "@/modules/marketplace/lib/join-status";
import { submitDirectoryApplication } from "@/modules/marketplace/server/join.actions";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

export type JoinFormPrefill = {
  companyName?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  crNumber?: string;
  portfolioUrl?: string;
  message?: string;
};

type Props = {
  copy: Messages["marketplace"]["join"];
  locale: Locale;
  initialCity?: string;
  initialCategory?: string;
  variant?: "default" | "editorial";
  prefill?: JoinFormPrefill;
};

export function JoinDirectoryForm({
  copy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
  variant = "default",
  prefill,
}: Props) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState(prefill?.companyName ?? "");
  const [contactName, setContactName] = useState(prefill?.contactName ?? "");
  const [contactPhone, setContactPhone] = useState(prefill?.contactPhone ?? "");
  const [contactEmail, setContactEmail] = useState(prefill?.contactEmail ?? "");
  const [crNumber, setCrNumber] = useState(prefill?.crNumber ?? "");
  const [citySlug, setCitySlug] = useState(parseCitySlug(initialCity));
  const [categorySlug, setCategorySlug] = useState(parseCategorySlug(initialCategory));
  const [portfolioUrl, setPortfolioUrl] = useState(prefill?.portfolioUrl ?? "");
  const [message, setMessage] = useState(prefill?.message ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const isEditorial = variant === "editorial";
  const labelClass = isEditorial ? "ruwaq-ad-field-label" : "ruwaq-label";
  const fieldClass = isEditorial ? "ruwaq-ad-field" : "ruwaq-field";
  const formClass = isEditorial ? "ruwaq-join-editorial-fields" : "ruwaq-pro-join-form";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitDirectoryApplication({
      companyName,
      contactName,
      contactPhone,
      contactEmail,
      crNumber: crNumber || undefined,
      citySlug,
      categorySlug,
      portfolioUrl: portfolioUrl || undefined,
      message: message || undefined,
      locale,
    });
    setPending(false);
    if (!result.success) {
      const key = result.error as keyof typeof copy.errors;
      setError(copy.errors[key] ?? copy.errors.server);
      return;
    }
    router.push(joinStatusPath(result.applicationId));
  };

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {error ? (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isEditorial ? (
        <p className="ruwaq-join-step-label">{copy.stepCompany}</p>
      ) : null}

      <div>
        <label className={labelClass}>{copy.fields.companyName}</label>
        <input
          className={fieldClass}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.fields.contactName}</label>
          <input
            className={fieldClass}
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
        <div>
          <label className={labelClass}>{copy.fields.contactPhone}</label>
          <input
            className={fieldClass}
            type="tel"
            inputMode="tel"
            placeholder={copy.fields.phonePlaceholder}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
            dir="ltr"
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>{copy.fields.contactEmail}</label>
        <input
          className={fieldClass}
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
          dir="ltr"
        />
      </div>

      {isEditorial ? (
        <p className="ruwaq-join-step-label">{copy.stepVerification}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.fields.crNumber}</label>
          <input
            className={fieldClass}
            value={crNumber}
            onChange={(e) => setCrNumber(e.target.value)}
            dir="ltr"
            placeholder={locale === "ar" ? "1010xxxxxx" : "1010xxxxxx"}
          />
        </div>
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
      </div>
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

      {isEditorial ? (
        <p className="ruwaq-join-step-label">{copy.stepPortfolio}</p>
      ) : null}

      <div>
        <label className={labelClass}>{copy.fields.portfolioUrl}</label>
        <input
          className={fieldClass}
          type="url"
          placeholder="https://"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
          dir="ltr"
        />
      </div>
      <div>
        <label className={labelClass}>{copy.fields.message}</label>
        <textarea
          className={fieldClass}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="ruwaq-pro-btn-solid w-full px-8 py-3.5 disabled:opacity-50"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
