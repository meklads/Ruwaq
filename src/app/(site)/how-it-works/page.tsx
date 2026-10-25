import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).how;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/how-it-works` },
  };
}

export default async function HowItWorksPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const site = getSiteCopy(locale);
  const c = site.how;
  const home = site.home;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <p className="rw-eyebrow">{c.eyebrow}</p>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-steps3" style={{ marginBlockStart: 0 }}>
            {home.services.map((sv) => (
              <article key={sv.href} className="rw-step">
                <span className="rw-step__num">{sv.step}</span>
                <p className="rw-step__when">{sv.when}</p>
                <h2 className="rw-step__title">{sv.title}</h2>
                <p className="rw-step__body">{sv.body}</p>
                <p className="rw-step__meta">{sv.meta}</p>
                <div className="rw-step__cta">
                  <Link href={sv.href} className="rw-btn rw-btn--outline rw-btn--sm">
                    {sv.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <h2 className="rw-h2" style={{ maxWidth: "40rem" }}>
            {home.measuresTitle}
          </h2>
          <p className="rw-body" style={{ marginBlockStart: "0.75rem" }}>
            {home.measuresLead}
          </p>
          <ol className="rw-measures">
            {home.measures.map((m, i) => (
              <li key={m.title}>
                <span className="rw-measures__n">{(i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}</span>
                <div>
                  <h3 className="rw-h3">{m.title}</h3>
                  <p className="rw-body">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rw-section rw-section--ink">
        <div className="rw-wrap rw-narrow">
          <h2 className="rw-h2">{c.closingTitle}</h2>
          <p className="rw-lead" style={{ marginBlockStart: "1rem" }}>
            {c.closing}
          </p>
          <div className="rw-hero__actions">
            <Link href="/check" className="rw-btn rw-btn--gold">
              {home.primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
