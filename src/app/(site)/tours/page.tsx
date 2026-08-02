import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getAllShowcaseProjects } from "@/content/showcase-projects";
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
  const copy = t.marketplace.projectTours;
  const offPlanCopy = t.marketplace.offPlan;
  const projects = getAllShowcaseProjects();

  return (
    <div className="ruwaq-ad-page">
      <section id="project-tours" className="ruwaq-ad-section">
        <div className="ruwaq-ad-content">
          <nav className="mb-6 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              {copy.backHome}
            </Link>
          </nav>

          <header className="ruwaq-ad-section-header">
            <div className="max-w-3xl">
              <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
              <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
              <p className="ruwaq-ad-section-lead ruwaq-offplan-section-lead">{copy.subtitle}</p>
            </div>
          </header>

          <OffPlanPfListing
            projects={projects}
            locale={locale}
            copy={{
              filters: offPlanCopy.filters,
              offPlanLabel: offPlanCopy.offPlanLabel,
              completedLabel: copy.completedBadge,
              startingFrom: offPlanCopy.startingFrom,
              launchPrice: offPlanCopy.launchPriceLabel,
              explore: copy.readTour,
              deliveryLabel: offPlanCopy.deliveryLabel,
            }}
          />
        </div>
      </section>
    </div>
  );
}
