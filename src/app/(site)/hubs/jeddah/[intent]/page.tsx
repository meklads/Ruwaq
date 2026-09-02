import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { getMessages } from "@/shared/i18n";
import {
  getAllJeddahIntentSlugs,
  getJeddahIntentLanding,
} from "@/content/jeddah-landings";
import { getCategoryBySlug, getCityBySlug } from "@/shared/constants/marketplace-taxonomy";
import { getListingsForCityCategory } from "@/modules/marketplace/server/listings.service";
import { JeddahCategoryLanding } from "@/modules/marketplace/components/jeddah-category-landing";
import {
  buildCategoryCollectionJsonLd,
  buildCategoryItemListJsonLd,
  buildJeddahLandingMetadata,
} from "@/modules/marketplace/seo/marketplace-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: { intent: string };
};

export function generateStaticParams() {
  return getAllJeddahIntentSlugs().map((intent) => ({ intent }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const landing = getJeddahIntentLanding(params.intent);
  if (!landing) return {};
  const locale = await getLocale();
  return buildJeddahLandingMetadata({
    locale,
    landing,
    path: `/hubs/jeddah/${params.intent}`,
  });
}

export default async function JeddahIntentLandingPage({ params }: Props) {
  const landing = getJeddahIntentLanding(params.intent);
  if (!landing) notFound();

  const city = getCityBySlug("jeddah");
  const catMeta = getCategoryBySlug(landing.categorySlug);
  if (!city || !catMeta) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);

  const { listings, total, totalPages } = await getListingsForCityCategory(
    "jeddah",
    landing.categorySlug
  );

  const catName = locale === "ar" ? catMeta.nameAr : catMeta.nameEn;
  const cityName = locale === "ar" ? city.nameAr : city.nameEn;

  const itemListJsonLd =
    listings.length > 0
      ? buildCategoryItemListJsonLd({
          locale,
          citySlug: "jeddah",
          categorySlug: catMeta.slug,
          listings,
        })
      : null;
  const collectionJsonLd = buildCategoryCollectionJsonLd({
    locale,
    citySlug: "jeddah",
    categorySlug: catMeta.slug,
  });

  return (
    <JeddahCategoryLanding
      landing={landing}
      locale={locale}
      citySlug="jeddah"
      cityName={cityName}
      categorySlug={catMeta.slug}
      categoryName={catName}
      listings={listings}
      total={total}
      totalPages={totalPages}
      page={1}
      featuredOnly={false}
      sort="featured"
      buildPageHref={() => `/hubs/jeddah/${params.intent}`}
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
