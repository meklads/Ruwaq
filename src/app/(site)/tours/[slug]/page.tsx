import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getOffPlanProject, OFF_PLAN_PROJECTS, projectTitle } from "@/content/off-plan-projects";
import { getProjectTour, PROJECT_TOURS } from "@/content/project-tours";
import { getCityBySlug } from "@/shared/constants/marketplace-taxonomy";
import { getListingBySlug } from "@/modules/marketplace/server/listings.service";
import { ProjectPfShowcase } from "@/modules/marketplace/components/off-plan/project-pf-showcase";
import { ProjectCoBrandFooter } from "@/modules/marketplace/components/off-plan/project-co-brand-footer";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const offPlanSlugs = OFF_PLAN_PROJECTS.map((p) => ({ slug: p.slug }));
  const tourSlugs = PROJECT_TOURS.map((t) => ({ slug: t.slug }));
  return [...offPlanSlugs, ...tourSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const offPlan = getOffPlanProject(params.slug);
  if (offPlan) {
    const locale = await getLocale();
    const title = projectTitle(offPlan, locale);
    const t = getMessages(locale);
    return {
      title: `${title} | ${t.marketplace.offPlan.metaTitle}`,
      description: locale === "ar" ? offPlan.locationAr : offPlan.locationEn,
    };
  }

  const tour = getProjectTour(params.slug);
  if (!tour) return {};
  const locale = await getLocale();
  const title = locale === "ar" ? tour.titleAr : tour.titleEn;
  const description = locale === "ar" ? tour.subtitleAr : tour.subtitleEn;
  return { title, description };
}

export default async function ToursDetailPage({ params }: Props) {
  const offPlan = getOffPlanProject(params.slug);
  if (offPlan) {
    const locale = await getLocale();
    const t = getMessages(locale);
    const copy = t.marketplace.offPlan;

    return (
      <article className="ruwaq-ad-page ruwaq-pf-landing">
        <div className="ruwaq-ad-content ruwaq-pf-landing-inner">
          <nav className="ruwaq-pf-breadcrumb">
            <Link href="/tours">{copy.toursHubLabel}</Link>
            <span aria-hidden>/</span>
            <span>{projectTitle(offPlan, locale)}</span>
          </nav>

          <ProjectPfShowcase
            project={offPlan}
            locale={locale}
            copy={{
              offPlan: copy.offPlanLabel,
              startingFrom: copy.startingFrom,
              launchPrice: copy.launchPriceLabel,
              priceDisclaimer: copy.priceDisclaimer,
              delivery: copy.deliveryLabel,
              developer: copy.developer,
              gallery: copy.galleryTab,
              video: copy.videoTab,
              watchFilm: copy.watchFilm,
              photos: copy.photosLabel,
              viewAllPhotos: copy.viewAllPhotos,
              masterPlan: copy.masterPlan,
              interior: copy.interior,
              closeModal: t.nav.closeModal,
              badgeUnderConstruction: copy.badgeUnderConstruction,
              badgeExclusive: copy.badgeExclusive,
              keyInformation: copy.keyInformationLabel,
              deliveryDate: copy.deliveryDateLabel,
              locationLabel: copy.locationLabel,
              propertyTypesLabel: copy.propertyTypesLabel,
              ownershipLabel: copy.ownershipLabel,
              aboutProject: copy.aboutProjectLabel,
              downloadBrochure: copy.downloadBrochure,
            }}
          />

          <ProjectCoBrandFooter
            locale={locale}
            copy={{ line: copy.coBrandLine, disclaimer: copy.coBrandDisclaimer }}
          />
        </div>
      </article>
    );
  }

  const tour = getProjectTour(params.slug);
  if (!tour) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.projectTours;

  const title = locale === "ar" ? tour.titleAr : tour.titleEn;
  const subtitle = locale === "ar" ? tour.subtitleAr : tour.subtitleEn;
  const story = locale === "ar" ? tour.storyAr : tour.storyEn;
  const city = getCityBySlug(tour.citySlug);
  const cityName = city ? (locale === "ar" ? city.nameAr : city.nameEn) : "";

  const credits = await Promise.all(
    tour.credits.map(async (credit) => {
      const listing = await getListingBySlug(credit.listingSlug);
      const name = listing
        ? locale === "ar"
          ? listing.titleAr
          : listing.titleEn ?? listing.titleAr
        : credit.listingSlug;
      return { ...credit, name, href: listing ? `/listing/${listing.slug}` : null };
    })
  );

  return (
    <article className="ruwaq-ad-page">
      <header className="relative min-h-[420px] border-b border-neutral-200 md:min-h-[520px]">
        <Image src={tour.heroImage} alt={title} fill priority className="object-cover" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[420px] max-w-4xl flex-col justify-end px-4 py-16 sm:px-6 md:min-h-[520px]">
          <p className="ruwaq-pro-eyebrow-badge">{copy.eyebrow}</p>
          {cityName ? (
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/80">
              {locale === "en" ? cityName.toUpperCase() : cityName}
            </p>
          ) : null}
          <h1 className="ruwaq-pro-display mt-3 text-3xl md:text-5xl">{title}</h1>
          <p className="ruwaq-pro-subtitle mt-4">{subtitle}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-5 text-sm leading-relaxed text-neutral-700 md:text-base">
          {story.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {tour.gallery.length > 0 ? (
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {tour.gallery.map((src) => (
              <div key={src} className="relative aspect-video overflow-hidden bg-neutral-100">
                <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        ) : null}

        <section className="mt-14 border-t border-neutral-200 pt-10">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.creditsTitle}</h2>
          <ul className="mt-6 space-y-4">
            {credits.map((credit) => (
              <li
                key={credit.listingSlug}
                className="flex flex-col gap-1 border border-neutral-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="ruwaq-ad-eyebrow">{locale === "ar" ? credit.roleAr : credit.roleEn}</p>
                  <p className="mt-1 font-medium text-neutral-950">{credit.name}</p>
                </div>
                {credit.href ? (
                  <Link href={credit.href} className="ruwaq-pro-btn-outline px-5 py-2 text-xs">
                    {copy.viewProfile}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href={`/${tour.citySlug}/${tour.categorySlug}`} className="ruwaq-pro-btn-solid px-6 py-3">
            {copy.browseCategory}
          </Link>
          <Link href="/tours" className="ruwaq-pro-btn-outline px-6 py-3">
            {copy.allTours}
          </Link>
        </div>
      </div>
    </article>
  );
}
