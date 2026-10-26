import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { TIERS, TIER_ORDER } from "@/modules/billing/lib/tiers";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).pricing;
  return { title: c.metaTitle, description: c.lead };
}

export default async function PricingPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).pricing;
  const fmt = (n: number) => n.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-grid rw-grid--3">
            {TIER_ORDER.map((id) => {
              const t = TIERS[id];
              const featured = id === "VERIFIED";
              return (
                <article key={id} className={`rw-plan ${featured ? "rw-plan--featured" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
                  <h2 className="rw-h3">{locale === "ar" ? t.nameAr : t.nameEn}</h2>
                  <p className="rw-plan__price">
                    {t.priceSar === 0 ? (
                      c.free
                    ) : (
                      <>
                        {fmt(t.priceSar)} <span className="rw-small" style={{ fontWeight: 500 }}>{c.perMonth}</span>
                      </>
                    )}
                  </p>
                  <ul style={{ flex: "1 1 auto" }}>
                    {(locale === "ar" ? t.featuresAr : t.featuresEn).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div style={{ marginBlockStart: "1.5rem" }}>
                    <Link
                      href={id === "STARTER" ? "/proposals/new" : "/contact"}
                      className={`rw-btn rw-btn--block ${featured ? "rw-btn--primary" : "rw-btn--outline"}`}
                    >
                      {id === "STARTER" ? c.start : c.upgrade}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="rw-head-row" style={{ marginBlock: "2rem 0" }}>
            <p className="rw-fineprint">{c.note}</p>
            <Link href="/proposals" className="rw-link">
              {c.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
