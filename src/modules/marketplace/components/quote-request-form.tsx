"use client";

import { useState } from "react";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import { submitMarketplaceLeadAction } from "@/modules/marketplace/server/lead.actions";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["quote"];
  locale: Locale;
  initialCity?: string;
  initialCategory?: string;
};

export function QuoteRequestForm({
  copy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
}: Props) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [citySlug, setCitySlug] = useState(initialCity);
  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [projectDetails, setProjectDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitMarketplaceLeadAction({
      clientName,
      clientPhone,
      citySlug: citySlug as "jeddah" | "makkah" | "madinah",
      categorySlug: categorySlug as typeof MARKETPLACE_CATEGORIES[number]["slug"],
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
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center text-emerald-900">
        {copy.success}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="ruwaq-form-card mx-auto max-w-xl space-y-5">
      <h1 className="ruwaq-app-title text-center">{copy.title}</h1>
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}
      <div>
        <label className="ruwaq-label">{copy.fields.name}</label>
        <input
          className="ruwaq-field"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <div>
        <label className="ruwaq-label">{copy.fields.phone}</label>
        <input
          className="ruwaq-field"
          type="tel"
          inputMode="tel"
          placeholder="05xxxxxxxx"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          required
          dir="ltr"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="ruwaq-label">{copy.fields.city}</label>
          <select
            className="ruwaq-field"
            value={citySlug}
            onChange={(e) => setCitySlug(e.target.value)}
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
            onChange={(e) => setCategorySlug(e.target.value)}
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
        <label className="ruwaq-label">{copy.fields.details}</label>
        <textarea
          className="ruwaq-field"
          rows={5}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          required
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <div>
        <label className="ruwaq-label">{copy.fields.budget}</label>
        <input
          className="ruwaq-field"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <button type="submit" disabled={pending} className="btn-ruwaq-primary w-full disabled:opacity-50">
        {copy.submit}
      </button>
    </form>
  );
}
