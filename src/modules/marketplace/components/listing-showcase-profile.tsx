import Link from "next/link";
import type { ShowcaseListingProfile } from "@/content/showcase-listings";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  profile: ShowcaseListingProfile;
  copy: Messages["marketplace"]["listingDetail"];
  locale: Locale;
};

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function ListingShowcaseProfile({ profile, copy, locale }: Props) {
  const isAr = locale === "ar";

  return (
    <section className="ruwaq-listing-showcase mt-10 border border-neutral-200 bg-white p-6 sm:p-8">
      {profile.isBenchmark ? (
        <p className="ruwaq-listing-showcase__benchmark">{copy.benchmarkBadge}</p>
      ) : null}

      {profile.stats.length > 0 ? (
        <div className="ruwaq-listing-showcase__stats">
          {profile.stats.map((stat) => (
            <div key={stat.labelEn} className="ruwaq-listing-showcase__stat">
              <p className="ruwaq-listing-showcase__stat-label">
                {isAr ? stat.labelAr : stat.labelEn}
              </p>
              <p className="ruwaq-listing-showcase__stat-value">
                {isAr ? stat.valueAr : stat.valueEn}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {profile.specialties.length > 0 ? (
        <div className="mt-8">
          <h2 className="ruwaq-listing-showcase__section-title">{copy.specialtiesTitle}</h2>
          <ul className="ruwaq-listing-showcase__chips">
            {profile.specialties.map((item) => (
              <li key={item.en} className="ruwaq-listing-showcase__chip">
                {isAr ? item.ar : item.en}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {profile.highlights.length > 0 ? (
        <ul className="ruwaq-listing-showcase__highlights mt-6">
          {profile.highlights.map((item) => (
            <li key={item.en}>{isAr ? item.ar : item.en}</li>
          ))}
        </ul>
      ) : null}

      {profile.projects.length > 0 ? (
        <div className="mt-8">
          <h2 className="ruwaq-listing-showcase__section-title">{copy.projectsTitle}</h2>
          <ul className="ruwaq-listing-showcase__projects">
            {profile.projects.map((project) => {
              const title = isAr ? project.titleAr : project.titleEn;
              const meta = isAr ? project.metaAr : project.metaEn;
              const inner = (
                <>
                  <span className="ruwaq-listing-showcase__project-title">{title}</span>
                  {meta ? (
                    <span className="ruwaq-listing-showcase__project-meta">{meta}</span>
                  ) : null}
                </>
              );

              if (project.tourSlug) {
                return (
                  <li key={project.titleEn}>
                    <Link href={`/tours/${project.tourSlug}`} className="ruwaq-listing-showcase__project-link">
                      {inner}
                      <span className="ruwaq-listing-showcase__project-cta">{copy.viewTour}</span>
                    </Link>
                  </li>
                );
              }

              return <li key={project.titleEn}>{inner}</li>;
            })}
          </ul>
        </div>
      ) : null}

      {profile.crNumber ? (
        <p className="ruwaq-listing-showcase__cr mt-6 text-sm text-neutral-500">
          {copy.crLabel}: {profile.crNumber}
        </p>
      ) : null}
    </section>
  );
}

export function ListingShowcaseWebsiteLink({
  profile,
  copy,
  locale,
  className = "",
}: Props & { className?: string }) {
  const isAr = locale === "ar";
  const label = isAr ? profile.websiteLabelAr : profile.websiteLabelEn;
  const external = isExternalUrl(profile.websiteUrl);

  if (external) {
    return (
      <a
        href={profile.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`ruwaq-pro-btn-outline w-full py-2.5 text-center ${className}`.trim()}
      >
        {copy.visitWebsite} — {label}
      </a>
    );
  }

  return (
    <Link
      href={profile.websiteUrl}
      className={`ruwaq-pro-btn-outline w-full py-2.5 text-center ${className}`.trim()}
    >
      {copy.visitWebsite} — {label}
    </Link>
  );
}
