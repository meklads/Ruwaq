import Image from "next/image";
import Link from "next/link";
import type { TodaysStory } from "@/content/todays-stories";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  story: TodaysStory;
  locale: Locale;
  variant?: "featured" | "compact";
};

export function TodaysStoryCard({ story, locale, variant = "compact" }: Props) {
  const title = locale === "ar" ? story.titleAr : story.titleEn;
  const excerpt = locale === "ar" ? story.excerptAr : story.excerptEn;
  const category = locale === "ar" ? story.categoryAr : story.categoryEn;

  if (variant === "featured") {
    return (
      <Link href={story.href} className="ruwaq-story-card ruwaq-story-card--featured group">
        <div className="ruwaq-story-card__media ruwaq-story-card__media--featured">
          <Image
            src={story.image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="ruwaq-story-card__overlay" aria-hidden />
          <div className="ruwaq-story-card__body ruwaq-story-card__body--overlay">
            <p className="ruwaq-story-card__category">{category}</p>
            <h3 className="ruwaq-story-card__title ruwaq-story-card__title--featured">{title}</h3>
            <p className="ruwaq-story-card__excerpt">{excerpt}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={story.href} className="ruwaq-story-card ruwaq-story-card--compact group">
      <div className="ruwaq-story-card__media">
        <Image
          src={story.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 50vw, 22vw"
        />
      </div>
      <div className="ruwaq-story-card__body">
        <p className="ruwaq-story-card__category">{category}</p>
        <h3 className="ruwaq-story-card__title">{title}</h3>
      </div>
    </Link>
  );
}
