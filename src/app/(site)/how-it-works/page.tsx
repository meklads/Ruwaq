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
    <div className="ruwaq-qc">
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.eyebrow}</p>
          <h1 className="ruwaq-qc-title">{c.title}</h1>
          <p className="ruwaq-qc-lead">{c.lead}</p>
        </div>
      </section>

      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <div className="ruwaq-qc-grid ruwaq-home-services">
            {c.journey.map((j, i) => (
              <Link key={j.href} href={j.href} className="ruwaq-qc-card ruwaq-home-service">
                <span className="ruwaq-home-step">0{i + 1}</span>
                <p className="mt-2 text-sm font-semibold text-neutral-500">{j.when}</p>
                <h2 className="ruwaq-qc-card-title">{j.title}</h2>
                <p className="ruwaq-qc-card-body">{j.body}</p>
                <span className="ruwaq-home-service-cta">
                  {j.cta} {locale === "ar" ? "←" : "→"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-section ruwaq-qc-section--muted">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{home.locksTitle}</h2>
          <ol className="ruwaq-qc-grid">
            {home.locks.map((l, i) => (
              <li key={l.title} className="ruwaq-qc-card">
                <span className="ruwaq-qc-num">{i + 1}</span>
                <h3 className="ruwaq-qc-card-title">{l.title}</h3>
                <p className="ruwaq-qc-card-body">{l.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow">
          <p className="ruwaq-qc-eyebrow">{home.principleTitle}</p>
          <p className="mt-4 text-lg leading-relaxed text-white/90 sm:text-xl">{home.principleBody}</p>
        </div>
      </section>
    </div>
  );
}
