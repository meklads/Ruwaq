import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { getContentCopy } from "@/modules/site/content/copy";
import { getUpdate } from "@/modules/site/content/loader";
import { pickText } from "@/modules/site/content/localize";
import { FallbackNotice, PreviewNotice, SourcesList, Tags, Tx, fmtDate } from "@/modules/site/content/components";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const item = getUpdate(params.slug);
  if (!item) return {};
  return {
    title: pickText(item.title, locale)?.text,
    description: pickText(item.summary, locale)?.text,
    robots: item.preview || item.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function UpdatePage({ params }: Props) {
  const locale = await getLocale();
  const item = getUpdate(params.slug);
  if (!item) notFound();
  const c = getContentCopy(locale);
  const u = c.update;
  const d = (v: string) => fmtDate(v, locale, c.unknown);

  return (
    <div className="rw">
      <article className="rw-section">
        <div className="rw-wrap rw-narrow">
          <Link href="/updates" className="rw-link">{c.back.updates}</Link>
          <div style={{ marginBlockStart: "1.25rem" }}>
            <Tags kind="update" preview={item.preview} draft={item.draft} archival={item.archival} only={null} locale={locale} />
          </div>
          <h1 className="rw-display" style={{ marginBlockStart: "0.9rem" }}><Tx l={item.title} locale={locale} /></h1>
          <p className="rw-lead" style={{ marginBlockStart: "1rem" }}><Tx l={item.summary} locale={locale} /></p>
          <div style={{ display: "grid", gap: "0.75rem", marginBlockStart: "1.25rem" }}>
            {item.preview && <PreviewNotice locale={locale} />}
            {item.draft && <PreviewNotice locale={locale} draft />}
            {item.archival && <p className="rwc-notice">{c.archivalNote}</p>}
            <FallbackNotice title={item.title} locale={locale} />
          </div>

          <dl className="rwc-dates">
            <div><dt>{u.published}</dt><dd>{d(item.publishedAt)}</dd></div>
            <div><dt>{u.eventDate}</dt><dd>{d(item.eventDate)}</dd></div>
            <div><dt>{u.reviewed}</dt><dd>{d(item.reviewedAt)}</dd></div>
          </dl>
          <p className="rw-fineprint" style={{ marginBlockStart: "0.75rem" }}>{u.dateNote}</p>

          {item.project && (
            <section className="rwc-section">
              <h2>{u.project}</h2>
              <p className="rw-body">
                <Tx l={item.project.name} locale={locale} />
                {item.project.location && <> — {u.location}: <Tx l={item.project.location} locale={locale} /></>}
              </p>
            </section>
          )}
          <section className="rwc-section">
            <h2>{u.what}</h2>
            <p className="rw-body"><Tx l={item.what} locale={locale} /></p>
          </section>
          {item.entities.length > 0 && (
            <section className="rwc-section">
              <h2>{u.entities}</h2>
              <ul className="rwc-list">
                {item.entities.map((e, i) => (
                  <li key={i}><Tx l={e.name} locale={locale} /> — {u.role}: <Tx l={e.roleAsStated} locale={locale} /></li>
                ))}
              </ul>
            </section>
          )}
          <section className="rwc-section">
            <h2>{c.sources.title}</h2>
            <SourcesList sources={item.sources} locale={locale} />
          </section>
          <section className="rwc-section">
            <h2>{u.unclear}</h2>
            <ul className="rwc-list">{item.unclear.map((x, i) => <li key={i}><Tx l={x} locale={locale} /></li>)}</ul>
          </section>
          {item.analysis && (
            <section className="rwc-section">
              <div className="rwc-analysis">
                <p className="rwc-analysis__note">{u.analysisNote}</p>
                <h2 className="rw-h3" style={{ marginBlockEnd: "0.4rem" }}>{u.analysis}</h2>
                <p className="rw-body"><Tx l={item.analysis} locale={locale} /></p>
              </div>
            </section>
          )}
        </div>
      </article>
      {!item.preview && !item.draft && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: pickText(item.title, locale)?.text,
            datePublished: item.publishedAt,
            dateModified: item.reviewedAt,
            url: `${RUWQ_PUBLIC_URL}/updates/${item.slug}`,
          }}
        />
      )}
    </div>
  );
}
