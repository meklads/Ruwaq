import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getShowcaseProject, getAllShowcaseProjects } from "@/content/showcase-projects";
import { projectTitle } from "@/content/off-plan-projects";
import { getProjectTour } from "@/content/project-tours";
import { getListingBySlug } from "@/modules/marketplace/server/listings.service";
import { ProjectPfShowcase } from "@/modules/marketplace/components/off-plan/project-pf-showcase";
import { ProjectCoBrandFooter } from "@/modules/marketplace/components/off-plan/project-co-brand-footer";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllShowcaseProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getShowcaseProject(params.slug);
  if (!project) return {};
  const locale = await getLocale();
  const title = projectTitle(project, locale);
  const t = getMessages(locale);
  return {
    title: `${title} | ${t.marketplace.projectTours.metaTitle}`,
    description: locale === "ar" ? project.locationAr : project.locationEn,
  };
}

export default async function ProjectTourDetailPage({ params }: Props) {
  const project = getShowcaseProject(params.slug);
  if (!project) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const toursCopy = t.marketplace.projectTours;
  const offPlanCopy = t.marketplace.offPlan;
  const isLaunch = project.showcaseKind === "launch";

  const tour = !isLaunch ? getProjectTour(params.slug) : null;
  const credits =
    tour &&
    (await Promise.all(
      tour.credits.map(async (credit) => {
        const listing = await getListingBySlug(credit.listingSlug);
        const name = listing
          ? locale === "ar"
            ? listing.titleAr
            : listing.titleEn ?? listing.titleAr
          : credit.listingSlug;
        return { ...credit, name, href: listing ? `/listing/${listing.slug}` : null };
      })
    ));

  return (
    <article className="ruwaq-ad-page ruwaq-pf-landing">
      <div className="ruwaq-ad-content">
        <nav className="ruwaq-pf-breadcrumb">
          <Link href="/tours">{toursCopy.allTours}</Link>
          <span aria-hidden>/</span>
          <span>{projectTitle(project, locale)}</span>
        </nav>

        <ProjectPfShowcase
          project={project}
          locale={locale}
          copy={{
            completedLabel: toursCopy.completedBadge,
            offPlan: offPlanCopy.offPlanLabel,
            startingFrom: offPlanCopy.startingFrom,
            launchPrice: offPlanCopy.launchPriceLabel,
            priceDisclaimer: offPlanCopy.priceDisclaimer,
            delivery: offPlanCopy.deliveryLabel,
            paymentPlanLabel: offPlanCopy.paymentPlanLabel,
            developer: isLaunch
              ? offPlanCopy.developer
              : locale === "ar"
                ? "فريق التنفيذ"
                : "Delivery team",
            tabFloorPlans: offPlanCopy.tabFloorPlans,
            tabPayment: offPlanCopy.tabPayment,
            view2d: offPlanCopy.view2d,
            view3d: offPlanCopy.view3d,
            paymentIntro: offPlanCopy.paymentIntro,
            installment: offPlanCopy.installment,
            gallery: offPlanCopy.galleryTab,
            video: offPlanCopy.videoTab,
            videoButton: offPlanCopy.videoButton,
            watchFilm: offPlanCopy.watchFilm,
            photos: offPlanCopy.photosLabel,
            viewAllPhotos: offPlanCopy.viewAllPhotos,
            masterPlan: offPlanCopy.masterPlan,
            sitePlan: offPlanCopy.sitePlan,
            interior: offPlanCopy.interior,
            closeModal: t.nav.closeModal,
            badgeUnderConstruction: offPlanCopy.badgeUnderConstruction,
            badgeExclusive: offPlanCopy.badgeExclusive,
            keyInformation: offPlanCopy.keyInformationLabel,
            deliveryDate: offPlanCopy.deliveryDateLabel,
            locationLabel: offPlanCopy.locationLabel,
            propertyTypesLabel: offPlanCopy.propertyTypesLabel,
            ownershipLabel: offPlanCopy.ownershipLabel,
            unitsCountLabel: offPlanCopy.unitsCountLabel,
            aboutProject: offPlanCopy.aboutProjectLabel,
            downloadBrochure: offPlanCopy.downloadBrochure,
            viewDeveloperProjects: offPlanCopy.viewDeveloperProjects,
            viewOtherProjects: offPlanCopy.viewOtherProjects,
            contactSoon: offPlanCopy.contactSoon,
            requestQuoteCta: offPlanCopy.requestQuoteCta,
            completedCompletionLabel: offPlanCopy.completedCompletionLabel,
            completedScopeLabel: offPlanCopy.completedScopeLabel,
            completedAreaLabel: offPlanCopy.completedAreaLabel,
            requestSimilarCta: offPlanCopy.requestSimilarCta,
            livingRoomLabel: offPlanCopy.livingRoomLabel,
            kitchenLabel: offPlanCopy.kitchenLabel,
            homeTourStoryLabel: offPlanCopy.homeTourStoryLabel,
          }}
        />

        {tour && credits ? (
          <section className="ruwaq-pf-credits mt-12 border-t border-neutral-200 pt-10">
            <h2 className="ruwaq-pf-section-heading">{toursCopy.creditsTitle}</h2>
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
                      {toursCopy.viewProfile}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href={`/${tour.citySlug}/${tour.categorySlug}`} className="ruwaq-pro-btn-solid px-6 py-3">
                {toursCopy.browseCategory}
              </Link>
            </div>
          </section>
        ) : null}

        {isLaunch ? (
          <ProjectCoBrandFooter
            locale={locale}
            copy={{ line: offPlanCopy.coBrandLine, disclaimer: offPlanCopy.coBrandDisclaimer }}
          />
        ) : null}
      </div>
    </article>
  );
}
