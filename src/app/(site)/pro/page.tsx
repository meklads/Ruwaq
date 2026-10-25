import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { CardIcon, CONTRACTOR_ICONS } from "@/modules/ruwaq/icons";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).contractors;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/pro` } };
}

/** Contractor door — «شبكة رواق». No public directory until real, vetted members exist. */
export default async function ContractorsPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).contractors;
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
            <Link href="/join" className="rw-btn rw-btn--gold">
              {c.primaryCta}
            </Link>
            <Link href="/proposals" className="rw-btn rw-btn--outline-light">
              {c.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.whyTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--4">
            {c.why.map((w, i) => (
              <article key={w.title} className="rw-card">
                <CardIcon icon={CONTRACTOR_ICONS[i]} />
                <h3 className="rw-h3">{w.title}</h3>
                <p className="rw-body">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap rw-split">
          <div>
            <div className="rw-head">
              <h2 className="rw-h2">{c.criteriaTitle}</h2>
            </div>
            <ol className="rw-steps">
              {c.criteria.map((item, i) => (
                <li key={item}>
                  <span className="rw-steps__n">{n(i)}</span>
                  <p className="rw-body" style={{ color: "var(--rw-ink)", paddingBlockStart: "0.35rem" }}>
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <article className="rw-card">
              <h3 className="rw-h3">{c.rankingTitle}</h3>
              <p className="rw-body">{c.ranking}</p>
            </article>
            <article className="rw-card">
              <h3 className="rw-h3">{c.statusTitle}</h3>
              <p className="rw-body">{c.status}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.feesTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--3">
            {c.fees.map((f) => (
              <article key={f.title} className="rw-card">
                <h3 className="rw-h3">{f.title}</h3>
                <p className="rw-body">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-door">
            <div>
              <h2 className="rw-h2">{c.nasaqTitle}</h2>
              <p>{c.nasaqBody}</p>
              <div className="rw-actions">
                <Link href="/proposals" className="rw-btn rw-btn--gold">
                  {c.nasaqCta}
                </Link>
                <Link href="/pricing" className="rw-btn rw-btn--outline-light">
                  {c.nasaqPricing}
                </Link>
              </div>
            </div>
            <ul className="rw-door__points">
              <li>{locale === "ar" ? "جدول كميات وضريبة القيمة المضافة" : "BOQ and VAT"}</li>
              <li>{locale === "ar" ? "افتراضات واستثناءات تحمي الطرفين" : "Assumptions and exclusions"}</li>
              <li>{locale === "ar" ? "رابط يتابع قراءة العميل وموافقته" : "A link that tracks client review and approval"}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
