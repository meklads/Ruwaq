"use client";

import { useEffect, useState } from "react";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";
import { submitLead } from "@/modules/marketplace/server/lead.actions";
import { QuoteRequestSuccessModal } from "@/modules/marketplace/components/quote-request-success-modal";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["quote"];
  locale: Locale;
  initialCity?: string;
  initialCategory?: string;
  variant?: "page" | "modal";
  onSuccessClose?: () => void;
};

export function QuoteRequestForm({
  copy,
  locale,
  initialCity = "jeddah",
  initialCategory = "fit-out",
  variant = "page",
  onSuccessClose,
}: Props) {
  const resolvedCity = parseCitySlug(initialCity);
  const resolvedCategory = parseCategorySlug(initialCategory);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [citySlug, setCitySlug] = useState(resolvedCity);
  const [categorySlug, setCategorySlug] = useState(resolvedCategory);
  const [projectDetails, setProjectDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<{
    referenceCode: string;
    whatsAppUrl: string | null;
  } | null>(null);

  useEffect(() => {
    setCitySlug(parseCitySlug(initialCity));
    setCategorySlug(parseCategorySlug(initialCategory));
  }, [initialCity, initialCategory]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
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
    setSuccess({
      referenceCode: result.referenceCode,
      whatsAppUrl: result.whatsAppUrl,
    });
  };

  if (success) {
    return (
      <QuoteRequestSuccessModal
        copy={copy.successModal}
        locale={locale}
        referenceCode={success.referenceCode}
        whatsAppUrl={success.whatsAppUrl}
        onClose={onSuccessClose}
        variant={variant === "modal" ? "inline" : "overlay"}
      />
    );
  }

  const formClass =
    variant === "modal"
      ? "ruwaq-form-card mx-auto max-w-xl space-y-5 border-0 shadow-none"
      : "ruwaq-form-card mx-auto max-w-xl space-y-5";

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {variant === "page" ? (
        <h1 className="ruwaq-app-title text-center">{copy.title}</h1>
      ) : (
        <h2 className="ruwaq-app-title pt-2 text-center text-xl">{copy.title}</h2>
      )}
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
          placeholder={copy.fields.phonePlaceholder}
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
        <label className="ruwaq-label">{copy.fields.details}</label>
        <textarea
          className="ruwaq-field"
          rows={5}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          required
          minLength={10}
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
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
