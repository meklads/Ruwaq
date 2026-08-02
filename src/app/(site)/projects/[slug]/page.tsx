import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getOffPlanProject, OFF_PLAN_PROJECTS, projectTitle } from "@/content/off-plan-projects";
import { ProjectHeroMedia } from "@/modules/marketplace/components/off-plan/project-hero-media";
import { ProjectQuickBar } from "@/modules/marketplace/components/off-plan/project-quick-bar";
import { ProjectSpecsGrid } from "@/modules/marketplace/components/off-plan/project-specs-grid";
import { ProjectLeadSidebar } from "@/modules/marketplace/components/off-plan/project-lead-sidebar";
import { ProjectPlansTabs } from "@/modules/marketplace/components/off-plan/project-plans-tabs";
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
    <article className="ruwaq-ad-page ruwaq-offplan-landing">
      <div className="ruwaq-ad-content">
        <nav className="mb-4 text-sm text-neutral-500">
          <Link href="/projects" className="hover:text-neutral-900">
            {copy.allProjects}
          </Link>
        </nav>

        <ProjectHeroMedia
          project={project}
          locale={locale}
          copy={{
            underConstruction: copy.badgeUnderConstruction,
            delivery: copy.deliveryLabel,
            watchFilm: copy.watchFilm,
            downloadBrochure: copy.downloadBrochure,
            masterPlan: copy.masterPlan,
            interior: copy.interior,
            closeModal: t.nav.closeModal,
            leadForm: copy.leadForm,
          }}
        />

        <ProjectQuickBar
          project={project}
          locale={locale}
          copy={{
            startingFrom: copy.startingFrom,
            priceDisclaimer: copy.priceDisclaimer,
            developer: copy.developer,
            viewDeveloperProjects: copy.viewDeveloperProjects,
          }}
        />

        <div className="ruwaq-offplan-detail-grid">
          <div className="ruwaq-offplan-detail-main">
            <ProjectSpecsGrid
              project={project}
              locale={locale}
              copy={{
                delivery: copy.deliveryLabel,
                location: copy.locationLabel,
                paymentPlan: copy.paymentPlanLabel,
                propertyTypes: copy.propertyTypesLabel,
                ownership: copy.ownershipLabel,
              }}
            />
            <ProjectPlansTabs
              project={project}
              locale={locale}
              copy={{
                tabFloorPlans: copy.tabFloorPlans,
                tabPayment: copy.tabPayment,
                view2d: copy.view2d,
                view3d: copy.view3d,
                paymentIntro: copy.paymentIntro,
                installment: copy.installment,
              }}
            />
          </div>
          <ProjectLeadSidebar
            project={project}
            locale={locale}
            copy={{
              sidebarTitle: copy.sidebarTitle,
              sidebarSubtitle: copy.sidebarSubtitle,
              downloadBrochure: copy.downloadBrochure,
              closeModal: t.nav.closeModal,
              leadForm: copy.leadForm,
            }}
          />
        </div>

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
