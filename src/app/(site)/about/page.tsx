import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).about;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/about` },
  };
}

export default async function AboutPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).about;

  return (
    <div className="ruwaq-qc">
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow">
          <p className="ruwaq-qc-eyebrow">{c.eyebrow}</p>
          <h1 className="ruwaq-qc-title">{c.title}</h1>
        </div>
      </section>

      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow space-y-5">
          {c.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-loose text-neutral-700">{p}</p>
          ))}
        </div>
      </section>

      <section className="ruwaq-qc-section ruwaq-qc-section--muted">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.principlesTitle}</h2>
          <div className="ruwaq-qc-grid">
            {c.principles.map((p) => (
              <div key={p.title} className="ruwaq-qc-card">
                <h3 className="ruwaq-qc-card-title mt-0">{p.title}</h3>
                <p className="ruwaq-qc-card-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.groupTitle}</h2>
          <div className="ruwaq-qc-grid ruwaq-qc-grid--3">
            {c.group.map((g) => (
              <div key={g.name} className="ruwaq-qc-card">
                <h3 className="ruwaq-qc-card-title mt-0">{g.name}</h3>
                <p className="ruwaq-qc-card-body">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
