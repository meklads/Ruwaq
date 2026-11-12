import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { Tx } from "@/modules/site/content/components";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getTerms } from "@/modules/site/knowledge/loader";
import { TERM_CATEGORIES } from "@/modules/site/knowledge/schema";
import { DraftBadge, KnowledgeSoon } from "@/modules/site/knowledge/components";

export async function generateMetadata(): Promise<Metadata> {
  const g = getKnowledgeCopy(await getLocale()).glossary;
  return { title: g.title, description: g.lead };
}

export default async function GlossaryPage() {
  const locale = await getLocale();
  const g = getKnowledgeCopy(locale).glossary;
  const terms = getTerms();
  if (terms.length === 0) return <KnowledgeSoon title={g.title} body={g.soon} locale={locale} />;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <h1 className="rw-display">{g.title}</h1>
          <p className="rw-lead">{g.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          {TERM_CATEGORIES.map((cat) => {
            const list = terms.filter((t) => t.category === cat);
            if (list.length === 0) return null;
            return (
              <div key={cat} className="rwc-section">
                <h2>{g.categories[cat]}</h2>
                <div className="rwc-grid rwc-grid--3">
                  {list.map((t) => (
                    <Link key={t.slug} href={`/glossary/${t.slug}`} className="rwc-card">
                      {t.draft && <div className="rwc-tags"><DraftBadge locale={locale} /></div>}
                      <h3 className="rwc-card__title"><Tx l={t.term} locale={locale} /></h3>
                      <p className="rwc-card__body"><Tx l={t.definition} locale={locale} /></p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
