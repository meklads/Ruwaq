import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";
import { HomeKnowledge } from "@/modules/site/content/home-section";
import { sectionAvailability } from "@/modules/site/content/loader";

export default async function HomePage() {
  const locale = await getLocale();
  const h = getSiteCopy(locale).home;
  const has = sectionAvailability();
  const num = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA" : "en-US", { minimumIntegerDigits: 2 });
  const chip = (on: boolean) => (
    <span className={`rw-chip rw-chip--${on ? "available" : "soon"}`}>{on ? h.index.available : h.index.soon}</span>
  );
  const sections = [
    { href: "/updates", on: has.updates, ...h.sections.items.updates },
    { href: "/insights", on: has.insights, ...h.sections.items.insights },
    { href: "/specialists", on: has.specialists, ...h.sections.items.specialists },
  ];

  return (
    <div className="rw rw-home">
      <section className="rw-hero rw-hero--home">
        <div className="rw-wrap rw-hero__grid">
          <div className="rw-hero__copy">
            <span className="rw-eyebrow rw-eyebrow--rule">{h.eyebrow}</span>
            <h1 className="rw-hero-title">{h.title}</h1>
            <p className="rw-lead">{h.lead}</p>
            <div className="rw-actions">
              <Link href="/#sections" className="rw-btn rw-btn--primary">
                {h.cta}
              </Link>
              <Link href="/proposals" className="rw-btn rw-btn--outline">
                {h.ctaSecondary}
              </Link>
            </div>
            <ul className="rw-trust">
              {h.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <aside className="rw-index" aria-label={h.index.label}>
            <p className="rw-index__label">{h.index.label}</p>
            <ol className="rw-index__list">
              {sections.map((s, i) => (
                <li key={s.href}>
                  <Link href={s.href} className="rw-index__row">
                    <span className="rw-index__num" aria-hidden="true">{num(i + 1)}</span>
                    <span className="rw-index__title">{s.title}</span>
                    {chip(s.on)}
                  </Link>
                </li>
              ))}
            </ol>
            <p className="rw-index__label rw-index__label--sub">{h.index.tools}</p>
            <ul className="rw-index__list">
              <li>
                <Link href="/proposals" className="rw-index__row">
                  <span className="rw-index__num" aria-hidden="true">+</span>
                  <span className="rw-index__title">{h.index.nasaq}</span>
                  <span className="rw-chip rw-chip--tool">{h.index.tool}</span>
                </Link>
              </li>
              <li>
                <Link href="/radar" className="rw-index__row">
                  <span className="rw-index__num" aria-hidden="true">+</span>
                  <span className="rw-index__title">{h.index.radar}</span>
                  <span className="rw-chip rw-chip--internal">{h.index.internal}</span>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="sections" className="rw-section rw-section--stone" style={{ scrollMarginTop: "5rem" }}>
        <div className="rw-wrap">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.sections.eyebrow}</span>
            <h2 className="rw-display">{h.sections.title}</h2>
            <p className="rw-body">{h.sections.body}</p>
          </div>
          <div className="rw-grid rw-grid--3">
            {sections.map((s, i) => (
              <Link key={s.href} href={s.href} className="rw-card rw-card--section">
                <span className="rw-card__num" aria-hidden="true">{num(i + 1)}</span>
                <div className="rw-card__top">
                  <h3 className="rw-h3">{s.title}</h3>
                  {chip(s.on)}
                </div>
                <p className="rw-body">{s.body}</p>
                <span className="rw-card__more">{h.sections.open}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeKnowledge />

      <section className="rw-section">
        <div className="rw-wrap rw-method">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.how.eyebrow}</span>
            <h2 className="rw-display">{h.how.title}</h2>
            <p className="rw-body">{h.how.body}</p>
          </div>
          <ol className="rw-method__list">
            {h.how.cards.map((card, i) => (
              <li key={card.title}>
                <span className="rw-method__num" aria-hidden="true">{num(i + 1)}</span>
                <h3 className="rw-h3">{card.title}</h3>
                <p className="rw-body">{card.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rw-section rw-section--ink rw-band">
        <div className="rw-wrap rw-band__grid">
          <div>
            <span className="rw-eyebrow">{h.nasaq.eyebrow}</span>
            <h2 className="rw-display">{h.nasaq.title}</h2>
            <p className="rw-lead">{h.nasaq.body}</p>
          </div>
          <div className="rw-band__actions">
            <Link href="/proposals/new" className="rw-btn rw-btn--gold">
              {h.nasaq.primary}
            </Link>
            <Link href="/proposals#samples" className="rw-btn rw-btn--outline-light">
              {h.nasaq.secondary}
            </Link>
            <Link href="/proposals" className="rw-link">
              {h.nasaq.link}
            </Link>
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone rw-aside-radar">
        <div className="rw-wrap rw-aside-radar__inner">
          <div>
            <span className="rw-eyebrow">{h.radar.eyebrow}</span>
            <h2 className="rw-h2">{h.radar.title}</h2>
            <p className="rw-body">{h.radar.body}</p>
          </div>
          <Link href="/radar" className="rw-btn rw-btn--outline">
            {h.radar.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
