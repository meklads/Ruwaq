import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { ServiceRequestForm } from "@/modules/ruwaq/service-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).projectFile;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/project-file` },
  };
}

export default async function ProjectFilePage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).projectFile;
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <p className="rw-eyebrow">{c.eyebrow}</p>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
          <div className="rw-hero__actions">
            <a href="#request-form" className="rw-btn rw-btn--primary">
              {c.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--even">
          <div>
            <h2 className="rw-h2">{c.includesTitle}</h2>
            <ol className="rw-process">
              {c.includes.map((s, i) => (
                <li key={s.title}>
                  <span className="rw-process__n">{n(i)}</span>
                  <div>
                    <h3 className="rw-h3">{s.title}</h3>
                    <p className="rw-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="rw-h2" style={{ marginBlockStart: "3.5rem" }}>
              {c.resultTitle}
            </h2>
            <ul className="rw-issues" style={{ marginBlockStart: "1.5rem" }}>
              {c.results.map((r) => (
                <li key={r}>
                  <p className="rw-body" style={{ color: "var(--rw-ink)" }}>
                    {r}
                  </p>
                </li>
              ))}
            </ul>

            <div className="rw-callout" style={{ marginBlockStart: "2.5rem" }}>
              <h3 className="rw-h3">{c.pricingTitle}</h3>
              <p className="rw-body">{c.pricing}</p>
            </div>
          </div>

          <div className="rw-form-card" id="request-form">
            <ServiceRequestForm locale={locale} service="project_file" title={c.formTitle} lead={c.formLead} defaultStage="planning" />
          </div>
        </div>
      </section>
    </div>
  );
}
