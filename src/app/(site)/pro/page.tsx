import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  MARKETPLACE_CITIES,
  citySlugFromEnum,
  getCityBySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { getProShowcaseListings } from "@/modules/marketplace/server/join.actions";
import { ListingCard } from "@/modules/marketplace/components/directory/ListingCard";
import { parseCitySlug } from "@/modules/marketplace/lib/marketplace-slugs";

type Props = {
  searchParams: { city?: string };
};

export default async function ProShowcasePage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.proShowcase;
  const citySlug = searchParams.city ? parseCitySlug(searchParams.city) : undefined;
  const listings = await getProShowcaseListings(citySlug as MarketplaceCitySlug | undefined);

  return (
    <div className="ruwaq-pro-directory">
      <header className="ruwaq-pro-directory-header">
        <p className="ruwaq-pro-eyebrow text-neutral-500">{copy.eyebrow}</p>
        <h1 className="ruwaq-pro-directory-title">{copy.title}</h1>
        <p className="ruwaq-pro-directory-meta mt-3 normal-case tracking-normal">{copy.subtitle}</p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label={copy.filterCity}>
          <Link
            href="/pro"
            className={`ruwaq-pro-chip border-neutral-300 bg-white text-neutral-900${!citySlug ? " ring-2 ring-neutral-900" : ""}`}
          >
            {copy.allCities}
          </Link>
          {MARKETPLACE_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/pro?city=${city.slug}`}
              className={`ruwaq-pro-chip border-neutral-300 bg-white text-neutral-900${citySlug === city.slug ? " ring-2 ring-neutral-900" : ""}`}
            >
              {locale === "ar" ? city.nameAr : city.nameEn}
            </Link>
          ))}
        </nav>
      </header>

      {listings.length === 0 ? (
        <p className="mx-auto mt-12 max-w-6xl border border-dashed border-neutral-300 bg-white p-12 text-center text-neutral-600">
          {copy.empty}
        </p>
      ) : (
        <div className="ruwaq-pro-editorial-grid">
          {listings.map((listing) => {
            const cityMeta = getCityBySlug(citySlugFromEnum(listing.city));
            const cityLabel = cityMeta
              ? locale === "ar"
                ? cityMeta.nameAr
                : cityMeta.nameEn
              : undefined;
            const categoryLabel =
              locale === "ar" ? listing.category.nameAr : listing.category.nameEn;
            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                labels={t.marketplace.listing}
                locale={locale}
                categoryLabel={categoryLabel}
                cityLabel={cityLabel}
              />
            );
          })}
        </div>
      )}

      <p className="mx-auto mt-12 max-w-6xl text-center">
        <Link href="/join" className="ruwaq-pro-btn-solid px-8 py-3">
          {t.marketplace.proDirectory.applyCta}
        </Link>
      </p>
    </div>
  );
}
