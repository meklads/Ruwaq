import Image from "next/image";
import Link from "next/link";
import type { ShowcaseProject } from "@/content/showcase-projects";
import { projectTitle } from "@/content/off-plan-projects";
import { getCityBySlug } from "@/shared/constants/marketplace-taxonomy";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  project: ShowcaseProject;
  locale: Locale;
};

export function ShowcaseProjectRailCard({ project, locale }: Props) {
  const title = projectTitle(project, locale);
  const city = getCityBySlug(project.citySlug);
  const cityName = city ? (locale === "ar" ? city.nameAr : city.nameEn) : "";

  return (
    <Link href={`/tours/${project.slug}`} className="ruwaq-showcase-rail-card group">
      <div className="ruwaq-showcase-rail-card__media">
        <Image
          src={project.images.main}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 68vw, (max-width: 1024px) 28vw, 18vw"
        />
      </div>
      <div className="ruwaq-showcase-rail-card__body">
        <h3 className="ruwaq-showcase-rail-card__title">{title}</h3>
        {cityName ? <p className="ruwaq-showcase-rail-card__city">{cityName}</p> : null}
      </div>
    </Link>
  );
}
