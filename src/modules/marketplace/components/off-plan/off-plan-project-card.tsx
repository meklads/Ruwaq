import Image from "next/image";
import Link from "next/link";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  formatOffPlanPrice,
  projectLocation,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { BrochureLeadTrigger } from "@/modules/marketplace/components/off-plan/brochure-lead-modal";

type Copy = {
  badgeExclusive: string;
  badgeUnderConstruction: string;
  startingFrom: string;
  explore: string;
  downloadBrochure: string;
  closeModal: string;
  leadForm: {
    title: string;
    subtitle: string;
    fullName: string;
    whatsApp: string;
    email: string;
    role: string;
    roleEndBuyer: string;
    roleInvestor: string;
    roleBroker: string;
    submit: string;
    submitting: string;
    success: string;
    validation: string;
    invalidPhone: string;
  };
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function OffPlanProjectCard({ project, locale, copy }: Props) {
  const title = projectTitle(project, locale);
  const location = projectLocation(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);
  const badgeLabel =
    project.badge === "exclusive_3d" ? copy.badgeExclusive : copy.badgeUnderConstruction;

  return (
    <article className="group ruwaq-pro-card ruwaq-offplan-card">
      <div className="ruwaq-pro-card-image">
        <Link href={`/tours/${project.slug}`} className="block h-full w-full">
          <Image
            src={project.images.main}
            alt={title}
            width={1200}
            height={675}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="ruwaq-pro-card-badges-overlay">
          <span className="ruwaq-offplan-badge">{badgeLabel}</span>
        </div>
      </div>
      <div className="ruwaq-pro-card-body">
        <p className="ruwaq-pro-card-meta">{location}</p>
        <h3 className="ruwaq-pro-card-title">
          <Link href={`/tours/${project.slug}`}>{title}</Link>
        </h3>
        <p className="ruwaq-offplan-price">
          {copy.startingFrom} {price}
        </p>
        <div className="ruwaq-pro-card-actions ruwaq-offplan-card-actions">
          <Link href={`/tours/${project.slug}`} className="ruwaq-pro-btn-solid">
            {copy.explore}
          </Link>
          <BrochureLeadTrigger
            project={project}
            locale={locale}
            copy={copy.leadForm}
            closeLabel={copy.closeModal}
            triggerLabel={copy.downloadBrochure}
            triggerClassName="ruwaq-pro-btn-outline px-4 py-2 text-sm"
          />
        </div>
      </div>
    </article>
  );
}
