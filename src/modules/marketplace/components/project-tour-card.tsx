import Image from "next/image";
import Link from "next/link";
import type { ProjectTour } from "@/content/project-tours";
import type { Locale } from "@/shared/i18n/locale";
import { getCityBySlug } from "@/shared/constants/marketplace-taxonomy";

type Props = {
  tour: ProjectTour;
  locale: Locale;
  readLabel: string;
};

export function ProjectTourCard({ tour, locale, readLabel }: Props) {
  const title = locale === "ar" ? tour.titleAr : tour.titleEn;
  const subtitle = locale === "ar" ? tour.subtitleAr : tour.subtitleEn;
  const city = getCityBySlug(tour.citySlug);
  const cityName = city ? (locale === "ar" ? city.nameAr : city.nameEn) : "";

  return (
    <article className="group ruwaq-pro-card">
      <div className="ruwaq-pro-card-image">
        <Link href={`/tours/${tour.slug}`} className="block h-full w-full">
          <Image
            src={tour.heroImage}
            alt={title}
            width={1200}
            height={675}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className="ruwaq-pro-card-body">
        {cityName ? (
          <p className="ruwaq-pro-card-meta">
            {locale === "en" ? cityName.toUpperCase() : cityName}
          </p>
        ) : null}
        <h3 className="ruwaq-pro-card-title">
          <Link href={`/tours/${tour.slug}`}>{title}</Link>
        </h3>
        <p className="ruwaq-pro-card-description">{subtitle}</p>
        <div className="ruwaq-pro-card-actions">
          <Link href={`/tours/${tour.slug}`} className="ruwaq-pro-btn-solid">
            {readLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
