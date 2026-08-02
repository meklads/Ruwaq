import Image from "next/image";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  formatOffPlanPrice,
  projectLocation,
  projectTitle,
} from "@/content/off-plan-projects";
import { getFlagshipShowcaseProject } from "@/content/showcase-projects";

export async function ProjectToursHomeSection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.projectTours;
  const offPlanCopy = t.marketplace.offPlan;
  const project = getFlagshipShowcaseProject();

  const projectName = projectTitle(project, locale);
  const location = projectLocation(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);
  const badgeLabel =
    project.badge === "exclusive_3d" ? offPlanCopy.badgeExclusive : offPlanCopy.badgeUnderConstruction;

  return (
    <section
      className="ruwaq-ad-band-stone ruwaq-ad-section border-t border-neutral-200"
      id="project-tours"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header ruwaq-offplan-section-header">
          <div className="max-w-3xl">
            <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
            <h2 className="ruwaq-ad-section-title">{copy.homeTitle}</h2>
            <p className="ruwaq-ad-section-lead ruwaq-offplan-section-lead">{copy.homeSubtitle}</p>
          </div>
          <Link href="/tours" className="ruwaq-pro-btn-outline hidden shrink-0 px-5 py-2.5 sm:inline-flex">
            {copy.viewAll}
          </Link>
        </header>

        <Link href={`/tours/${project.slug}`} className="ruwaq-offplan-feature group mt-10">
          <div className="ruwaq-offplan-feature__media">
            <Image
              src={project.images.main}
              alt={projectName}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="ruwaq-offplan-feature__media-top">
              <span className="ruwaq-offplan-feature__badge">{badgeLabel}</span>
            </div>
            {project.heroVideo ? (
              <span className="ruwaq-offplan-feature__video">▶ {offPlanCopy.watchFilm}</span>
            ) : null}
          </div>

          <div className="ruwaq-offplan-feature__body">
            <p className="ruwaq-offplan-feature__label">{copy.featuredLabel}</p>
            <h3 className="ruwaq-offplan-feature__title">{projectName}</h3>
            <p className="ruwaq-offplan-feature__location">{location}</p>
            <p className="ruwaq-offplan-feature__price">
              {offPlanCopy.startingFrom} <strong>{price}</strong>
            </p>
            <span className="ruwaq-pro-btn-solid ruwaq-offplan-feature__cta">{copy.readTour}</span>
          </div>
        </Link>

        <p className="mt-8 text-center sm:hidden">
          <Link href="/tours" className="ruwaq-pro-btn-solid px-8 py-3">
            {copy.viewAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
