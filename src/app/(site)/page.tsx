import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";
import { HomeKnowledge } from "@/modules/site/content/home-section";
import { sectionAvailability } from "@/modules/site/content/loader";

export default async function HomePage() {
  const locale = await getLocale();
  const h = getSiteCopy(locale).home;
  const has = sectionAvailability();
  const status = (on: boolean) => (on ? h.status.available : h.status.soon);
  const sections = [
    { href: "/updates", on: has.updates, ...h.sections.items.updates },
    { href: "/insights", on: has.insights, ...h.sections.items.insights },
    { href: "/specialists", on: has.specialists, ...h.sections.items.specialists },
  ];

  return (
    <div className="rw">
      <section className="rw-hero">
        <div className="rw-wrap rw-hero__grid">
          <div>
            <span className="rw-eyebrow">{h.eyebrow}</span>
            <h1 className="rw-hero-title">{h.title}</h1>
            <p className="rw-lead">{h.lead}</p>
            <div className="rw-actions">
              <Link href="/#sections" className="rw-btn rw-btn--primary">
                {h.cta}
              </Link>
              <Link href="/about" className="rw-btn rw-btn--outline">
                {h.ctaSecondary}
              </Link>
            </div>
            <ul className="rw-trust">
              {h.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rw-sheet-stage">
            <article className="rw-opp" aria-label={h.status.label}>
              <span className="rw-opp__label">{h.status.label}</span>
              <h2 className="rw-opp__title">{h.status.title}</h2>
              <div className="rw-opp__rows">
                {sections.map((s) => (
                  <div key={s.href} className="rw-opp__row">
                    <span className="rw-opp__k">{s.title}</span>
                    <span className="rw-opp__v">
                      <span className="rw-opp__tag">{status(s.on)}</span>
                    </span>
                  </div>
                ))}
                <div className="rw-opp__row">
                  <span className="rw-opp__k">{h.status.radarName}</span>
                  <span className="rw-opp__v">
                    <span className="rw-opp__tag rw-opp__tag--inferred">{h.status.internal}</span>
                  </span>
                </div>
              </div>
              <p className="rw-opp__foot">{h.status.footnote}</p>
            </article>
          </div>
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
            {sections.map((s) => (
              <div key={s.href} className="rw-card">
                <span className="rw-eyebrow">{status(s.on)}</span>
                <h3 className="rw-h3">{s.title}</h3>
                <p className="rw-body">{s.body}</p>
                <Link href={s.href} className="rw-link">
                  {h.sections.open}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeKnowledge />

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.how.eyebrow}</span>
            <h2 className="rw-display">{h.how.title}</h2>
            <p className="rw-body">{h.how.body}</p>
          </div>
          <div className="rw-grid rw-grid--4">
            {h.how.cards.map((card) => (
              <div key={card.title} className="rw-card">
                <h3 className="rw-h3">{card.title}</h3>
                <p className="rw-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap rw-narrow">
          <div className="rw-note-box">
            <span className="rw-eyebrow">{h.radar.eyebrow}</span>
            <h2 className="rw-h2" style={{ marginBlockStart: "0.5rem" }}>{h.radar.title}</h2>
            <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>{h.radar.body}</p>
            <div className="rw-actions">
              <Link href="/radar" className="rw-btn rw-btn--outline">
                {h.radar.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head-row">
            <div className="rw-head">
              <span className="rw-eyebrow">{h.tools.eyebrow}</span>
              <h2 className="rw-h2">{h.tools.title}</h2>
              <p className="rw-body">{h.tools.body}</p>
            </div>
            <Link href="/proposals" className="rw-link">
              {h.tools.link}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
