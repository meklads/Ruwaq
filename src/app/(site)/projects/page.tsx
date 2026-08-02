import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { OFF_PLAN_PROJECTS } from "@/content/off-plan-projects";
import { OffPlanProjectsListing } from "@/modules/marketplace/components/off-plan/off-plan-projects-listing";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.marketplace.offPlan.metaTitle,
    description: t.marketplace.offPlan.metaDescription,
  };
}

export default async function OffPlanProjectsPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.offPlan;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content ruwaq-ad-section">
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">
            {copy.backHome}
          </Link>
        </nav>
        <header className="ruwaq-ad-section-header mb-10">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
            <h1 className="ruwaq-ad-section-title">{copy.indexTitle}</h1>
            <p className="ruwaq-ad-section-lead">{copy.indexSubtitle}</p>
          </div>
        </header>

        <OffPlanProjectsListing
          projects={OFF_PLAN_PROJECTS}
          locale={locale}
          copy={{
            filters: copy.filters,
            badgeExclusive: copy.badgeExclusive,
            badgeUnderConstruction: copy.badgeUnderConstruction,
            startingFrom: copy.startingFrom,
            explore: copy.explore,
            downloadBrochure: copy.downloadBrochure,
            closeModal: t.nav.closeModal,
            leadForm: copy.leadForm,
          }}
        />
      </div>
    </div>
  );
}
