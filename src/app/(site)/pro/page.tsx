import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).contractors;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/pro` },
  };
}

/**
 * Contractor door — «شبكة رواق».
 * The public directory stays hidden until real, vetted members exist.
 */
export default async function ContractorsPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).contractors;
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero rw-page-hero--ink">
        <div className="rw-wrap">
          <p className="rw-eyebrow">{c.eyebrow}</p>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
          <div className="rw-hero__actions">
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
          <h2 className="rw-h2">{c.whyTitle}</h2>
          <dl className="rw-rows">
            {c.why.map((w) => (
              <div key={w.title}>
                <dt>{w.title}</dt>
                <dd>{w.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap rw-split rw-split--even">
          <div>
            <h2 className="rw-h2">{c.criteriaTitle}</h2>
            <ol className="rw-process">
              {c.criteria.map((item, i) => (
                <li key={item}>
                  <span className="rw-process__n">{n(i)}</span>
                  <p className="rw-body" style={{ color: "var(--rw-ink)", alignSelf: "center" }}>
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="rw-h2">{c.rankingTitle}</h2>
            <p className="rw-body" style={{ marginBlockStart: "1.25rem", fontSize: "1.075rem" }}>
              {c.ranking}
            </p>
            <div className="rw-callout" style={{ marginBlockStart: "2rem", background: "#fff" }}>
              <h3 className="rw-h3">{c.statusTitle}</h3>
              <p className="rw-body">{c.status}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <h2 className="rw-h2">{c.feesTitle}</h2>
          <dl className="rw-rows">
            {c.fees.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rw-section" style={{ paddingBlockStart: 0 }}>
        <div className="rw-wrap">
          <div className="rw-door">
            <div>
              <h2 className="rw-h2">{c.nasaqTitle}</h2>
              <p>{c.nasaqBody}</p>
              <div className="rw-door__actions">
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
