import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { ServiceRequestForm } from "@/modules/ruwaq/service-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).projectFile;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/project-file` } };
}

export default async function ProjectFilePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).projectFile;
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "48rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
          <div className="rw-actions">
            <a href="#request-form" className="rw-btn rw-btn--primary">
              {c.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--form">
          <div>
            <div className="rw-head">
              <h2 className="rw-h2">{c.includesTitle}</h2>
            </div>
            <ol className="rw-steps">
              {c.includes.map((s, i) => (
                <li key={s.title}>
                  <span className="rw-steps__n">{n(i)}</span>
                  <div>
                    <h3 className="rw-h3">{s.title}</h3>
                    <p className="rw-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rw-form-card" id="request-form">
            <ServiceRequestForm locale={locale} service="project_file" title={c.formTitle} lead={c.formLead} defaultStage="planning" />
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.resultTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.results.map((r) => (
              <article key={r} className="rw-card">
                <p className="rw-body" style={{ color: "var(--rw-ink)", fontWeight: 500 }}>
                  {r}
                </p>
              </article>
            ))}
          </div>
          <div className="rw-note-box" style={{ marginBlockStart: "1.25rem", background: "#fff" }}>
            <h3 className="rw-h3">{c.pricingTitle}</h3>
            <p className="rw-body">{c.pricing}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
