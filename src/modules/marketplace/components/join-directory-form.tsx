"use client";

import { useState } from "react";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { submitDirectoryApplication } from "@/modules/marketplace/server/join.actions";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["join"];
  locale: Locale;
  initialCity?: string;
  initialCategory?: string;
};

export function JoinDirectoryForm({
  copy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
}: Props) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [citySlug, setCitySlug] = useState(parseCitySlug(initialCity));
  const [categorySlug, setCategorySlug] = useState(parseCategorySlug(initialCategory));
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitDirectoryApplication({
      companyName,
      contactName,
      contactPhone,
      contactEmail: contactEmail || undefined,
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
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="ruwaq-pro-join-success">
        <h2 className="ruwaq-pro-directory-title text-2xl">{copy.successTitle}</h2>
        <p className="mt-4 text-neutral-600">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="ruwaq-pro-join-form">
      {error ? (
        <div className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div>
        <label className="ruwaq-label">{copy.fields.companyName}</label>
        <input
          className="ruwaq-field"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="ruwaq-label">{copy.fields.contactName}</label>
          <input
            className="ruwaq-field"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
        <div>
          <label className="ruwaq-label">{copy.fields.contactPhone}</label>
          <input
            className="ruwaq-field"
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="ruwaq-label">{copy.fields.contactEmail}</label>
          <input
            className="ruwaq-field"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            dir="ltr"
          />
        </div>
        <div>
          <label className="ruwaq-label">{copy.fields.crNumber}</label>
          <input
            className="ruwaq-field"
            value={crNumber}
            onChange={(e) => setCrNumber(e.target.value)}
            dir="ltr"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="ruwaq-label">{copy.fields.city}</label>
          <select
            className="ruwaq-field"
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
        <div>
          <label className="ruwaq-label">{copy.fields.category}</label>
          <select
            className="ruwaq-field"
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
      </div>
      <div>
        <label className="ruwaq-label">{copy.fields.portfolioUrl}</label>
        <input
          className="ruwaq-field"
          type="url"
          placeholder="https://"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
          dir="ltr"
        />
      </div>
      <div>
        <label className="ruwaq-label">{copy.fields.message}</label>
        <textarea
          className="ruwaq-field"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full py-3 disabled:opacity-50">
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
