import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const r = getSiteCopy(locale).radar;
  return { title: `${r.eyebrow} | ${locale === "ar" ? "رواق" : "Ruwaq"}`, description: r.lead };
}

export default async function RadarPage() {
  const locale = await getLocale();
  const r = getSiteCopy(locale).radar;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <span className="rw-eyebrow">{r.eyebrow}</span>
          <h1 className="rw-display">{r.title}</h1>
          <p className="rw-lead">{r.lead}</p>
          <div className="rw-note-box rw-note-box--mark" style={{ marginBlockStart: "1.75rem" }}>
            <p className="rw-body">{r.status}</p>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <dl className="rw-rows">
            <div>
              <dt className="rw-h3">{r.audience.title}</dt>
              <dd>{r.audience.body}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-grid rw-grid--2">
            <div className="rw-card">
              <h2 className="rw-h3">{r.works.title}</h2>
              <ul className="rw-body" style={{ marginBlockStart: "0.75rem", paddingInlineStart: "1.1rem", listStyle: "disc" }}>
                {r.works.items.map((i) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
            <div className="rw-card">
              <h2 className="rw-h3">{r.planned.title}</h2>
              <ul className="rw-body" style={{ marginBlockStart: "0.75rem", paddingInlineStart: "1.1rem", listStyle: "disc" }}>
                {r.planned.items.map((i) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-display">{r.journey.title}</h2>
            <p className="rw-body">{r.journey.body}</p>
          </div>
          <ol className="rw-grid rw-grid--4">
            {r.journey.steps.map((s, i) => (
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

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap rw-narrow">
          <article className="rw-opp" aria-label={r.example.label}>
            <span className="rw-opp__label">{r.example.label}</span>
            <h2 className="rw-opp__title">{r.example.title}</h2>
            <div className="rw-opp__rows">
              {r.example.rows.map((row) => (
                <div key={row.key} className="rw-opp__row">
                  <span className="rw-opp__k">
                    {row.key}
                    {row.tag && <span className={`rw-opp__tag${row.inferred ? " rw-opp__tag--inferred" : ""}`}>{row.tag}</span>}
                  </span>
                  <span className="rw-opp__v">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="rw-opp__foot">{r.example.footnote}</p>
          </article>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <h2 className="rw-h2">{r.states.title}</h2>
          <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>
            {r.states.body}
          </p>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap rw-narrow">
          <h2 className="rw-h2">{r.contact.title}</h2>
          <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>
            {r.contact.body}
          </p>
          <div className="rw-actions">
            <Link href="/contact" className="rw-btn rw-btn--primary">
              {r.contact.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
