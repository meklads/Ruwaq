import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { OFF_PLAN_PROJECTS } from "@/content/off-plan-projects";
import { PROJECT_TOURS } from "@/content/project-tours";
import { ProjectTourCard } from "@/modules/marketplace/components/project-tour-card";
import { OffPlanPfListing } from "@/modules/marketplace/components/off-plan/off-plan-pf-listing";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.marketplace.projectTours.metaTitle,
    description: t.marketplace.projectTours.metaDescription,
  };
}

export default async function ProjectToursHubPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const toursCopy = t.marketplace.projectTours;
  const offPlanCopy = t.marketplace.offPlan;

  return (
    <div className="ruwaq-ad-page">
      {/* Off-plan hub — Property Finder listing style */}
      <section id="off-plan-launches" className="ruwaq-ad-section border-b border-neutral-200">
        <div className="ruwaq-ad-content">
          <header className="ruwaq-ad-section-header">
            <div className="max-w-3xl">
              <p className="ruwaq-ad-eyebrow">{offPlanCopy.eyebrow}</p>
              <h1 className="ruwaq-ad-section-title">{offPlanCopy.indexTitle}</h1>
              <p className="ruwaq-ad-section-lead ruwaq-offplan-section-lead">{offPlanCopy.indexSubtitle}</p>
            </div>
          </header>

          <OffPlanPfListing
            projects={OFF_PLAN_PROJECTS}
            locale={locale}
            copy={{
              filters: offPlanCopy.filters,
              offPlanLabel: offPlanCopy.offPlanLabel,
              startingFrom: offPlanCopy.startingFrom,
              launchPrice: offPlanCopy.launchPriceLabel,
              explore: offPlanCopy.explore,
              deliveryLabel: offPlanCopy.deliveryLabel,
            }}
          />
        </div>
      </section>

      {/* Completed project tours */}
      <section id="completed-tours" className="ruwaq-ad-band-stone ruwaq-ad-section">
        <div className="ruwaq-ad-content">
          <header className="ruwaq-ad-section-header">
            <div>
              <p className="ruwaq-ad-eyebrow">{toursCopy.eyebrow}</p>
              <h2 className="ruwaq-ad-section-title">{toursCopy.title}</h2>
              <p className="ruwaq-ad-section-lead">{toursCopy.subtitle}</p>
            </div>
          </header>

          <div className="ruwaq-pro-editorial-grid mt-10">
            {PROJECT_TOURS.map((tour) => (
              <ProjectTourCard
                key={tour.slug}
                tour={tour}
                locale={locale}
                readLabel={toursCopy.readTour}
              />
            ))}
          </div>

          <p className="mt-12 text-center">
            <Link href="/" className="ruwaq-pro-btn-outline px-6 py-2.5">
              {toursCopy.backHome}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
