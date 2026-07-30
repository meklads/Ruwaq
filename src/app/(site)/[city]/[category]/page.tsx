import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { legacyCategoryRedirectTarget } from "@/modules/marketplace/lib/marketplace-slugs";
import { getListingsForCityCategory } from "@/modules/marketplace/server/listings.service";
import { ListingCard } from "@/modules/marketplace/components/directory/ListingCard";
import { DirectoryFilters } from "@/modules/marketplace/components/directory-filters";
import { CategoryQuoteCta } from "@/modules/marketplace/components/category-quote-cta";
import {
  parseFeaturedOnly,
  parseListingsSort,
} from "@/modules/marketplace/lib/listings-query";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import {
  buildCategoryCollectionJsonLd,
  buildCategoryItemListJsonLd,
  buildCategoryListingMetadata,
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

  const { listings, total, pageSize, totalPages } = await getListingsForCityCategory(
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
        <div className="mt-6">
          <CategoryQuoteCta
            label={t.marketplace.listing.requestCta}
            closeLabel={t.nav.closeModal}
            copy={t.marketplace.quote}
            locale={locale}
            citySlug={city.slug}
            categorySlug={catMeta.slug}
          />
        </div>
      </header>
      {listings.length === 0 ? (
        <p className="mx-auto mt-12 max-w-6xl border border-dashed border-neutral-300 bg-white p-12 text-center text-neutral-600">
          {t.marketplace.listing.empty}
        </p>
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
