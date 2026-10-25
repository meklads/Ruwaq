import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { ServiceRequestForm } from "@/modules/ruwaq/service-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).aman;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/aman` } };
}

export default async function AmanPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).aman;
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero rw-page-hero--ink">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "48rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
          <div className="rw-actions">
            <a href="#request-form" className="rw-btn rw-btn--gold">
              {c.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--form">
          <div>
            <div className="rw-head">
              <h2 className="rw-h2">{c.stepsTitle}</h2>
            </div>
            <ol className="rw-steps">
              {c.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="rw-steps__n">{n(i)}</span>
                  <div>
                    <h3 className="rw-h3">{s.title}</h3>
                    <p className="rw-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rw-note-box" style={{ marginBlockStart: "2.5rem" }}>
              <h3 className="rw-h3">{c.feeTitle}</h3>
              <p className="rw-body">{c.fee}</p>
            </div>
            <p className="rw-fineprint" style={{ marginBlockStart: "1rem" }}>
              {c.disclaimer}
            </p>
          </div>
          <div className="rw-form-card" id="request-form">
            <ServiceRequestForm locale={locale} service="aman" title={c.formTitle} lead={c.formLead} defaultStage="chose_contractor" />
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <Image
            src="/images/marketing/keys-new-home.jpg"
            alt={locale === "ar" ? "أسرة تتسلّم مفاتيح منزلها" : "A family receiving the keys to their home"}
            width={1920}
            height={1280}
            sizes="(min-width: 1200px) 1200px, 100vw"
            style={{ width: "100%", height: "auto", borderRadius: 14 }}
          />
        </div>
      </section>
    </div>
  );
}
