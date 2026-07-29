import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { MarketplaceHomeHero } from "@/modules/marketplace/components/marketplace-home-hero";
import { MarketplaceSearchBar } from "@/modules/marketplace/components/marketplace-search-bar";
import { MarketplaceCategoryGrid } from "@/modules/marketplace/components/marketplace-category-grid";
import { ContractorPromoBanner } from "@/modules/marketplace/components/contractor-promo-banner";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      {/* 1. Marketplace: owners & quote requests */}
      <MarketplaceHomeHero
        copy={t.marketplace.hero}
        quoteCopy={t.marketplace.quote}
        closeModalLabel={t.nav.closeModal}
        locale={locale}
      />
      <MarketplaceSearchBar copy={t.marketplace.search} locale={locale} />
      <MarketplaceCategoryGrid copy={t.marketplace.categories} locale={locale} />

      <ContractorPromoBanner copy={t.marketplace.contractorPromo} locale={locale} />
    </>
  );
}
