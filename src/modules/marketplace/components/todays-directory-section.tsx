import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getProShowcaseListings } from "@/modules/marketplace/server/join.actions";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { ListingCard } from "@/modules/marketplace/components/directory/ListingCard";

export async function TodaysDirectorySection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.homeMagazine;
  const listings = await getProShowcaseListings();

  if (listings.length === 0) return null;

  const featured = listings.slice(0, 6);

  return (
    <section className="ruwaq-ad-section" aria-labelledby="todays-directory-title">
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.todaysDirectoryEyebrow}</p>
            <h2 id="todays-directory-title" className="ruwaq-ad-section-title">
              {copy.todaysDirectoryTitle}
            </h2>
          </div>
          <Link href="/pro" className="ruwaq-pro-btn-outline hidden px-5 py-2 sm:inline-flex">
            {copy.viewAllFeatured}
          </Link>
        </header>

        <div className="ruwaq-pro-editorial-grid">
          {featured.map((listing) => {
            const cityMeta = getCityBySlug(citySlugFromEnum(listing.city));
            const catMeta = getCategoryBySlug(listing.category.slug as MarketplaceCategorySlug);
            const cityLabel = cityMeta
              ? locale === "ar"
                ? cityMeta.nameAr
                : cityMeta.nameEn
              : undefined;
            const categoryLabel = catMeta
              ? locale === "ar"
                ? catMeta.nameAr
                : catMeta.nameEn
              : undefined;

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

        <p className="mt-8 text-center sm:hidden">
          <Link href="/pro" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAllFeatured}
          </Link>
        </p>
      </div>
    </section>
  );
}
