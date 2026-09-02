import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  getCategoryBySlug,
  getCityBySlug,
  MARKETPLACE_CITIES,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { legacyCategoryRedirectTarget } from "@/modules/marketplace/lib/marketplace-slugs";
import { getListingsForCityCategory } from "@/modules/marketplace/server/listings.service";
import { ListingCard } from "@/modules/marketplace/components/directory/ListingCard";
import { DirectoryFilters } from "@/modules/marketplace/components/directory-filters";
import { DirectoryEmptyState } from "@/modules/marketplace/components/directory-empty-state";
import { CategoryQuoteBanner } from "@/modules/marketplace/components/category-quote-banner";
import { JeddahCategoryLanding } from "@/modules/marketplace/components/jeddah-category-landing";
import { getJeddahSectorLanding } from "@/content/jeddah-landings";
import {
  parseFeaturedOnly,
  parseListingsSort,
} from "@/modules/marketplace/lib/listings-query";
import type { ListingsSort } from "@/modules/marketplace/lib/listings-query";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import {
  buildCategoryCollectionJsonLd,
  buildCategoryItemListJsonLd,
  buildCategoryListingMetadata,
  buildJeddahLandingMetadata,
} from "@/modules/marketplace/seo/marketplace-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: { city: string; category: string };
  searchParams: { q?: string; page?: string; featured?: string; sort?: string };
};

