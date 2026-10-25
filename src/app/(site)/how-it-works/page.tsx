import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { CardIcon, MEASURE_ICONS, SERVICE_ICONS } from "@/modules/ruwaq/icons";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).how;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/how-it-works` } };
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
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "48rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-grid rw-grid--3">
            {home.services.map((sv, i) => (
              <article key={sv.href} className="rw-card rw-service">
                <CardIcon icon={SERVICE_ICONS[i]} />
                <span className="rw-service__step">
                  {locale === "ar" ? "الخطوة" : "Step"} {sv.step}
                </span>
                <p className="rw-service__when">{sv.when}</p>
                <h2 className="rw-service__title">{sv.title}</h2>
                <p className="rw-service__body">{sv.body}</p>
                <p className="rw-service__meta">{sv.meta}</p>
                <div className="rw-service__cta">
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
          <div className="rw-head">
            <h2 className="rw-h2">{home.measuresTitle}</h2>
            <p className="rw-body">{home.measuresLead}</p>
          </div>
          <div className="rw-grid rw-grid--3">
            {home.measures.map((m, i) => (
              <article key={m.title} className="rw-card">
                <CardIcon icon={MEASURE_ICONS[i]} />
                <h3 className="rw-h3">{m.title}</h3>
                <p className="rw-body">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--ink">
        <div className="rw-wrap rw-narrow">
          <h2 className="rw-h2">{c.closingTitle}</h2>
          <p className="rw-lead" style={{ marginBlockStart: "1rem" }}>
            {c.closing}
          </p>
          <div className="rw-actions">
            <Link href="/check" className="rw-btn rw-btn--gold">
              {home.primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
