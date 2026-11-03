import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { getContentCopy } from "@/modules/site/content/copy";
import { getInsight } from "@/modules/site/content/loader";
import { pickText } from "@/modules/site/content/localize";
import { FallbackNotice, PreviewNotice, SourcesList, Tags, Tx, fmtDate } from "@/modules/site/content/components";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const item = getInsight(params.slug);
  if (!item) return {};
  return {
    title: pickText(item.title, locale)?.text,
    description: pickText(item.summary, locale)?.text,
    robots: item.preview || item.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function InsightPage({ params }: Props) {
  const locale = await getLocale();
  const item = getInsight(params.slug);
  if (!item) notFound();
  const c = getContentCopy(locale);
  const t = c.insight;
  const d = (v: string) => fmtDate(v, locale, c.unknown);

  return (
    <div className="rw">
      <article className="rw-section">
        <div className="rw-wrap rw-narrow">
          <Link href="/insights" className="rw-link">{c.back.insights}</Link>
          <div style={{ marginBlockStart: "1.25rem" }}>
            <Tags kind="insight" preview={item.preview} draft={item.draft} only={null} locale={locale} />
          </div>
          <h1 className="rw-display" style={{ marginBlockStart: "0.9rem" }}><Tx l={item.title} locale={locale} /></h1>
          <p className="rw-lead" style={{ marginBlockStart: "1rem" }}><Tx l={item.summary} locale={locale} /></p>
          <div style={{ display: "grid", gap: "0.75rem", marginBlockStart: "1.25rem" }}>
            {item.preview && <PreviewNotice locale={locale} />}
            {item.draft && <PreviewNotice locale={locale} draft />}
            <FallbackNotice title={item.title} locale={locale} />
          </div>

          <dl className="rwc-dates">
            <div><dt>{t.published}</dt><dd>{d(item.publishedAt)}</dd></div>
            {item.updatedAt && <div><dt>{t.updated}</dt><dd>{d(item.updatedAt)}</dd></div>}
            <div><dt>{t.reviewed}</dt><dd>{d(item.reviewedAt)}</dd></div>
            <div>
              <dt>{item.period.from === item.period.to ? t.readingDate : t.period}</dt>
              <dd>{item.period.from === item.period.to ? d(item.period.from) : `${d(item.period.from)} – ${d(item.period.to)}`}</dd>
            </div>
          </dl>

          <section className="rwc-section"><h2>{t.question}</h2><p className="rw-body"><Tx l={item.question} locale={locale} /></p></section>
          <section className="rwc-section"><h2>{t.scope}</h2><p className="rw-body"><Tx l={item.scope} locale={locale} /></p></section>
          <section className="rwc-section"><h2>{t.methodology}</h2><p className="rw-body"><Tx l={item.methodology} locale={locale} /></p></section>
          <section className="rwc-section">
            <h2>{t.findings}</h2>
            <ul className="rwc-list">{item.findings.map((f, i) => <li key={i}><Tx l={f} locale={locale} /></li>)}</ul>
          </section>
          {item.analysis.length > 0 && (
            <section className="rwc-section">
              <div className="rwc-analysis">
                <p className="rwc-analysis__note">{t.analysisNote}</p>
                <h2 className="rw-h3" style={{ marginBlockEnd: "0.4rem" }}>{t.analysis}</h2>
                <ul className="rwc-list">{item.analysis.map((a, i) => <li key={i}><Tx l={a} locale={locale} /></li>)}</ul>
              </div>
            </section>
          )}
          <section className="rwc-section"><h2>{t.limits}</h2><p className="rw-body"><Tx l={item.limits} locale={locale} /></p></section>
          <section className="rwc-section"><h2>{c.sources.title}</h2><SourcesList sources={item.sources} locale={locale} /></section>
        </div>
      </article>
      {!item.preview && !item.draft && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: pickText(item.title, locale)?.text,
            datePublished: item.publishedAt,
            dateModified: item.updatedAt ?? item.reviewedAt,
            url: `${RUWQ_PUBLIC_URL}/insights/${item.slug}`,
          }}
        />
      )}
    </div>
  );
}
