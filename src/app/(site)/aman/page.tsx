import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { ServiceRequestForm } from "@/modules/ruwaq/service-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).aman;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/aman` },
  };
}

export default async function AmanPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).aman;

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
        <div className="ruwaq-qc-wrap ruwaq-qc-split">
          <div>
            <h2 className="ruwaq-qc-h2">{c.stepsTitle}</h2>
            <ol className="ruwaq-qc-steps">
              {c.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="ruwaq-qc-num">{i + 1}</span>
                  <div>
                    <h3 className="ruwaq-qc-card-title">{s.title}</h3>
                    <p className="ruwaq-qc-card-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="ruwaq-qc-card mt-10">
              <h3 className="ruwaq-qc-card-title mt-0">{c.feeTitle}</h3>
              <p className="ruwaq-qc-card-body">{c.fee}</p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">{c.disclaimer}</p>
          </div>
          <div className="ruwaq-qc-form-card">
            <ServiceRequestForm locale={locale} service="aman" title={c.formTitle} defaultStage="chose_contractor" />
          </div>
        </div>
      </section>
    </div>
  );
}