function parsePage(value: string | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function buildPageHref(
  citySlug: string,
  categorySlug: string,
  page: number,
  options: { query?: string; featured?: boolean; sort?: string } = {}
): string {
  const params = new URLSearchParams();
  if (options.query) params.set("q", options.query);
  if (options.featured) params.set("featured", "1");
  if (options.sort && options.sort !== "featured") params.set("sort", options.sort);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/${citySlug}/${categorySlug}${qs ? `?${qs}` : ""}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  const cat = getCategoryBySlug(params.category);
  if (!city || !cat) return {};
  const locale = await getLocale();
  const { total } = await getListingsForCityCategory(
    params.city as MarketplaceCitySlug,
    params.category as MarketplaceCategorySlug
  );

  if (city.slug === "jeddah") {
    const landing = getJeddahSectorLanding(cat.slug);
    if (landing) {
      return buildJeddahLandingMetadata({
        locale,
        landing,
        path: `/${city.slug}/${cat.slug}`,
      });
    }
  }

  return buildCategoryListingMetadata({
    locale,
    citySlug: params.city as MarketplaceCitySlug,
    categorySlug: params.category as MarketplaceCategorySlug,
    listingCount: total,
  });
}

export default async function CategoryListingPage({ params, searchParams }: Props) {
  const city = getCityBySlug(params.city);
  const redirectTarget = legacyCategoryRedirectTarget(params.category);
  if (city && redirectTarget) {
    redirect(`/${city.slug}/${redirectTarget}`);
  }

  const catMeta = getCategoryBySlug(params.category);
  if (!city || !catMeta) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const q = searchParams.q?.trim();
  const page = parsePage(searchParams.page);
  const featuredOnly = parseFeaturedOnly(searchParams.featured);
  const sort = parseListingsSort(searchParams.sort);

  const { listings, total, totalPages } = await getListingsForCityCategory(
    params.city as MarketplaceCitySlug,
    params.category as MarketplaceCategorySlug,
    { query: q, page, featuredOnly, sort }
  );

  const catName = locale === "ar" ? catMeta.nameAr : catMeta.nameEn;
  const cityName = locale === "ar" ? city.nameAr : city.nameEn;

  const itemListJsonLd =
    listings.length > 0
      ? buildCategoryItemListJsonLd({
          locale,
          citySlug: city.slug,
          categorySlug: catMeta.slug,
          listings,
        })
      : null;
  const collectionJsonLd = buildCategoryCollectionJsonLd({
    locale,
    citySlug: city.slug,
    categorySlug: catMeta.slug,
  });

  const jeddahLanding = city.slug === "jeddah" ? getJeddahSectorLanding(catMeta.slug) : undefined;

  if (jeddahLanding) {
    return (
      <JeddahCategoryLanding
        landing={jeddahLanding}
        locale={locale}
        citySlug={city.slug}
        cityName={cityName}
        categorySlug={catMeta.slug}
        categoryName={catName}
        listings={listings}
        total={total}
        totalPages={totalPages}
        page={page}
        q={q}
        featuredOnly={featuredOnly}
        sort={sort}
        buildPageHref={(p) =>
          buildPageHref(city.slug, catMeta.slug, p, {
            query: q,
            featured: featuredOnly,
            sort,
          })
        }
        quoteCopy={t.marketplace.quote}
        visualizationCopy={t.marketplace.visualization}
        listingLabels={t.marketplace.listing}
        filtersCopy={t.marketplace.filters}
        directoryLabel={t.marketplace.proDirectory.directoryLabel}
        closeLabel={t.nav.closeModal}
        itemListJsonLd={itemListJsonLd}
        collectionJsonLd={collectionJsonLd}
        howMatchLabel={t.marketplace.categoryPage.howMatch}
      />
    );
  }

  const resultLabel =
    locale === "ar"
      ? q
        ? `${total} شركة معتمدة لـ «${q}»`
        : `${total} شركة معتمدة`
      : q
        ? `${total} verified companies for “${q}”`
        : `${total} verified companies`;

  return (
    <div className="ruwaq-pro-directory">
      <JsonLdScript data={itemListJsonLd ?? collectionJsonLd} />
      {itemListJsonLd ? <JsonLdScript data={collectionJsonLd} /> : null}
      <header className="ruwaq-pro-directory-header">
        <nav className="ruwaq-pro-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t.marketplace.proDirectory.directoryLabel}</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <Link href={`/${city.slug}`}>{cityName}</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-neutral-950">{catName}</span>
        </nav>

        <div className="ruwaq-pro-directory-heading mt-6">
          <div>
            <p className="ruwaq-pro-directory-label">{t.marketplace.proDirectory.directoryLabel}</p>
            <h1 className="ruwaq-pro-directory-title">
              {locale === "ar"
                ? `شركات ${catName} في ${cityName}`
                : `${catName} companies in ${cityName}`}
            </h1>
          </div>
          <p className="ruwaq-pro-directory-count">{resultLabel}</p>
        </div>

        {totalPages > 1 ? (
          <p className="mt-3 text-[10px] uppercase tracking-widest text-neutral-400">
            {locale === "ar"
              ? `صفحة ${page} من ${totalPages}`
              : `Page ${page} of ${totalPages}`}
          </p>
        ) : null}
        <DirectoryFilters
          citySlug={city.slug}
          categorySlug={catMeta.slug}
          copy={t.marketplace.filters}
          locale={locale}
          initialQuery={q}
          initialFeatured={featuredOnly}
          initialSort={sort}
        />
      </header>

      <CategoryQuoteBanner
        locale={locale}
        cityName={cityName}
        categoryName={catName}
        title={t.marketplace.categoryPage.bannerTitle}
        lead={t.marketplace.categoryPage.bannerLead}
        cta={t.marketplace.categoryPage.bannerCta}
        howMatchLabel={t.marketplace.categoryPage.howMatch}
        citySlug={city.slug}
        categorySlug={catMeta.slug}
      />

      {listings.length === 0 ? (
        <DirectoryEmptyState
          copy={t.marketplace.listing.emptyState}
          quoteErrors={t.marketplace.quote.errors}
          fields={t.marketplace.quote.fields}
          locale={locale}
          citySlug={city.slug}
          categorySlug={catMeta.slug}
          searchQuery={q}
        />
      ) : (
        <>
          <div className="ruwaq-pro-editorial-grid">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                labels={t.marketplace.listing}
                locale={locale}
                categoryLabel={catName}
                cityLabel={cityName}
              />
            ))}
          </div>
          {totalPages > 1 ? (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              aria-label={locale === "ar" ? "ترقيم النتائج" : "Results pagination"}
            >
              {page > 1 ? (
                <Link
                  href={buildPageHref(city.slug, catMeta.slug, page - 1, {
                    query: q,
                    featured: featuredOnly,
                    sort,
                  })}
                  className="ruwaq-pro-btn-outline px-6 py-2.5"
                >
                  {locale === "ar" ? "← السابق" : "← Previous"}
                </Link>
              ) : null}
              {page < totalPages ? (
                <Link
                  href={buildPageHref(city.slug, catMeta.slug, page + 1, {
                    query: q,
                    featured: featuredOnly,
                    sort,
                  })}
                  className="ruwaq-pro-btn-solid px-6 py-2.5"
                >
                  {locale === "ar" ? "التالي →" : "Next →"}
                </Link>
              ) : null}
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}
