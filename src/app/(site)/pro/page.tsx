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
 * The public directory is intentionally hidden until real, vetted members exist.
 */
export default async function ContractorsPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).contractors;

  return (
    <div className="ruwaq-qc">
      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap">
          <p className="ruwaq-qc-eyebrow">{c.eyebrow}</p>
          <h1 className="ruwaq-qc-title">{c.title}</h1>
          <p className="ruwaq-qc-lead">{c.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/join" className="ruwaq-pro-btn-solid bg-[#c9a063] px-8 py-3.5 text-neutral-950 hover:bg-[#d4b47a]">
              {c.primaryCta}
            </Link>
            <Link href="/proposals" className="inline-flex items-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white">
              {c.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.whyTitle}</h2>
          <div className="ruwaq-qc-grid ruwaq-qc-grid--2">
            {c.why.map((w) => (
              <div key={w.title} className="ruwaq-qc-card">
                <h3 className="ruwaq-qc-card-title mt-0">{w.title}</h3>
                <p className="ruwaq-qc-card-body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-section ruwaq-qc-section--muted">
        <div className="ruwaq-qc-wrap ruwaq-qc-split">
          <div>
            <h2 className="ruwaq-qc-h2">{c.criteriaTitle}</h2>
            <ul className="ruwaq-qc-steps">
              {c.criteria.map((item, i) => (
                <li key={item}>
                  <span className="ruwaq-qc-num">{i + 1}</span>
                  <p className="ruwaq-qc-card-body mt-1">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="ruwaq-qc-h2">{c.rankingTitle}</h2>
            <p className="ruwaq-qc-card-body mt-4 text-base">{c.ranking}</p>
            <div className="ruwaq-net-status mt-8">
              <h3 className="ruwaq-qc-card-title mt-0">{c.networkStatusTitle}</h3>
              <p className="ruwaq-qc-card-body">{c.networkStatus}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-section">
        <div className="ruwaq-qc-wrap">
          <h2 className="ruwaq-qc-h2">{c.feesTitle}</h2>
          <div className="ruwaq-qc-grid ruwaq-qc-grid--3">
            {c.fees.map((f) => (
              <div key={f.title} className="ruwaq-qc-card">
                <h3 className="ruwaq-qc-card-title mt-0">{f.title}</h3>
                <p className="ruwaq-qc-card-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ruwaq-qc-hero ruwaq-surface-dark">
        <div className="ruwaq-qc-wrap ruwaq-qc-narrow">
          <p className="ruwaq-qc-eyebrow">{c.nasaqEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{c.nasaqTitle}</h2>
          <p className="mt-4 leading-relaxed text-white/80">{c.nasaqBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/proposals" className="ruwaq-pro-btn-solid bg-[#c9a063] px-8 py-3.5 text-neutral-950 hover:bg-[#d4b47a]">
              {c.nasaqCta}
            </Link>
            <Link href="/pricing" className="inline-flex items-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white">
              {c.nasaqPricing}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
