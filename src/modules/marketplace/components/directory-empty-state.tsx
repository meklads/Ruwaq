"use client";

import { useState } from "react";
import { submitLead } from "@/modules/marketplace/server/lead.actions";
import { trackEvent } from "@/shared/lib/analytics";
import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["listing"]["emptyState"];
  quoteErrors: Messages["marketplace"]["quote"]["errors"];
  fields: Pick<Messages["marketplace"]["quote"]["fields"], "name" | "phone" | "phonePlaceholder">;
  locale: Locale;
  citySlug: string;
  categorySlug: string;
  searchQuery?: string;
};

export function DirectoryEmptyState({
  copy,
  quoteErrors,
  fields,
  locale,
  citySlug,
  categorySlug,
  searchQuery,
}: Props) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const title = searchQuery ? copy.searchTitle : copy.title;
  const body = searchQuery ? copy.searchBody : copy.body;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    const details =
      locale === "ar"
        ? `طلب تواصل — ${searchQuery ? `بحث: ${searchQuery}` : "لا توجد نتائج في الدليل"}`
        : `Contact request — ${searchQuery ? `Search: ${searchQuery}` : "No directory results"}`;

    const result = await submitLead({
      clientName,
      clientPhone,
      citySlug: citySlug as "jeddah" | "makkah" | "madinah",
      categorySlug: categorySlug as MarketplaceCategorySlug,
      projectDetails: details,
      locale,
    });

    setPending(false);
    if (!result.success) {
      const key = result.error as keyof typeof quoteErrors;
      setError(quoteErrors[key] ?? quoteErrors.server);
      return;
    }
    setSuccess(true);
    trackEvent("quote_submit", { category: categorySlug, city: citySlug, locale, source: "empty_state" });
  };

  if (success) {
    return (
      <div className="ruwaq-ad-content">
        <div className="ruwaq-directory-empty-state ruwaq-directory-empty-state--success">
          <p className="ruwaq-directory-empty-state__title">{copy.successTitle}</p>
          <p className="ruwaq-directory-empty-state__body">{copy.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ruwaq-ad-content">
      <div className="ruwaq-directory-empty-state">
        <p className="ruwaq-directory-empty-state__title">{title}</p>
        <p className="ruwaq-directory-empty-state__body">{body}</p>
        <form onSubmit={onSubmit} className="ruwaq-directory-empty-state__form">
          {error ? (
            <p className="ruwaq-directory-empty-state__error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="ruwaq-directory-empty-state__fields">
            <div>
              <label className="ruwaq-ad-field-label">{fields.name}</label>
              <input
                className="ruwaq-ad-field mt-1"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                dir={locale === "ar" ? "rtl" : "ltr"}
              />
            </div>
            <div>
              <label className="ruwaq-ad-field-label">{fields.phone}</label>
              <input
                className="ruwaq-ad-field mt-1"
                type="tel"
                inputMode="tel"
                placeholder={fields.phonePlaceholder}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                dir="ltr"
              />
            </div>
          </div>
          <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full px-8 py-3 sm:w-auto">
            {pending ? copy.submitting : copy.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
