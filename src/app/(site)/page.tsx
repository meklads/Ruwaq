import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";
import { HomeKnowledge } from "@/modules/site/content/home-section";

export default async function HomePage() {
  const locale = await getLocale();
  const c = getSiteCopy(locale);
  const h = c.home;

  return (
    <div className="rw">
      <section className="rw-hero">
        <div className="rw-wrap rw-hero__grid">
          <div>
            <span className="rw-eyebrow">{h.eyebrow}</span>
            <h1 className="rw-hero-title">{h.title}</h1>
            <p className="rw-lead">{h.lead}</p>
            <div className="rw-actions">
              <Link href="/radar" className="rw-btn rw-btn--primary">
                {h.cta}
              </Link>
              <Link href="/#how" className="rw-btn rw-btn--outline">
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
            <article className="rw-opp" aria-label={h.example.label}>
              <span className="rw-opp__label">{h.example.label}</span>
              <h2 className="rw-opp__title">{h.example.title}</h2>
              <div className="rw-opp__rows">
                {h.example.rows.map((r) => (
                  <div key={r.key} className="rw-opp__row">
                    <span className="rw-opp__k">
                      {r.key}
                      {r.tag && <span className={`rw-opp__tag${r.inferred ? " rw-opp__tag--inferred" : ""}`}>{r.tag}</span>}
                    </span>
                    <span className="rw-opp__v">{r.value}</span>
                  </div>
                ))}
              </div>
              <p className="rw-opp__foot">{h.example.footnote}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.problem.eyebrow}</span>
            <h2 className="rw-display">{h.problem.title}</h2>
            <p className="rw-body">{h.problem.body}</p>
          </div>
          <div className="rw-grid rw-grid--3">
            {h.problem.cards.map((card) => (
              <div key={card.title} className="rw-card">
                <h3 className="rw-h3">{card.title}</h3>
                <p className="rw-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="rw-section" style={{ scrollMarginTop: "5rem" }}>
        <div className="rw-wrap">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.how.eyebrow}</span>
            <h2 className="rw-display">{h.how.title}</h2>
            <p className="rw-body">{h.how.body}</p>
          </div>
          <ol className="rw-grid rw-grid--4">
            {h.how.steps.map((s, i) => (
              <li key={s.title} className="rw-card">
                <span className="rw-eyebrow" aria-hidden="true">
                  {(i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}
                </span>
                <h3 className="rw-h3">{s.title}</h3>
                <p className="rw-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-door">
            <div>
              <span className="rw-eyebrow">{h.radar.eyebrow}</span>
              <h2 className="rw-display">{h.radar.title}</h2>
              <p>{h.radar.body}</p>
              <p>{h.radar.status}</p>
              <div className="rw-actions">
                <Link href="/radar" className="rw-btn rw-btn--gold">
                  {h.radar.cta}
                </Link>
              </div>
            </div>
            <ul className="rw-door__points">
              {h.radar.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HomeKnowledge />

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <span className="rw-eyebrow">{h.principles.eyebrow}</span>
            <h2 className="rw-display">{h.principles.title}</h2>
            <p className="rw-body">{h.principles.body}</p>
          </div>
          <div className="rw-grid rw-grid--4">
            {h.principles.cards.map((card) => (
              <div key={card.title} className="rw-card">
                <h3 className="rw-h3">{card.title}</h3>
                <p className="rw-body">{card.body}</p>
              </div>
            ))}
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
