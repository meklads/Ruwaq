import Link from "next/link";
import type { ProviderListing } from "@prisma/client";
import { getGuide } from "@/content/guides";
import type { JeddahSectorLanding } from "@/content/jeddah-landings";
import { ListingCard } from "@/modules/marketplace/components/directory/ListingCard";
import { DirectoryEmptyState } from "@/modules/marketplace/components/directory-empty-state";
import { DirectoryFilters } from "@/modules/marketplace/components/directory-filters";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";
import type { ListingsSort } from "@/modules/marketplace/lib/listings-query";

type Props = {
  landing: JeddahSectorLanding;
  locale: Locale;
  citySlug: string;
  cityName: string;
  categorySlug: MarketplaceCategorySlug;
  categoryName: string;
  listings: ProviderListing[];
  total: number;
  totalPages: number;
  page: number;
  q?: string;
  featuredOnly: boolean;
  sort: ListingsSort;
  buildPageHref: (page: number) => string;
  quoteCopy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  listingLabels: Messages["marketplace"]["listing"];
  filtersCopy: Messages["marketplace"]["filters"];
  directoryLabel: string;
  closeLabel: string;
  itemListJsonLd: Record<string, unknown> | null;
  collectionJsonLd: Record<string, unknown>;
  howMatchLabel: string;
};

export function JeddahCategoryLanding({
  landing,
  locale,
  citySlug,
  cityName,
  categorySlug,
  categoryName,
  listings,
  total,
  totalPages,
  page,
  q,
  featuredOnly,
  sort,
  buildPageHref,
  quoteCopy,
  visualizationCopy,
  listingLabels,
  filtersCopy,
  directoryLabel,
  closeLabel,
  itemListJsonLd,
  collectionJsonLd,
  howMatchLabel,
}: Props) {
  const isAr = locale === "ar";
  const heroTitle = isAr ? landing.heroTitleAr : landing.heroTitleEn;
  const heroLead = isAr ? landing.heroLeadAr : landing.heroLeadEn;

  const resultLabel = isAr
    ? q
      ? `${total} شركة معتمدة لـ «${q}»`
      : `${total} شركة معتمدة`
    : q
      ? `${total} verified companies for “${q}”`
      : `${total} verified companies`;

  const relatedGuides = landing.relatedGuideSlugs
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="ruwaq-pro-directory">
      <JsonLdScript data={itemListJsonLd ?? collectionJsonLd} />
      {itemListJsonLd ? <JsonLdScript data={collectionJsonLd} /> : null}

      <header className="border-b border-neutral-200 bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto max-w-5xl">
          <nav className="ruwaq-pro-breadcrumb text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              {directoryLabel}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${citySlug}`} className="hover:text-white">
              {cityName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{categoryName}</span>
          </nav>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b47a]">
            {isAr ? "رواق · جدة" : "Ruwaq · Jeddah"}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {heroLead}
          </p>
          <Link
            href="/how-we-match"
            className="mt-4 inline-block text-sm font-semibold text-[#d4b47a] underline-offset-4 hover:underline"
          >
            {howMatchLabel}
          </Link>
        </div>
      </header>

      <section className="border-b border-neutral-200 bg-white py-10">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <QuoteRequestForm
            copy={quoteCopy}
            visualizationCopy={visualizationCopy}
            locale={locale}
            initialCity="jeddah"
            initialCategory={categorySlug}
            variant="landing"
            lockCategory
          />
        </div>
      </section>

      {landing.sections.length > 0 || landing.faq.length > 0 ? (
        <section className="ruwaq-ad-content mx-auto max-w-3xl py-12">
          {landing.sections.map((section) => (
            <div key={section.titleEn} className="mb-10">
              <h2 className="text-lg font-semibold text-neutral-900">
                {isAr ? section.titleAr : section.titleEn}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {isAr ? section.bodyAr : section.bodyEn}
              </p>
            </div>
          ))}

          {landing.faq.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                {isAr ? "أسئلة شائعة" : "FAQ"}
              </h2>
              <dl className="mt-6 space-y-6">
                {landing.faq.map((item) => (
                  <div key={item.qEn}>
                    <dt className="font-semibold text-neutral-900">
                      {isAr ? item.qAr : item.qEn}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {isAr ? item.aAr : item.aEn}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {relatedGuides.length > 0 ? (
            <div className="mt-12 border-t border-neutral-200 pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                {isAr ? "أدلة ذات صلة" : "Related guides"}
              </h2>
              <ul className="mt-4 space-y-2">
                {relatedGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
                    >
                      {isAr ? guide.titleAr : guide.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="border-t border-neutral-200 bg-neutral-50/50 py-10">
        <div className="ruwaq-pro-directory-header">
          <div className="ruwaq-pro-directory-heading">
            <div>
              <p className="ruwaq-pro-directory-label">{directoryLabel}</p>
              <h2 className="ruwaq-pro-directory-title text-2xl">
                {isAr
                  ? `شركات ${categoryName} المعتمدة في ${cityName}`
                  : `Verified ${categoryName} companies in ${cityName}`}
              </h2>
            </div>
            <p className="ruwaq-pro-directory-count">{resultLabel}</p>
          </div>

          {totalPages > 1 ? (
            <p className="mt-3 text-[10px] uppercase tracking-widest text-neutral-400">
              {isAr ? `صفحة ${page} من ${totalPages}` : `Page ${page} of ${totalPages}`}
            </p>
          ) : null}

          <DirectoryFilters
            citySlug={citySlug}
            categorySlug={categorySlug}
            copy={filtersCopy}
            locale={locale}
            initialQuery={q}
            initialFeatured={featuredOnly}
            initialSort={sort}
          />
        </div>

        {listings.length === 0 ? (
          <DirectoryEmptyState
            copy={listingLabels.emptyState}
            quoteErrors={quoteCopy.errors}
            fields={quoteCopy.fields}
            locale={locale}
            citySlug={citySlug}
            categorySlug={categorySlug}
            searchQuery={q}
          />
        ) : (
          <>
            <div className="ruwaq-pro-editorial-grid">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  labels={listingLabels}
                  locale={locale}
                  categoryLabel={categoryName}
                  cityLabel={cityName}
                />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
                aria-label={isAr ? "ترقيم النتائج" : "Results pagination"}
              >
                {page > 1 ? (
                  <Link href={buildPageHref(page - 1)} className="ruwaq-pro-btn-outline px-6 py-2.5">
                    {isAr ? "← السابق" : "← Previous"}
                  </Link>
                ) : null}
                {page < totalPages ? (
                  <Link href={buildPageHref(page + 1)} className="ruwaq-pro-btn-solid px-6 py-2.5">
                    {isAr ? "التالي →" : "Next →"}
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
