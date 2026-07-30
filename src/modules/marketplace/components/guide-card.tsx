import Link from "next/link";
import Image from "next/image";
import type { RuwaqGuide } from "@/content/guides";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  guide: RuwaqGuide;
  locale: Locale;
  readLabel: string;
  minReadLabel: string;
};

export function GuideCard({ guide, locale, readLabel, minReadLabel }: Props) {
  const title = locale === "ar" ? guide.titleAr : guide.titleEn;
  const excerpt = locale === "ar" ? guide.excerptAr : guide.excerptEn;

  return (
    <article className="group flex flex-col border border-neutral-200 bg-white transition-colors hover:border-neutral-950">
      <Link href={`/guides/${guide.slug}`} className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={guide.heroImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="ruwaq-ad-eyebrow">
          {guide.readMinutes} {minReadLabel}
        </p>
        <h3 className="ruwaq-ad-card-title mt-2">
          <Link href={`/guides/${guide.slug}`} className="hover:text-neutral-600">
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{excerpt}</p>
        <Link
          href={`/guides/${guide.slug}`}
          className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-neutral-950 hover:underline"
        >
          {readLabel} →
        </Link>
      </div>
    </article>
  );
}
