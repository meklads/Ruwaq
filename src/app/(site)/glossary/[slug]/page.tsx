import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { SourcesList, Tx, fmtDate } from "@/modules/site/content/components";
import { pickText } from "@/modules/site/content/localize";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getTerm, getTerms } from "@/modules/site/knowledge/loader";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";
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
    alternates: { canonical: `${RUWQ_PUBLIC_URL}/glossary/${params.slug}` },
  };
}

export default async function TermPage({ params }: Props) {
  const locale = await getLocale();
  const t = getTerm(params.slug);
  if (!t) notFound();
  const g = getKnowledgeCopy(locale).glossary;
  const related = t.related.map((s) => getTerm(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const name = pickText(t.term, locale)?.text ?? t.slug;
  const pc = getPagesCopy(locale).term;
  const more = getTerms().filter((x) => x.category === t.category && x.slug !== t.slug && !t.related.includes(x.slug)).slice(0, 3);

  return (
    <div className="rw rwh">
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
      <header className="rwt-head">
        <div className="rw-wrap rw-narrow">
          <nav className="rwt-crumbs" aria-label="breadcrumb">
            <Link href="/">{pc.home}</Link><span aria-hidden="true">/</span>
            <Link href="/glossary">{g.title}</Link><span aria-hidden="true">/</span>
            <span>{g.categories[t.category]}</span>
          </nav>
          <div style={{ marginBlockStart: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span className="rwt-chip">{g.categories[t.category]}</span>
            {t.draft && <DraftBadge locale={locale} />}
          </div>
          <h1>{name}</h1>
          {t.aliases.length > 0 && <p className="rwt-aliases">{g.aliases}: {t.aliases.join(locale === "ar" ? "، " : ", ")}</p>}
        </div>
      </header>

      <article className="rwh-section" style={{ paddingBlockStart: "clamp(2.5rem, 5vw, 3.5rem)" }}>
        <div className="rw-wrap rw-narrow">
          <span className="rwh-eyebrow">{g.definition}</span>
          <p className="rwt-def" style={{ marginBlockStart: "0.85rem" }}><Tx l={t.definition} locale={locale} /></p>

          <section className="rwt-example">
            <h2>{g.example}</h2>
            <p><Tx l={t.example} locale={locale} /></p>
          </section>

          {related.length > 0 && (
            <section className="rwt-block">
              <h2 className="rwh-eyebrow">{g.related}</h2>
              <div className="rwt-related" style={{ marginBlockStart: "0.85rem" }}>
                {related.map((r) => <Link key={r.slug} href={`/glossary/${r.slug}`}><Tx l={r.term} locale={locale} /></Link>)}
              </div>
            </section>
          )}

          <section className="rwt-block">
            <h2 className="rwh-eyebrow">{g.sources}</h2>
            <div style={{ marginBlockStart: "0.75rem" }}>
              {t.sources.length > 0 ? <SourcesList sources={t.sources} locale={locale} /> : <p className="rw-fineprint">{g.noSources}</p>}
            </div>
            <p className="rwt-meta">{g.reviewed}: {fmtDate(t.reviewedAt, locale, "—")}</p>
          </section>

          {t.next && <GroupBox target={t.next} section="glossary" page={t.slug} locale={locale} />}
        </div>
      </article>

      {more.length > 0 && (
        <section className="rwh-section rwh-method" style={{ paddingBlock: "clamp(3rem, 6vw, 4.5rem)" }}>
          <div className="rw-wrap">
            <span className="rwh-eyebrow">{pc.more}</span>
            <h2 className="rwh-title">{g.categories[t.category]}</h2>
            <div className="rwg-grid">
              {more.map((m) => (
                <Link key={m.slug} href={`/glossary/${m.slug}`} className="rwg-term">
                  <h3><Tx l={m.term} locale={locale} /></h3>
                  <p><Tx l={m.definition} locale={locale} /></p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
