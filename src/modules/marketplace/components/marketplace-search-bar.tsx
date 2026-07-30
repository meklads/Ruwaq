"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["search"];
  locale: Locale;
};

export function MarketplaceSearchBar({ copy, locale }: Props) {
  const router = useRouter();
  const [city, setCity] = useState<string>("jeddah");
  const [category, setCategory] = useState<string>(
    MARKETPLACE_CATEGORIES[0]?.slug ?? "fit-out"
  );
  const [q, setQ] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    router.push(`/${city}/${category}${qs ? `?${qs}` : ""}`);
  };

  return (
    <section className="relative z-10 -mt-8 px-4 sm:-mt-10 sm:px-6">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-4xl flex-col gap-3 border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:gap-4 sm:p-5"
      >
        <div className="min-w-[120px] flex-1">
          <label className="ruwaq-ad-field-label">{copy.cityLabel}</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="ruwaq-ad-field mt-1"
          >
            {MARKETPLACE_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[140px] flex-[1.2]">
          <label className="ruwaq-ad-field-label">{copy.categoryLabel}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="ruwaq-ad-field mt-1"
          >
            {MARKETPLACE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[160px] flex-[2]">
          <label className="ruwaq-ad-field-label sr-only">{copy.queryPlaceholder}</label>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.queryPlaceholder}
            className="ruwaq-ad-field mt-1"
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
        <button type="submit" className="ruwaq-pro-btn-solid w-full px-6 py-3 sm:w-auto sm:shrink-0">
          {copy.submit}
        </button>
      </form>
    </section>
  );
}
