import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getGuide, RUWQ_GUIDES } from "@/content/guides";
import { GuideArticleBody } from "@/modules/marketplace/components/guide-article-body";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return RUWQ_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const locale = await getLocale();
  const title = locale === "ar" ? guide.titleAr : guide.titleEn;
  const description = locale === "ar" ? guide.excerptAr : guide.excerptEn;
  const keywords = locale === "ar" ? guide.seoKeywordsAr : guide.seoKeywordsEn;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: guide.heroImage }],
    },
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
  const blocks = locale === "ar" ? guide.blocksAr : guide.blocksEn;

  return (
    <article className="ruwaq-ad-page ruwaq-guide-article">
      <header className="ruwaq-ad-section border-b border-neutral-200">
        <div className="ruwaq-ad-content ruwaq-guide-article__header">
          <p className="ruwaq-ad-eyebrow">
            {copy.eyebrow} · {guide.readMinutes} {copy.minRead}
          </p>
          <h1 className="ruwaq-ad-section-title">{title}</h1>
          <p className="ruwaq-ad-section-lead">{excerpt}</p>
        </div>
      </header>

      <div className="ruwaq-ad-content">
        <div className="relative mt-8 aspect-[21/9] overflow-hidden bg-neutral-100">
          <Image
            src={guide.heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
          />
        </div>
      </div>

      <div className="ruwaq-ad-content ruwaq-guide-article__body">
        <GuideArticleBody blocks={blocks} />

        <p className="ruwaq-guide-back mt-14 text-center">
          <Link href="/guides" className="ruwaq-pro-btn-outline px-6 py-2.5">
            {copy.allGuides}
          </Link>
        </p>
      </div>
    </article>
  );
}
