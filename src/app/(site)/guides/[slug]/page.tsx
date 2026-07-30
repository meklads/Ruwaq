import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getGuide, RUWQ_GUIDES } from "@/content/guides";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return RUWQ_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const locale = await getLocale();
  return {
    title: locale === "ar" ? guide.titleAr : guide.titleEn,
    description: locale === "ar" ? guide.excerptAr : guide.excerptEn,
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.guides;

  const title = locale === "ar" ? guide.titleAr : guide.titleEn;
  const excerpt = locale === "ar" ? guide.excerptAr : guide.excerptEn;
  const body = locale === "ar" ? guide.bodyAr : guide.bodyEn;
  const ctaLabel = locale === "ar" ? guide.ctaLabelAr : guide.ctaLabelEn;
  const ctaHref = guide.citySlug
    ? `/${guide.citySlug}/${guide.categorySlug}`
    : `/jeddah/${guide.categorySlug}`;

  return (
    <article className="ruwaq-ad-page">
      <header className="ruwaq-ad-section border-b border-neutral-200">
        <div className="mx-auto max-w-3xl">
          <p className="ruwaq-ad-eyebrow">
            {copy.eyebrow} · {guide.readMinutes} {copy.minRead}
          </p>
          <h1 className="ruwaq-ad-section-title">{title}</h1>
          <p className="ruwaq-ad-section-lead">{excerpt}</p>
        </div>
      </header>

      <div className="relative mx-auto mt-10 aspect-[21/9] max-w-4xl overflow-hidden bg-neutral-100">
        <Image src={guide.heroImage} alt={title} fill className="object-cover" priority sizes="896px" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="ruwaq-guide-body space-y-5">
          {body.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>

        <div className="ruwaq-guide-cta mt-14 border border-neutral-950 bg-neutral-950 p-8 text-center text-white">
          <p className="text-sm text-white/80">{copy.ctaLead}</p>
          <Link href={ctaHref} className="ruwaq-pro-btn-solid mt-6 inline-flex bg-white px-8 py-3 text-neutral-950 hover:bg-neutral-100">
            {ctaLabel}
          </Link>
        </div>

        <p className="mt-10 text-center">
          <Link href="/guides" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.allGuides}
          </Link>
        </p>
      </div>
    </article>
  );
}
