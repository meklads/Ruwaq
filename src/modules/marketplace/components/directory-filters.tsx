"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import type { ListingsSort } from "@/modules/marketplace/lib/listings-query";

type Props = {
  citySlug: string;
  categorySlug: string;
  copy: Messages["marketplace"]["filters"];
  locale: Locale;
  initialQuery?: string;
  initialFeatured?: boolean;
  initialSort?: ListingsSort;
};

function buildHref(
  citySlug: string,
  categorySlug: string,
  query: string,
  featured: boolean,
  sort: ListingsSort
): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (featured) params.set("featured", "1");
  if (sort !== "featured") params.set("sort", sort);
  const qs = params.toString();
  return `/${citySlug}/${categorySlug}${qs ? `?${qs}` : ""}`;
}

export function DirectoryFilters({
  citySlug,
  categorySlug,
  copy,
  locale,
  initialQuery = "",
  initialFeatured = false,
  initialSort = "featured",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [featured, setFeatured] = useState(initialFeatured);
  const [sort, setSort] = useState<ListingsSort>(initialSort);

  const apply = useCallback(
    (next?: { query?: string; featured?: boolean; sort?: ListingsSort }) => {
      const q = next?.query ?? query;
      const f = next?.featured ?? featured;
      const s = next?.sort ?? sort;
      startTransition(() => {
        router.push(buildHref(citySlug, categorySlug, q, f, s));
      });
    },
    [categorySlug, citySlug, featured, query, router, sort]
  );

  return (
    <form
      className="ruwaq-pro-filters"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <div className="ruwaq-pro-filters-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="ruwaq-pro-filters-search"
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
        <select
          value={sort}
          onChange={(e) => {
            const value = e.target.value as ListingsSort;
            setSort(value);
            apply({ sort: value });
          }}
          className="ruwaq-pro-filters-select"
          aria-label={copy.sortLabel}
        >
          <option value="featured">{copy.sortFeatured}</option>
          <option value="newest">{copy.sortNewest}</option>
          <option value="name">{copy.sortName}</option>
        </select>
        <label className="ruwaq-pro-filters-check">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => {
              const value = e.target.checked;
              setFeatured(value);
              apply({ featured: value });
            }}
          />
          <span>{copy.featuredOnly}</span>
        </label>
        <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid px-5 py-2">
          {pending ? "…" : copy.apply}
        </button>
      </div>
    </form>
  );
}
