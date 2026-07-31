import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { PROJECT_TOURS } from "@/content/project-tours";
import { ProjectTourCard } from "@/modules/marketplace/components/project-tour-card";

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

  return (
    <div className="ruwaq-ad-page">
      <header className="ruwaq-ad-section border-b border-neutral-200 pb-10">
        <div className="ruwaq-ad-content">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
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
