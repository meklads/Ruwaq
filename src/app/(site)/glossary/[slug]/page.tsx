import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { SourcesList, Tx, fmtDate } from "@/modules/site/content/components";
import { pickText } from "@/modules/site/content/localize";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getTerm } from "@/modules/site/knowledge/loader";
import { DraftBadge, GroupBox } from "@/modules/site/knowledge/components";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTerm(params.slug);
  if (!t) return {};
  return {
    title: pickText(t.term, locale)?.text,
    description: pickText(t.definition, locale)?.text,
    robots: t.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function TermPage({ params }: Props) {
  const locale = await getLocale();
  const t = getTerm(params.slug);
  if (!t) notFound();
  const g = getKnowledgeCopy(locale).glossary;
  const related = t.related.map((s) => getTerm(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const name = pickText(t.term, locale)?.text ?? t.slug;

  return (
    <div className="rw">
      {!t.draft && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name,
            alternateName: t.aliases,
            description: pickText(t.definition, locale)?.text,
            url: `${RUWQ_PUBLIC_URL}/glossary/${t.slug}`,
            inDefinedTermSet: { "@type": "DefinedTermSet", name: g.title, url: `${RUWQ_PUBLIC_URL}/glossary` },
          }}
        />
      )}
      <article className="rw-section">
        <div className="rw-wrap rw-narrow">
          <Link href="/glossary" className="rw-link">{g.back}</Link>
          <div className="rwc-tags" style={{ marginBlockStart: "1.25rem" }}>
            <span className="rwc-tag rwc-tag--lang">{g.categories[t.category]}</span>
            {t.draft && <DraftBadge locale={locale} />}
          </div>
          <h1 className="rw-display" style={{ marginBlockStart: "0.9rem" }}>{name}</h1>
          {t.aliases.length > 0 && <p className="rw-fineprint">{g.aliases}: {t.aliases.join("، ")}</p>}

          <section className="rwc-section"><h2>{g.definition}</h2><p className="rw-body"><Tx l={t.definition} locale={locale} /></p></section>
          <section className="rwc-section"><h2>{g.example}</h2><p className="rw-body"><Tx l={t.example} locale={locale} /></p></section>

          {related.length > 0 && (
            <section className="rwc-section">
              <h2>{g.related}</h2>
              <div className="rwc-chips">
                {related.map((r) => <Link key={r.slug} className="rwc-chip" href={`/glossary/${r.slug}`}><Tx l={r.term} locale={locale} /></Link>)}
              </div>
            </section>
          )}

          <section className="rwc-section">
            <h2>{g.sources}</h2>
            {t.sources.length > 0 ? <SourcesList sources={t.sources} locale={locale} /> : <p className="rw-fineprint">{g.noSources}</p>}
            <p className="rw-fineprint" style={{ marginBlockStart: "0.5rem" }}>{g.reviewed}: {fmtDate(t.reviewedAt, locale, "—")}</p>
          </section>

          {t.next && <GroupBox target={t.next} section="glossary" page={t.slug} locale={locale} />}
        </div>
      </article>
    </div>
  );
}
