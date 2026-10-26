import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).faq;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/faq` } };
}

export default async function FaqPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).faq;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...c.owners, ...c.contractors].map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  const groups = [
    { id: "owners", title: c.ownersTitle, items: c.owners },
    { id: "contractors", title: c.contractorsTitle, items: c.contractors },
  ];

  return (
    <div className="rw">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "44rem" }}>
            {c.title}
          </h1>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section key={g.id} id={g.id} className={`rw-section ${gi === 1 ? "rw-section--stone" : ""}`}>
          <div className="rw-wrap rw-split" style={{ alignItems: "start" }}>
            <h2 className="rw-h2">{g.title}</h2>
            <div className="rw-faq">
              {g.items.map((i) => (
                <details key={i.q}>
                  <summary>{i.q}</summary>
                  <p>{i.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head-row" style={{ marginBlockEnd: 0 }}>
            <div className="rw-head">
              <h2 className="rw-h2">{c.ctaTitle}</h2>
              <p className="rw-body">{c.ctaBody}</p>
            </div>
            <div className="rw-actions" style={{ marginBlockStart: 0 }}>
              <Link href="/contact" className="rw-btn rw-btn--primary">
                {c.ctaPrimary}
              </Link>
              <Link href="/charter" className="rw-btn rw-btn--outline">
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
