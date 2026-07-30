import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqProHero } from "@/modules/marketplace/components/directory/RuwaqProHero";
import { MarketplaceSearchBar } from "@/modules/marketplace/components/marketplace-search-bar";
import { MarketplaceCategoryGrid } from "@/modules/marketplace/components/marketplace-category-grid";
import { HowItWorksSection } from "@/modules/marketplace/components/how-it-works-section";
import { SocialProofSection } from "@/modules/marketplace/components/social-proof-section";
import { ContractorPromoBanner } from "@/modules/marketplace/components/contractor-promo-banner";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      <RuwaqProHero copy={t.marketplace.proDirectory} locale={locale} />
      <MarketplaceSearchBar copy={t.marketplace.search} locale={locale} />
      <MarketplaceCategoryGrid copy={t.marketplace.categories} locale={locale} />
      <HowItWorksSection copy={t.marketplace.howItWorks} locale={locale} />
      <SocialProofSection copy={t.marketplace.socialProof} />
      <ContractorPromoBanner copy={t.marketplace.contractorPromo} locale={locale} />
    </>
  );
}
