import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { PROJECT_TOURS } from "@/content/project-tours";
import { ProjectTourCard } from "@/modules/marketplace/components/project-tour-card";

export async function ProjectToursSection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.projectTours;

  return (
    <section className="ruwaq-ad-band-stone ruwaq-ad-section border-t border-neutral-200" id="tours">
      <div className="mx-auto max-w-7xl">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
            <h2 className="ruwaq-ad-section-title">{copy.title}</h2>
            <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
          </div>
          <Link href="/tours" className="ruwaq-pro-btn-outline hidden px-5 py-2 sm:inline-flex">
            {copy.viewAll}
          </Link>
        </header>

        <div className="ruwaq-pro-editorial-grid mt-10">
          {PROJECT_TOURS.map((tour) => (
            <ProjectTourCard
              key={tour.slug}
              tour={tour}
              locale={locale}
              readLabel={copy.readTour}
            />
          ))}
        </div>

        <p className="mt-8 text-center sm:hidden">
          <Link href="/tours" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
