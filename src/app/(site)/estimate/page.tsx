import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { ESTIMATE_SOURCES, getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { CostEstimator } from "@/modules/ruwaq/cost-estimator";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).estimate;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/estimate` } };
}

export default async function EstimatePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).estimate;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "44rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <CostEstimator locale={locale} />
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap rw-split rw-split--even" style={{ alignItems: "start" }}>
          <div>
            <h2 className="rw-h2">{c.notesTitle}</h2>
            <ul className="rw-bullets" style={{ marginBlockStart: "1.5rem" }}>
              {c.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div className="rw-card">
            <h3 className="rw-h3">{c.sourcesTitle}</h3>
            <ul className="rw-sources" style={{ marginBlockStart: "0.85rem" }}>
              {ESTIMATE_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
