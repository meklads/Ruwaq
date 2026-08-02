"use client";

import { useMemo, useState } from "react";
import type { ShowcaseProject } from "@/content/showcase-projects";
import {
  matchesOffPlanFilters,
  OFF_PLAN_FILTER_CITIES,
  OFF_PLAN_FILTER_PROPERTY_TYPES,
  OFF_PLAN_PRICE_RANGES,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { OffPlanPfListCard } from "@/modules/marketplace/components/off-plan/off-plan-pf-list-card";

type Copy = {
  filters: {
    city: string;
    propertyType: string;
    priceRange: string;
    all: string;
    noResults: string;
    showing: string;
  };
  offPlanLabel: string;
  completedLabel: string;
  startingFrom: string;
  launchPrice: string;
  explore: string;
  deliveryLabel: string;
};

type Props = {
  projects: ShowcaseProject[];
  locale: Locale;
  copy: Copy;
};

export function OffPlanPfListing({ projects, locale, copy }: Props) {
  const [city, setCity] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const filtered = useMemo(
    () => projects.filter((p) => matchesOffPlanFilters(p, { city, propertyType, priceRange })),
    [projects, city, propertyType, priceRange]
  );

  const cardCopy = {
    offPlanLabel: copy.offPlanLabel,
    completedLabel: copy.completedLabel,
    startingFrom: copy.startingFrom,
    launchPrice: copy.launchPrice,
    explore: copy.explore,
    deliveryLabel: copy.deliveryLabel,
  };

  return (
    <div className="ruwaq-pf-listing">
      <div className="ruwaq-pf-listing-filters">
        <label className="ruwaq-pf-listing-filter">
          <span>{copy.filters.city}</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_FILTER_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </label>
        <label className="ruwaq-pf-listing-filter">
          <span>{copy.filters.propertyType}</span>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_FILTER_PROPERTY_TYPES.map((t) => (
              <option key={t.slug} value={t.slug}>
                {locale === "ar" ? t.nameAr : t.nameEn}
              </option>
            ))}
          </select>
        </label>
        <label className="ruwaq-pf-listing-filter">
          <span>{copy.filters.priceRange}</span>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_PRICE_RANGES.map((r) => (
              <option key={r.slug} value={r.slug}>
                {locale === "ar" ? r.nameAr : r.nameEn}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="ruwaq-pf-listing-meta">
        {copy.filters.showing.replace("{count}", String(filtered.length))}
      </p>

      {filtered.length === 0 ? (
        <p className="ruwaq-pf-listing-empty">{copy.filters.noResults}</p>
      ) : (
        <div className="ruwaq-pf-listing-grid">
          {filtered.map((project) => (
            <OffPlanPfListCard key={project.id} project={project} locale={locale} copy={cardCopy} />
          ))}
        </div>
      )}
    </div>
  );
}
