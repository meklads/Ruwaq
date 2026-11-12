import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { Tx } from "@/modules/site/content/components";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getStyles } from "@/modules/site/knowledge/loader";
import { DraftBadge, KnowledgeSoon } from "@/modules/site/knowledge/components";

export async function generateMetadata(): Promise<Metadata> {
  const a = getKnowledgeCopy(await getLocale()).atlas;
  return { title: a.title, description: a.lead };
}

export default async function AtlasPage() {
  const locale = await getLocale();
  const a = getKnowledgeCopy(locale).atlas;
  const styles = getStyles();
  if (styles.length === 0) return <KnowledgeSoon title={a.title} body={a.soon} locale={locale} />;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <h1 className="rw-display">{a.title}</h1>
          <p className="rw-lead">{a.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rwc-grid rwc-grid--3">
            {styles.map((s) => (
              <Link key={s.slug} href={`/atlas/${s.slug}`} className="rwc-card">
                {s.draft && <div className="rwc-tags"><DraftBadge locale={locale} /></div>}
                <h3 className="rwc-card__title"><Tx l={s.name} locale={locale} /></h3>
                <p className="rwc-card__body"><Tx l={s.summary} locale={locale} /></p>
                <span className="rwc-card__meta"><Tx l={s.region} locale={locale} /></span>
              </Link>
            ))}
          </div>

          <div className="rwc-section">
            <h2>{a.mapTitle}</h2>
            <p className="rw-body">{a.mapNote}</p>
            <ol className="rwk-map">
              {a.mapStyles.map((n) => <li key={n}>{n}</li>)}
            </ol>
            <p className="rw-fineprint">
              <a className="rw-link" href={a.mapSourceUrl} target="_blank" rel="noopener noreferrer nofollow">{a.mapSource}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
