import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_PUBLIC_EMAIL } from "@/shared/constants/brand";
import { GUARANTEE_ENABLED, getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).charter;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/charter` } };
}

export default async function CharterPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).charter;

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
          <ol className="rw-articles">
            {c.articles.map((a) => (
              <li key={a.title}>
                <div>
                  <h2 className="rw-h3">{a.title}</h2>
                  <p className="rw-body">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-note-box rw-split rw-split--even" style={{ padding: "clamp(1.75rem, 4vw, 3rem)" }}>
          <div>
            <h2 className="rw-h2">{c.accountabilityTitle}</h2>
            <p className="rw-body" style={{ marginBlockStart: "1rem" }}>
              {c.accountability}
            </p>
            <p style={{ marginBlockStart: "1.25rem" }}>
              <a href={`mailto:${RUWQ_PUBLIC_EMAIL}`} className="rw-link" dir="ltr">
                {RUWQ_PUBLIC_EMAIL}
              </a>
            </p>
          </div>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {GUARANTEE_ENABLED ? (
              <div className="rw-guarantee">
                <span className="rw-guarantee__seal" aria-hidden="true">
                  <ShieldCheck size={22} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="rw-h3">{c.guaranteeTitle}</h3>
                  <p className="rw-body">{c.guarantee}</p>
                </div>
              </div>
            ) : null}
            <div>
              <Link href="/check" className="rw-btn rw-btn--primary">
                {c.cta}
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
