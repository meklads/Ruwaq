import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getQuoteCheckCopy } from "@/modules/marketplace/lib/quote-check-copy";
import { QuoteCheckForm } from "@/modules/marketplace/components/quote-check-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getQuoteCheckCopy(locale === "en" ? "en" : "ar");
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <div className="rw">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="rw-page-hero">
        <div className="rw-wrap">
          <p className="rw-eyebrow">{c.hero.eyebrow}</p>
          <h1 className="rw-display">{c.hero.title}</h1>
          <p className="rw-lead">{c.hero.lead}</p>
          <div className="rw-hero__actions">
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
        <div className="rw-wrap rw-split">
          <div className="rw-split__sticky">
            <h2 className="rw-h2">{c.problem.title}</h2>
            <div className="rw-callout rw-callout--mark" style={{ marginBlockStart: "1.5rem" }}>
              <p style={{ fontWeight: 600 }}>{c.problem.closing}</p>
            </div>
          </div>
          <ul className="rw-issues">
            {c.problem.items.map((i) => (
              <li key={i}>
                <p className="rw-body" style={{ color: "var(--rw-ink)" }}>
                  {i}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rw-section rw-section--stone" id="what-we-check">
        <div className="rw-wrap">
          <h2 className="rw-h2">{c.checks.title}</h2>
          <dl className="rw-rows">
            {c.checks.items.map((i) => (
              <div key={i.title}>
                <dt>{i.title}</dt>
                <dd>{i.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--even">
          <div>
            <h2 className="rw-h2">{c.steps.title}</h2>
            <ol className="rw-process">
              {c.steps.items.map((s, idx) => (
                <li key={s.title}>
                  <span className="rw-process__n">{(idx + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}</span>
                  <div>
                    <h3 className="rw-h3">{s.title}</h3>
                    <p className="rw-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="rw-h2" style={{ marginBlockStart: "3.5rem" }}>
              {c.packages.title}
            </h2>
            <div className="rw-plans">
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
            <p className="rw-fineprint" style={{ marginBlockStart: "0.85rem" }}>
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
          <h2 className="rw-h2">{c.why.title}</h2>
          <dl className="rw-rows">
            {c.why.items.map((i) => (
              <div key={i.title}>
                <dt>{i.title}</dt>
                <dd>{i.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <h2 className="rw-h2">{c.faq.title}</h2>
          <div className="rw-faq" style={{ marginBlockStart: "1.75rem" }}>
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
