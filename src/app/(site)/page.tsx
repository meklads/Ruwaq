import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { sectionAvailability } from "@/modules/site/content/loader";
import { Tx } from "@/modules/site/content/components";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";
import { getStyles, getTerms, publishedKnowledge } from "@/modules/site/knowledge/loader";
import { getHomeCopy } from "@/modules/site/home/copy";
import "@/modules/site/home/home.css";

/** Terms featured on the home page, in this order, when they are published. */
const FEATURED_TERMS = ["render", "maquette", "smart-model", "sales-gallery", "off-plan-sale", "digital-twin"];

export default async function HomePage() {
  const locale = await getLocale();
  const h = getHomeCopy(locale);
  const k = getKnowledgeCopy(locale);
  const has = sectionAvailability();
  const terms = publishedKnowledge(getTerms());
  const stylesLive = publishedKnowledge(getStyles()).length > 0;
  const fmt = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");
  const featured = FEATURED_TERMS.map((s) => terms.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const cards = [
    { key: "glossary", href: "/glossary", on: terms.length > 0, img: "/images/home/glossary.webp", ...h.sections.items.glossary },
    { key: "atlas", href: "/atlas", on: stylesLive, img: "/images/home/atlas.webp", ...h.sections.items.atlas },
    { key: "updates", href: "/updates", on: has.updates, img: "/images/home/updates.webp", ...h.sections.items.updates },
    { key: "specialists", href: "/specialists", on: has.specialists, img: "/images/home/specialists.webp", ...h.sections.items.specialists },
  ];

  return (
    <div className="rw rwh">
      {/* Hero */}
      <section className="rwh-hero">
        <Image src="/images/home/hero.webp" alt={h.hero.alt} fill priority sizes="100vw" className="rwh-hero__img" />
        <div className="rw-wrap rwh-hero__inner">
          <span className="rwh-eyebrow">{h.hero.eyebrow}</span>
          <h1 className="rwh-hero__title">{h.hero.title}</h1>
          <p className="rwh-hero__lead">{h.hero.lead}</p>
          <div className="rwh-hero__actions">
            <Link href="/glossary" className="rwh-btn rwh-btn--gold">{h.hero.primary}</Link>
            <Link href="#sections" className="rwh-btn rwh-btn--ghost">{h.hero.secondary}</Link>
          </div>
          <p className="rwh-hero__credit">{h.hero.credit}</p>
        </div>
      </section>

      {/* Stats: counted from published content */}
      <section className="rwh-stats" aria-label={h.sections.eyebrow}>
        <div className="rw-wrap rwh-stats__grid">
          <div className="rwh-stat"><strong>{fmt(terms.length)}</strong><span>{h.stats.terms}</span></div>
          <div className="rwh-stat"><strong>{fmt(k.atlas.mapStyles.length)}</strong><span>{h.stats.styles}</span></div>
          <div className="rwh-stat"><strong>{fmt(cards.length)}</strong><span>{h.stats.sections}</span></div>
        </div>
      </section>

      {/* Sections */}
      <section id="sections" className="rwh-section" style={{ scrollMarginTop: "5rem" }}>
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{h.sections.eyebrow}</span>
          <h2 className="rwh-title">{h.sections.title}</h2>
          <p className="rwh-body">{h.sections.body}</p>
          <div className="rwh-cards">
            {cards.map((c, i) => (
              <Link key={c.key} href={c.href} className="rwh-card">
                <div className="rwh-card__media">
                  <Image src={c.img} alt={c.alt} fill sizes="(min-width: 1100px) 25vw, (min-width: 720px) 50vw, 100vw" />
                  <span className={`rwh-card__chip rwh-card__chip--${c.on ? "on" : "soon"}`}>{c.on ? h.sections.available : h.sections.soon}</span>
                </div>
                <div className="rwh-card__body">
                  <span className="rwh-card__num">{fmt(i + 1).padStart(2, locale === "ar" ? "٠" : "0")}</span>
                  <h3 className="rwh-card__title">{c.title}</h3>
                  <p className="rwh-card__text">{c.body}</p>
                  <span className="rwh-card__more">{h.sections.open} {locale === "ar" ? "←" : "→"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary band */}
      {featured.length > 0 && (
        <section className="rwh-section rwh-band">
          <div className="rw-wrap rwh-band__grid">
            <div>
              <span className="rwh-eyebrow">{h.glossary.eyebrow}</span>
              <h2 className="rwh-title">{h.glossary.title}</h2>
              <p className="rwh-body">{h.glossary.body}</p>
              <div className="rwh-band__actions">
                <Link href="/glossary" className="rwh-btn rwh-btn--gold">{h.glossary.all} ({fmt(terms.length)})</Link>
              </div>
            </div>
            <div className="rwh-terms">
              {featured.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`} className="rwh-term">
                  <strong><Tx l={t.term} locale={locale} /></strong>
                  <span><Tx l={t.definition} locale={locale} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Atlas */}
      <section className="rwh-section">
        <div className="rw-wrap rwh-atlas">
          <div>
            <span className="rwh-eyebrow">{h.atlas.eyebrow}</span>
            <h2 className="rwh-title">{h.atlas.title}</h2>
            <p className="rwh-body">{h.atlas.body}</p>
            <ul className="rwh-styles">
              {k.atlas.mapStyles.map((n, i) => (
                <li key={n}><b>{fmt(i + 1)}</b>{n}</li>
              ))}
            </ul>
            <Link href="/atlas" className="rwh-btn rwh-btn--dark">{h.atlas.cta}</Link>
          </div>
          <div className="rwh-atlas__img">
            <Image src="/images/home/atlas.webp" alt={h.sections.items.atlas.alt} width={900} height={678} sizes="(min-width: 960px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="rwh-section rwh-method">
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{h.method.eyebrow}</span>
          <h2 className="rwh-title">{h.method.title}</h2>
          <div className="rwh-method__grid">
            {h.method.items.map((m) => (
              <div key={m.title} className="rwh-method__item">
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="rwh-section">
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{h.tools.eyebrow}</span>
          <div className="rwh-tools">
            <div className="rwh-tool">
              <h3>{h.tools.nasaq.title}</h3>
              <p>{h.tools.nasaq.body}</p>
              <Link href="/proposals" className="rwh-btn rwh-btn--dark">{h.tools.nasaq.cta}</Link>
            </div>
            <div className="rwh-tool">
              <h3>{h.tools.radar.title}</h3>
              <p>{h.tools.radar.body}</p>
              <Link href="/radar" className="rwh-btn rwh-btn--dark">{h.tools.radar.cta}</Link>
            </div>
          </div>
          <p className="rwh-owner">{h.owner}</p>
        </div>
      </section>
    </div>
  );
}
