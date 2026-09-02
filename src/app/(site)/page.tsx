import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqProHero } from "@/modules/marketplace/components/directory/RuwaqProHero";
import { BudgetEstimatorSection } from "@/modules/marketplace/components/budget-estimator-section";
import { TodaysDirectorySection } from "@/modules/marketplace/components/todays-directory-section";
import { TodaysStoriesSection } from "@/modules/marketplace/components/todays-stories-section";
import { ProjectToursHomeSection } from "@/modules/marketplace/components/project-tours-home-section";
import { GuidesSection } from "@/modules/marketplace/components/guides-section";
import { EditorialCategoryGrid } from "@/modules/marketplace/components/editorial-category-grid";
import { HowItWorksSection } from "@/modules/marketplace/components/how-it-works-section";
import { HomepagePromoBands } from "@/modules/marketplace/components/homepage-promo-bands";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/modules/marketplace/seo/site-jsonld";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const orgJsonLd = buildOrganizationJsonLd(locale);
  const siteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <RuwaqProHero
        magazineCopy={t.marketplace.homeMagazine}
        proCopy={t.marketplace.proDirectory}
        locale={locale}
      />
      <TodaysStoriesSection />
      <ProjectToursHomeSection />
      <GuidesSection />
      <EditorialCategoryGrid
        copy={t.marketplace.categories}
        magazineCopy={t.marketplace.homeMagazine}
        locale={locale}
      />
      <BudgetEstimatorSection
        copy={t.marketplace.budgetEstimator}
        quoteCopy={t.marketplace.quote}
        visualizationCopy={t.marketplace.visualization}
        closeLabel={t.nav.closeModal}
        locale={locale}
      />
      <TodaysDirectorySection />
      <HowItWorksSection copy={t.marketplace.howItWorks} locale={locale} />
      <HomepagePromoBands locale={locale} />
    </>
  );
}
