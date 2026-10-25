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
  const rawLocale = await getLocale();
  const locale = rawLocale === "en" ? "en" : "ar";
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
    <div className="ruwaq-qc">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.hero.eyebrow}</p>
          <h1 className="ruwaq-qc-title">{c.hero.title}</h1>
          <p className="ruwaq-qc-lead">{c.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#check-form" className="ruwaq-pro-btn-solid bg-[#c9a063] px-8 py-3.5 text-neutral-950 hover:bg-[#d4b47a]">
              {c.hero.primaryCta}
            </a>
            <a
              href="#what-we-check"
              className="inline-flex items-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              {c.hero.secondaryCta}
            </a>
          </div>
          <ul className="ruwaq-qc-trust">
            {c.hero.trust.map((t) => (
              <li key={t}>
                <span aria-hidden>✓</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problem */}
      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.problem.title}</h2>
          <ul className="ruwaq-qc-problems">
            {c.problem.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <p className="ruwaq-qc-closing">{c.problem.closing}</p>
        </div>
      </section>

      {/* What we check */}
      <section className="ruwaq-qc-section ruwaq-qc-section--muted" id="what-we-check">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.checks.title}</h2>
          <ol className="ruwaq-qc-grid">
            {c.checks.items.map((i, idx) => (
              <li key={i.title} className="ruwaq-qc-card">
                <span className="ruwaq-qc-num">{idx + 1}</span>
                <h3 className="ruwaq-qc-card-title">{i.title}</h3>
                <p className="ruwaq-qc-card-body">{i.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Steps + packages + form */}
      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap ruwaq-qc-split">
          <div>
            <h2 className="ruwaq-qc-h2">{c.steps.title}</h2>
            <ol className="ruwaq-qc-steps">
              {c.steps.items.map((s, idx) => (
                <li key={s.title}>
                  <span className="ruwaq-qc-num">{idx + 1}</span>
                  <div>
                    <h3 className="ruwaq-qc-card-title">{s.title}</h3>
                    <p className="ruwaq-qc-card-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="ruwaq-qc-h2 mt-12">{c.packages.title}</h2>
            <div className="ruwaq-qc-plans">
              {[c.packages.free, c.packages.detailed].map((p, idx) => (
                <div key={p.name} className={`ruwaq-qc-plan ${idx === 1 ? "ruwaq-qc-plan--featured" : ""}`}>
                  {"badge" in p && p.badge ? <span className="ruwaq-qc-badge">{p.badge as string}</span> : null}
                  <h3 className="ruwaq-qc-card-title">{p.name}</h3>
                  <p className="ruwaq-qc-price">{p.price}</p>
                  <ul>
                    {p.items.map((i) => (
                      <li key={i}>
                        <span aria-hidden>✓</span> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">{c.packages.note}</p>
          </div>

          <div className="ruwaq-qc-form-card">
            <QuoteCheckForm locale={locale} />
          </div>
        </div>
      </section>

      {/* Why Ruwaq */}
      <section className="ruwaq-qc-section ruwaq-qc-section--muted">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.why.title}</h2>
          <div className="ruwaq-qc-grid ruwaq-qc-grid--3">
            {c.why.items.map((i) => (
              <div key={i.title} className="ruwaq-qc-card">
                <h3 className="ruwaq-qc-card-title">{i.title}</h3>
                <p className="ruwaq-qc-card-body">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow">
          <h2 className="ruwaq-qc-h2">{c.faq.title}</h2>
          <div className="ruwaq-qc-faq">
            {c.faq.items.map((i) => (
              <details key={i.q}>
                <summary>{i.q}</summary>
                <p>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap text-center">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">{c.finalCta.title}</h2>
          <a
            href="#check-form"
            className="ruwaq-pro-btn-solid mt-6 inline-flex bg-[#c9a063] px-8 py-3.5 text-neutral-950 hover:bg-[#d4b47a]"
          >
            {c.finalCta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
