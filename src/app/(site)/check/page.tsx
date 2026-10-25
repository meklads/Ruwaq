import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getQuoteCheckCopy } from "@/modules/marketplace/lib/quote-check-copy";
import { QuoteCheckForm } from "@/modules/marketplace/components/quote-check-form";
import { CardIcon, CHECK_ICONS, FEAR_ICONS, PRINCIPLE_ICONS } from "@/modules/ruwaq/icons";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getQuoteCheckCopy((await getLocale()) === "en" ? "en" : "ar");
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/check` },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: `${env.NEXT_PUBLIC_APP_URL}/check` },
  };
}

export default async function QuoteCheckPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getQuoteCheckCopy(locale);
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };

  return (
    <div className="rw">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.hero.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "48rem" }}>
            {c.hero.title}
          </h1>
          <p className="rw-lead">{c.hero.lead}</p>
          <div className="rw-actions">
            <a href="#check-form" className="rw-btn rw-btn--primary">
              {c.hero.primaryCta}
            </a>
            <a href="#what-we-check" className="rw-btn rw-btn--outline">
              {c.hero.secondaryCta}
            </a>
          </div>
          <ul className="rw-trust">
            {c.hero.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.problem.title}</h2>
          </div>
          <div className="rw-grid rw-grid--4">
            {c.problem.items.map((i, idx) => (
              <article key={i} className="rw-card">
                <CardIcon icon={FEAR_ICONS[idx]} tone="mark" />
                <p className="rw-body" style={{ color: "var(--rw-ink)" }}>
                  {i}
                </p>
              </article>
            ))}
          </div>
          <div className="rw-note-box rw-note-box--mark" style={{ marginBlockStart: "1.25rem" }}>
            <p style={{ fontWeight: 600 }}>{c.problem.closing}</p>
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone" id="what-we-check">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.checks.title}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.checks.items.map((i, idx) => (
              <article key={i.title} className="rw-card">
                <CardIcon icon={CHECK_ICONS[idx]} />
                <h3 className="rw-h3">{i.title}</h3>
                <p className="rw-body">{i.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--form">
          <div>
            <div className="rw-head">
              <h2 className="rw-h2">{c.steps.title}</h2>
            </div>
            <ol className="rw-steps">
              {c.steps.items.map((s, idx) => (
                <li key={s.title}>
                  <span className="rw-steps__n">{n(idx)}</span>
                  <div>
                    <h3 className="rw-h3">{s.title}</h3>
                    <p className="rw-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rw-head" style={{ marginBlockStart: "clamp(3rem, 6vw, 4.5rem)" }}>
              <h2 className="rw-h2">{c.packages.title}</h2>
            </div>
            <div className="rw-grid rw-grid--2">
              {[c.packages.free, c.packages.detailed].map((p, idx) => (
                <div key={p.name} className={`rw-plan ${idx === 1 ? "rw-plan--featured" : ""}`}>
                  <h3 className="rw-h3">{p.name}</h3>
                  <p className="rw-plan__price">{p.price}</p>
                  <ul>
                    {p.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="rw-fineprint" style={{ marginBlockStart: "1rem" }}>
              {c.packages.note}
            </p>
          </div>

          <div className="rw-form-card" id="check-form">
            <QuoteCheckForm locale={locale} />
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.why.title}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.why.items.map((i, idx) => (
              <article key={i.title} className="rw-card">
                <CardIcon icon={PRINCIPLE_ICONS[idx]} />
                <h3 className="rw-h3">{i.title}</h3>
                <p className="rw-body">{i.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <div className="rw-head">
            <h2 className="rw-h2">{c.faq.title}</h2>
          </div>
          <div className="rw-faq">
            {c.faq.items.map((i) => (
              <details key={i.q}>
                <summary>{i.q}</summary>
                <p>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
