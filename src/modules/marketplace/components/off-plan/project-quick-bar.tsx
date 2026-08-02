import Image from "next/image";
import Link from "next/link";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  formatOffPlanPrice,
  projectDeveloperName,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  startingFrom: string;
  priceDisclaimer: string;
  developer: string;
  viewDeveloperProjects: string;
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectQuickBar({ project, locale, copy }: Props) {
  const title = projectTitle(project, locale);
  const developer = projectDeveloperName(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);

  return (
    <div className="ruwaq-offplan-quick-bar">
      <div className="ruwaq-offplan-quick-bar-main">
        <h1 className="ruwaq-offplan-project-title">{title}</h1>
        <p className="ruwaq-offplan-launch-price">
          {copy.startingFrom} {price}
          <span className="ruwaq-offplan-price-asterisk">*</span>
        </p>
        <p className="ruwaq-offplan-price-note">{copy.priceDisclaimer}</p>
      </div>
      <aside className="ruwaq-offplan-developer-card">
        {project.developer.logo ? (
          <Image
            src={project.developer.logo}
            alt={developer}
            width={56}
            height={56}
            className="ruwaq-offplan-developer-logo"
          />
        ) : null}
        <div>
          <p className="ruwaq-offplan-developer-label">{copy.developer}</p>
          <p className="ruwaq-offplan-developer-name">{developer}</p>
        </div>
        <Link href="/projects" className="ruwaq-pro-btn-outline px-4 py-2 text-sm">
          {copy.viewDeveloperProjects}
        </Link>
      </aside>
    </div>
  );
}
