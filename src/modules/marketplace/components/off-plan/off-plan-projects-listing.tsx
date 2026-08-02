"use client";

import { useMemo, useState } from "react";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  matchesOffPlanFilters,
  OFF_PLAN_FILTER_CITIES,
  OFF_PLAN_FILTER_PROPERTY_TYPES,
  OFF_PLAN_PRICE_RANGES,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { OffPlanProjectCard } from "@/modules/marketplace/components/off-plan/off-plan-project-card";

type Copy = {
  filters: {
    city: string;
    propertyType: string;
    priceRange: string;
    all: string;
    noResults: string;
    showing: string;
  };
  badgeExclusive: string;
  badgeUnderConstruction: string;
  startingFrom: string;
  explore: string;
  downloadBrochure: string;
  closeModal: string;
  leadForm: {
    title: string;
    subtitle: string;
    fullName: string;
    whatsApp: string;
    email: string;
    role: string;
    roleEndBuyer: string;
    roleInvestor: string;
    roleBroker: string;
    submit: string;
    submitting: string;
    success: string;
    validation: string;
    invalidPhone: string;
  };
};

type Props = {
  projects: OffPlanProject[];
  locale: Locale;
  copy: Copy;
  pageSize?: number;
};

export function OffPlanProjectsListing({ projects, locale, copy, pageSize = 6 }: Props) {
  const [city, setCity] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        matchesOffPlanFilters(p, { city, propertyType, priceRange })
      ),
    [projects, city, propertyType, priceRange]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const cardCopy = {
    badgeExclusive: copy.badgeExclusive,
    badgeUnderConstruction: copy.badgeUnderConstruction,
    startingFrom: copy.startingFrom,
    explore: copy.explore,
    downloadBrochure: copy.downloadBrochure,
    closeModal: copy.closeModal,
    leadForm: copy.leadForm,
  };

  const resetPage = () => setPage(1);

  return (
    <div className="ruwaq-offplan-listing">
      <div className="ruwaq-offplan-filter-bar">
        <label className="ruwaq-offplan-filter">
          <span>{copy.filters.city}</span>
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              resetPage();
            }}
          >
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_FILTER_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </label>
        <label className="ruwaq-offplan-filter">
          <span>{copy.filters.propertyType}</span>
          <select
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
              resetPage();
            }}
          >
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_FILTER_PROPERTY_TYPES.map((t) => (
              <option key={t.slug} value={t.slug}>
                {locale === "ar" ? t.nameAr : t.nameEn}
              </option>
            ))}
          </select>
        </label>
        <label className="ruwaq-offplan-filter">
          <span>{copy.filters.priceRange}</span>
          <select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              resetPage();
            }}
          >
            <option value="all">{copy.filters.all}</option>
            {OFF_PLAN_PRICE_RANGES.map((r) => (
              <option key={r.slug} value={r.slug}>
                {locale === "ar" ? r.nameAr : r.nameEn}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="ruwaq-offplan-results-meta">
        {copy.filters.showing.replace("{count}", String(filtered.length))}
      </p>

      {slice.length === 0 ? (
        <p className="ruwaq-offplan-empty">{copy.filters.noResults}</p>
      ) : (
        <div className="ruwaq-offplan-home-grid">
          {slice.map((project) => (
            <OffPlanProjectCard
              key={project.id}
              project={project}
              locale={locale}
              copy={cardCopy}
            />
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <nav className="ruwaq-offplan-pagination" aria-label="Pagination">
          <button
            type="button"
            className="ruwaq-pro-btn-outline px-4 py-2"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="ruwaq-pro-btn-outline px-4 py-2"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </nav>
      ) : null}
    </div>
  );
}
