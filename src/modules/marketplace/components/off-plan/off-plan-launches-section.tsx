import Image from "next/image";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  formatOffPlanPrice,
  getFeaturedOffPlanProjects,
  getFlagshipOffPlanProject,
  projectLocation,
  projectTitle,
} from "@/content/off-plan-projects";

type Variant = "homepage" | "tours";

type Props = {
  variant?: Variant;
};

export async function OffPlanLaunchesSection({ variant = "homepage" }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.offPlan;
  const flagship = getFlagshipOffPlanProject();
  const others = getFeaturedOffPlanProjects().filter((p) => p.slug !== flagship.slug).slice(0, 2);

  const flagshipTitle = projectTitle(flagship, locale);
  const flagshipLocation = projectLocation(flagship, locale);
  const flagshipPrice = formatOffPlanPrice(flagship.startingPrice, locale);
  const badgeLabel =
    flagship.badge === "exclusive_3d" ? copy.badgeExclusive : copy.badgeUnderConstruction;

  const isHomepage = variant === "homepage";

  return (
    <section
      className={
        isHomepage
          ? "ruwaq-offplan-spotlight ruwaq-ad-section"
          : "ruwaq-offplan-spotlight ruwaq-offplan-spotlight--compact ruwaq-ad-section border-b border-neutral-200"
      }
      id="off-plan-launches"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-offplan-spotlight-header">
          <div>
            <p className="ruwaq-ad-eyebrow ruwaq-offplan-spotlight-eyebrow">{copy.eyebrow}</p>
            <h2 className="ruwaq-ad-section-title ruwaq-offplan-spotlight-title">{copy.title}</h2>
            <p className="ruwaq-ad-section-lead ruwaq-offplan-spotlight-lead">{copy.subtitle}</p>
          </div>
          <Link
            href="/projects"
            className="ruwaq-pro-btn-outline hidden shrink-0 px-5 py-2 sm:inline-flex"
          >
            {copy.viewAll}
          </Link>
        </header>

        {/* Flagship spotlight — PF-style hero card */}
        <Link href={`/projects/${flagship.slug}`} className="ruwaq-offplan-flagship group">
          <div className="ruwaq-offplan-flagship-media">
            <Image
              src={flagship.images.main}
              alt={flagshipTitle}
              fill
              priority={isHomepage}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="ruwaq-offplan-flagship-overlay">
              <span className="ruwaq-offplan-badge">{badgeLabel}</span>
              {flagship.heroVideo ? (
                <span className="ruwaq-offplan-flagship-play">▶ {copy.watchFilm}</span>
              ) : null}
            </div>
          </div>
          <div className="ruwaq-offplan-flagship-body">
            <p className="ruwaq-offplan-flagship-label">{copy.spotlightLabel}</p>
            <h3 className="ruwaq-offplan-flagship-title">{flagshipTitle}</h3>
            <p className="ruwaq-offplan-flagship-location">{flagshipLocation}</p>
            <p className="ruwaq-offplan-flagship-price">
              {copy.startingFrom} {flagshipPrice}
            </p>
            <span className="ruwaq-pro-btn-solid ruwaq-offplan-flagship-cta">{copy.exploreFlagship}</span>
          </div>
        </Link>

        {!isHomepage ? null : (
          <div className="ruwaq-offplan-home-grid mt-8">
            {others.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="ruwaq-offplan-mini-card group">
                <div className="ruwaq-offplan-mini-card-media">
                  <Image
                    src={project.images.main}
                    alt={projectTitle(project, locale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="400px"
                  />
                </div>
                <div className="ruwaq-offplan-mini-card-body">
                  <h4 className="ruwaq-offplan-mini-card-title">{projectTitle(project, locale)}</h4>
                  <p className="ruwaq-offplan-mini-card-meta">{projectLocation(project, locale)}</p>
                  <p className="ruwaq-offplan-mini-card-price">
                    {copy.startingFrom} {formatOffPlanPrice(project.startingPrice, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <p className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
