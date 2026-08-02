import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { PROJECT_TOURS } from "@/content/project-tours";
import { ProjectTourCard } from "@/modules/marketplace/components/project-tour-card";
import { OffPlanLaunchesSection } from "@/modules/marketplace/components/off-plan/off-plan-launches-section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.marketplace.projectTours.metaTitle,
    description: t.marketplace.projectTours.metaDescription,
  };
}

export default async function ProjectToursIndexPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.projectTours;
  const offPlanCopy = t.marketplace.offPlan;

  return (
    <div className="ruwaq-ad-page">
      <OffPlanLaunchesSection variant="tours" />

      <header className="ruwaq-ad-section border-b border-neutral-200 pb-10 pt-4">
        <div className="ruwaq-ad-content">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
          <p className="mt-4 text-sm text-neutral-600">{offPlanCopy.toursBridge}</p>
        </div>
      </header>

      <div className="ruwaq-ad-section">
        <div className="ruwaq-ad-content">
          <div className="ruwaq-pro-editorial-grid">
            {PROJECT_TOURS.map((tour) => (
              <ProjectTourCard
                key={tour.slug}
                tour={tour}
                locale={locale}
                readLabel={copy.readTour}
              />
            ))}
          </div>
          <p className="mt-12 text-center">
            <Link href="/" className="ruwaq-pro-btn-outline px-6 py-2.5">
              {copy.backHome}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
