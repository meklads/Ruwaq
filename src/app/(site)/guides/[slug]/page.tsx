import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getGuide, RUWQ_GUIDES } from "@/content/guides";
import { GuideArticleBody } from "@/modules/marketplace/components/guide-article-body";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

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

  const c = getTrustCopy(locale).guides;
  const num = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <article className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <div className="rw-article" style={{ marginInline: 0 }}>
            <span className="rw-eyebrow">
              <Link href="/guides">{c.eyebrow}</Link> — {num(guide.readMinutes)} {c.minRead}
            </span>
            <h1 className="rw-display">{title}</h1>
            <p className="rw-lead">{excerpt}</p>
          </div>
        </div>
      </section>

      <section className="rw-section" style={{ paddingBlockStart: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="rw-wrap">
          <Image src={guide.heroImage} alt={title} width={1600} height={686} priority sizes="(max-width: 1280px) 100vw, 1200px" className="rw-hero-img" />
          <div className="rw-article" style={{ marginBlockStart: "clamp(2.5rem, 5vw, 4rem)" }}>
            <GuideArticleBody blocks={blocks} copy={copy} />
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-article" style={{ paddingBlockStart: "2rem", borderBlockStart: "1px solid var(--rw-line)" }}>
            <Link href="/guides" className="rw-link">
              {c.all}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
