import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_PUBLIC_EMAIL, RUWQ_SUPPORT_WHATSAPP_E164 } from "@/shared/constants/brand";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).contact;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/contact` } };
}

export default async function ContactPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).contact;
  const wa = (process.env.NEXT_PUBLIC_RUWQ_SUPPORT_WHATSAPP?.trim() || RUWQ_SUPPORT_WHATSAPP_E164).replace(/\D/g, "");
  const waDisplay = wa.startsWith("966") ? `0${wa.slice(3)}` : wa;

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
          <div className="rw-contact">
            <div className="rw-card">
              <h2 className="rw-h3">{c.whatsapp}</h2>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="rw-contact__value" dir="ltr">
                {waDisplay}
              </a>
              <p className="rw-small" style={{ marginBlockStart: "0.5rem" }}>
                {c.whatsappNote}
              </p>
            </div>
            <div className="rw-card">
              <h2 className="rw-h3">{c.email}</h2>
              <a href={`mailto:${RUWQ_PUBLIC_EMAIL}`} className="rw-contact__value" dir="ltr">
                {RUWQ_PUBLIC_EMAIL}
              </a>
              <p className="rw-small" style={{ marginBlockStart: "0.5rem" }}>
                {c.emailNote}
              </p>
            </div>
            <div className="rw-card">
              <h2 className="rw-h3">{c.location}</h2>
              <span className="rw-contact__value">{c.locationValue}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.routesTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.routes.map((r) => (
              <article key={r.href} className="rw-card" style={{ display: "flex", flexDirection: "column" }}>
                <h3 className="rw-h3">{r.title}</h3>
                <p className="rw-body" style={{ flex: "1 1 auto" }}>
                  {r.body}
                </p>
                <div style={{ marginBlockStart: "1.25rem" }}>
                  <Link href={r.href} className="rw-link">
                    {r.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
