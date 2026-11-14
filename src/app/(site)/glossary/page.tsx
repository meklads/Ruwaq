import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { Tx } from "@/modules/site/content/components";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getTerms } from "@/modules/site/knowledge/loader";
import { TERM_CATEGORIES } from "@/modules/site/knowledge/schema";
import { DraftBadge, KnowledgeSoon } from "@/modules/site/knowledge/components";
import { PageHero } from "@/modules/site/home/page-hero";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";

export async function generateMetadata(): Promise<Metadata> {
  const g = getKnowledgeCopy(await getLocale()).glossary;
  return { title: g.title, description: g.lead };
}

export default async function GlossaryPage() {
  const locale = await getLocale();
  const g = getKnowledgeCopy(locale).glossary;
  const p = getPagesCopy(locale).glossary;
  const credit = getPagesCopy(locale).credit;
  const terms = getTerms();
  if (terms.length === 0) return <KnowledgeSoon title={g.title} body={g.soon} locale={locale} />;

  const fmt = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US");
  const cats = TERM_CATEGORIES.map((cat) => ({ cat, list: terms.filter((t) => t.category === cat) })).filter((c) => c.list.length > 0);
  const regulatory = terms.filter((t) => t.regulatory).length;

  return (
    <div className="rw rwh">
      <PageHero
        img="/images/pages/glossary.webp"
        alt={p.alt}
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.lead}
        credit={credit}
        stats={[
          { value: fmt(terms.length), label: p.stats.terms },
          { value: fmt(cats.length), label: p.stats.categories },
          { value: fmt(regulatory), label: p.stats.regulatory },
        ]}
      />

      <nav className="rwg-bar" aria-label={p.browse}>
        <div className="rw-wrap rwg-bar__inner">
          {cats.map(({ cat, list }) => (
            <a key={cat} href={`#${cat}`}>{g.categories[cat]}<b>{fmt(list.length)}</b></a>
          ))}
        </div>
      </nav>

      <div className="rw-wrap">
        {cats.map(({ cat, list }, i) => (
          <section key={cat} id={cat} className="rwg-cat">
            <span className="rwg-cat__num">{fmt(i + 1).padStart(2, "0")}</span>
            <h2 className="rwh-title">{g.categories[cat]}</h2>
            <div className="rwg-grid">
              {list.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`} className={`rwg-term${t.regulatory ? " rwg-term--reg" : ""}`}>
                  {t.draft && <div className="rwc-tags"><DraftBadge locale={locale} /></div>}
                  <h3><Tx l={t.term} locale={locale} /></h3>
                  <p><Tx l={t.definition} locale={locale} /></p>
                  <span>{p.read} {locale === "ar" ? "←" : "→"}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {regulatory > 0 && <p className="rw-fineprint" style={{ paddingBlockEnd: "3rem" }}>{p.regNote}</p>}
      </div>
    </div>
  );
}
