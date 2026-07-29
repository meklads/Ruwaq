import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { MarketplaceHomeHero } from "@/modules/marketplace/components/marketplace-home-hero";
import { MarketplaceSearchBar } from "@/modules/marketplace/components/marketplace-search-bar";
import { MarketplaceCategoryGrid } from "@/modules/marketplace/components/marketplace-category-grid";
import { ContractorToolIntro } from "@/modules/marketplace/components/contractor-tool-intro";
import { NewProposalForm } from "@/modules/proposal/components/new-proposal-form";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      <MarketplaceHomeHero copy={t.marketplace.hero} locale={locale} />
      <MarketplaceSearchBar copy={t.marketplace.search} locale={locale} />
      <MarketplaceCategoryGrid copy={t.marketplace.categories} locale={locale} />
      <ContractorToolIntro copy={t.marketplace.contractorSection} locale={locale} />
      <NewProposalForm variant="embedded" />
    </>
  );
}
