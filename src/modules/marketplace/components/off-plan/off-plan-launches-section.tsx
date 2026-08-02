import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getFeaturedOffPlanProjects } from "@/content/off-plan-projects";
import { OffPlanProjectCard } from "@/modules/marketplace/components/off-plan/off-plan-project-card";

export async function OffPlanLaunchesSection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.offPlan;
  const projects = getFeaturedOffPlanProjects();

  return (
    <section
      className="ruwaq-ad-band-stone ruwaq-ad-section border-t border-neutral-200"
      id="off-plan-launches"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
            <h2 className="ruwaq-ad-section-title">{copy.title}</h2>
            <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
          </div>
          <Link href="/projects" className="ruwaq-pro-btn-outline hidden px-5 py-2 sm:inline-flex">
            {copy.viewAll}
          </Link>
        </header>

        <div className="ruwaq-offplan-home-grid mt-10">
          {projects.map((project) => (
            <OffPlanProjectCard
              key={project.id}
              project={project}
              locale={locale}
              copy={{
                badgeExclusive: copy.badgeExclusive,
                badgeUnderConstruction: copy.badgeUnderConstruction,
                startingFrom: copy.startingFrom,
                explore: copy.explore,
                downloadBrochure: copy.downloadBrochure,
                closeModal: t.nav.closeModal,
                leadForm: copy.leadForm,
              }}
            />
          ))}
        </div>

        <p className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.viewAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
