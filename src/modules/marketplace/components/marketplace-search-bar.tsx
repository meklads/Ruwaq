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
    MARKETPLACE_CATEGORIES[0]?.slug ?? "hvac"
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
    <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:-mt-12">
      <form
        onSubmit={onSubmit}
        className="ruwaq-form-card mx-auto flex max-w-5xl flex-col gap-4 shadow-ruwaq-lg ring-1 ring-ruwaq-stone/40 sm:flex-row sm:flex-wrap sm:items-end"
      >
        <div className="min-w-[140px] flex-1">
          <label className="ruwaq-label">{copy.cityLabel}</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="ruwaq-field"
          >
            {MARKETPLACE_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[180px] flex-[1.2]">
          <label className="ruwaq-label">{copy.categoryLabel}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="ruwaq-field"
          >
            {MARKETPLACE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[200px] flex-[2]">
          <label className="ruwaq-label sr-only">{copy.queryPlaceholder}</label>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.queryPlaceholder}
            className="ruwaq-field"
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
        <button type="submit" className="btn-ruwaq-primary w-full sm:w-auto sm:shrink-0">
          {copy.submit}
        </button>
      </form>
    </section>
  );
}
