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
import { FeaturedDirectoryRail } from "@/modules/marketplace/components/featured-directory-rail";

export async function TodaysDirectorySection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.homeMagazine;
  const listings = await getProShowcaseListings();

  if (listings.length === 0) return null;

  const featured = listings.slice(0, 10);
  const prevLabel = locale === "ar" ? "السابق" : "Previous";
  const nextLabel = locale === "ar" ? "التالي" : "Next";

  return (
    <section
      className="ruwaq-ad-section ruwaq-ad-section--featured"
      aria-labelledby="todays-directory-title"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header ruwaq-ad-section-header--featured">
          <div className="ruwaq-ad-section-header__copy">
            <p className="ruwaq-ad-eyebrow">{copy.todaysDirectoryEyebrow}</p>
            <h2 id="todays-directory-title" className="ruwaq-ad-section-title">
              {copy.todaysDirectoryTitle}
            </h2>
            <p className="ruwaq-ad-section-lead mx-auto">{copy.todaysDirectoryLead}</p>
          </div>
        </header>

        <FeaturedDirectoryRail prevLabel={prevLabel} nextLabel={nextLabel}>
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
              <div key={listing.id} className="ruwaq-ad-featured-rail__item">
                <ListingCard
                  listing={listing}
                  labels={t.marketplace.listing}
                  locale={locale}
                  categoryLabel={categoryLabel}
                  cityLabel={cityLabel}
                />
              </div>
            );
          })}
        </FeaturedDirectoryRail>

        <p className="mt-8 text-center">
          <Link href="/pro" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAllFeatured}
          </Link>
        </p>
      </div>
    </section>
  );
}
