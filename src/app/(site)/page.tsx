import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqProHero } from "@/modules/marketplace/components/directory/RuwaqProHero";
import { TodaysDirectorySection } from "@/modules/marketplace/components/todays-directory-section";
import { ProjectToursSection } from "@/modules/marketplace/components/project-tours-section";
import { GuidesSection } from "@/modules/marketplace/components/guides-section";
import { EditorialCategoryGrid } from "@/modules/marketplace/components/editorial-category-grid";
import { HowItWorksSection } from "@/modules/marketplace/components/how-it-works-section";
import { SocialProofSection } from "@/modules/marketplace/components/social-proof-section";
import { ContractorPromoBanner } from "@/modules/marketplace/components/contractor-promo-banner";
import { GraphicsHousePromoBanner } from "@/modules/marketplace/components/graphics-house-promo-banner";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      <RuwaqProHero
        copy={t.marketplace.proDirectory}
        searchCopy={t.marketplace.search}
        locale={locale}
      />
      <TodaysDirectorySection />
      <ProjectToursSection />
      <EditorialCategoryGrid
        copy={t.marketplace.categories}
        magazineCopy={t.marketplace.homeMagazine}
        locale={locale}
      />
      <GuidesSection />
      <HowItWorksSection copy={t.marketplace.howItWorks} locale={locale} />
      <SocialProofSection copy={t.marketplace.socialProof} />
      <GraphicsHousePromoBanner copy={t.marketplace.graphicsHousePromo} />
      <ContractorPromoBanner copy={t.marketplace.contractorPromo} locale={locale} />
    </>
  );
}
