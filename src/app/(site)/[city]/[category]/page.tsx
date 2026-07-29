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

type Props = {
  params: { city: string; category: string };
  searchParams: { q?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  const cat = getCategoryBySlug(params.category);
  if (!city || !cat) return {};
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? `أفضل شركات ${cat.nameAr} في ${city.nameAr} | منصة رواق`
      : `Best ${cat.nameEn} in ${city.nameEn} | Ruwaq`;
  return {
    title,
    description:
      locale === "ar"
        ? `دليل ${cat.nameAr} المعتمد في ${city.nameAr} — اطلب عرض سعر عبر رواق.`
        : `Verified ${cat.nameEn} directory in ${city.nameEn}.`,
  };
}

export default async function CategoryListingPage({ params, searchParams }: Props) {
  const city = getCityBySlug(params.city);
  const catMeta = getCategoryBySlug(params.category);
  if (!city || !catMeta) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const { listings } = await getListingsForCityCategory(
    params.city as MarketplaceCitySlug,
    params.category as MarketplaceCategorySlug
  );

  const q = searchParams.q?.trim();
  const filtered = q
    ? listings.filter(
        (l) =>
          l.titleAr.includes(q) ||
          l.descriptionAr.includes(q) ||
          (l.titleEn?.toLowerCase().includes(q.toLowerCase()) ?? false)
      )
    : listings;

  const catName = locale === "ar" ? catMeta.nameAr : catMeta.nameEn;
  const cityName = locale === "ar" ? city.nameAr : city.nameEn;

  return (
    <div className="app-content-area max-w-6xl">
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
      {q && (
        <p className="mt-2 text-sm text-ruwaq-ink-soft">
          {locale === "ar" ? `نتائج البحث: «${q}»` : `Search: “${q}”`}
        </p>
      )}
      <CategoryQuoteCta
        label={t.marketplace.listing.requestCta}
        closeLabel={t.nav.closeModal}
        copy={t.marketplace.quote}
        locale={locale}
        citySlug={city.slug}
        categorySlug={catMeta.slug}
      />
      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-ruwaq-stone p-10 text-center text-ruwaq-ink-soft">
          {t.marketplace.listing.empty}
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <ProviderCard
              key={listing.id}
              listing={listing}
              labels={t.marketplace.listing}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
