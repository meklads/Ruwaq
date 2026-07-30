import { notFound } from "next/navigation";
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
import { getListingsForCityCategory } from "@/modules/marketplace/server/lead.actions";
import { ProviderCard } from "@/modules/marketplace/components/provider-card";
import { CategoryQuoteCta } from "@/modules/marketplace/components/category-quote-cta";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import {
  buildCategoryCollectionJsonLd,
  buildCategoryItemListJsonLd,
  buildCategoryListingMetadata,
} from "@/modules/marketplace/seo/marketplace-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: { city: string; category: string };
  searchParams: { q?: string; page?: string };
};

function parsePage(value: string | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function buildPageHref(
  citySlug: string,
  categorySlug: string,
  page: number,
  query?: string
): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
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
  const catMeta = getCategoryBySlug(params.category);
  if (!city || !catMeta) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const q = searchParams.q?.trim();
  const page = parsePage(searchParams.page);

  const { listings, total, pageSize, totalPages } = await getListingsForCityCategory(
    params.city as MarketplaceCitySlug,
    params.category as MarketplaceCategorySlug,
    { query: q, page }
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
    <div className="app-content-area max-w-6xl">
      <JsonLdScript data={itemListJsonLd ?? collectionJsonLd} />
      {itemListJsonLd ? <JsonLdScript data={collectionJsonLd} /> : null}
      <nav className="text-sm text-ruwaq-ink-muted">
        <Link href="/" className="hover:text-ruwaq-gold">
          رواق
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${city.slug}`} className="hover:text-ruwaq-gold">
          {cityName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ruwaq-ink">{catName}</span>
      </nav>
      <h1 className="ruwaq-app-title mt-4">
        {locale === "ar"
          ? `${catName} في ${cityName}`
          : `${catName} in ${cityName}`}
      </h1>
      <p className="mt-2 text-sm font-medium text-ruwaq-ink-soft">{resultLabel}</p>
      {totalPages > 1 ? (
        <p className="mt-1 text-xs text-ruwaq-ink-muted">
          {locale === "ar"
            ? `صفحة ${page} من ${totalPages} · ${pageSize} في الصفحة`
            : `Page ${page} of ${totalPages} · ${pageSize} per page`}
        </p>
      ) : null}
      <CategoryQuoteCta
        label={t.marketplace.listing.requestCta}
        closeLabel={t.nav.closeModal}
        copy={t.marketplace.quote}
        locale={locale}
        citySlug={city.slug}
        categorySlug={catMeta.slug}
      />
      {listings.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-ruwaq-stone p-10 text-center text-ruwaq-ink-soft">
          {t.marketplace.listing.empty}
        </p>
      ) : (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ProviderCard
                key={listing.id}
                listing={listing}
                labels={t.marketplace.listing}
                trustCopy={t.marketplace.trustStandards}
                locale={locale}
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
                  href={buildPageHref(city.slug, catMeta.slug, page - 1, q)}
                  className="btn-ruwaq-secondary px-5 py-2 text-sm"
                >
                  {locale === "ar" ? "← السابق" : "← Previous"}
                </Link>
              ) : null}
              {page < totalPages ? (
                <Link
                  href={buildPageHref(city.slug, catMeta.slug, page + 1, q)}
                  className="btn-ruwaq-secondary px-5 py-2 text-sm"
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
