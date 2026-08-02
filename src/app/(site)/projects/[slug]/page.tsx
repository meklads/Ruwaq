import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getOffPlanProject, OFF_PLAN_PROJECTS, projectTitle } from "@/content/off-plan-projects";
import { ProjectPfShowcase } from "@/modules/marketplace/components/off-plan/project-pf-showcase";
import { ProjectCoBrandFooter } from "@/modules/marketplace/components/off-plan/project-co-brand-footer";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return OFF_PLAN_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getOffPlanProject(params.slug);
  if (!project) return {};
  const locale = await getLocale();
  const title = projectTitle(project, locale);
  const t = getMessages(locale);
  return {
    title: `${title} | ${t.marketplace.offPlan.metaTitle}`,
    description: locale === "ar" ? project.locationAr : project.locationEn,
  };
}

export default async function OffPlanProjectPage({ params }: Props) {
  const project = getOffPlanProject(params.slug);
  if (!project) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.offPlan;

  return (
    <article className="ruwaq-ad-page ruwaq-offplan-landing ruwaq-pf-landing">
      <div className="ruwaq-ad-content ruwaq-pf-landing-inner">
        <nav className="ruwaq-pf-breadcrumb">
          <Link href="/projects">{copy.allProjects}</Link>
          <span aria-hidden>/</span>
          <span>{projectTitle(project, locale)}</span>
        </nav>

        <ProjectPfShowcase
          project={project}
          locale={locale}
          copy={{
            offPlan: copy.offPlanLabel,
            startingFrom: copy.startingFrom,
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
          }}
        />

        <ProjectCoBrandFooter
          locale={locale}
          copy={{
            line: copy.coBrandLine,
            disclaimer: copy.coBrandDisclaimer,
          }}
        />
      </div>
    </article>
  );
}
