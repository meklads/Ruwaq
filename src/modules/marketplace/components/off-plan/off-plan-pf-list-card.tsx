import Image from "next/image";
import Link from "next/link";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  formatOffPlanPrice,
  projectLocation,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  offPlanLabel: string;
  startingFrom: string;
  launchPrice: string;
  explore: string;
  deliveryLabel: string;
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function OffPlanPfListCard({ project, locale, copy }: Props) {
  const title = projectTitle(project, locale);
  const location = projectLocation(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);
  const types = locale === "ar" ? project.propertyTypesAr.join(" · ") : project.propertyTypesEn.join(" · ");

  return (
    <Link href={`/tours/${project.slug}`} className="ruwaq-pf-list-card group">
      <div className="ruwaq-pf-list-card__media">
        <Image
          src={project.images.main}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="ruwaq-pf-list-card__badge">{copy.offPlanLabel}</span>
        {project.deliveryQuarter ? (
          <span className="ruwaq-pf-list-card__delivery">
            {copy.deliveryLabel}: {project.deliveryQuarter}
          </span>
        ) : null}
      </div>
      <div className="ruwaq-pf-list-card__body">
        <h3 className="ruwaq-pf-list-card__title">{title}</h3>
        <p className="ruwaq-pf-list-card__location">{location}</p>
        {types ? <p className="ruwaq-pf-list-card__types">{types}</p> : null}
        <p className="ruwaq-pf-list-card__price">
          <span className="ruwaq-pf-list-card__price-label">{copy.launchPrice}</span>
          <strong>{price}</strong>
        </p>
        <span className="ruwaq-pf-list-card__cta">{copy.explore}</span>
      </div>
    </Link>
  );
}
