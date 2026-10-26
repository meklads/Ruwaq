import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { PrintButton } from "@/modules/ruwaq/print-button";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).sample;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/check/sample` } };
}

function Table({ cols, rows, numLast = false }: { cols: string[]; rows: string[][]; numLast?: boolean }) {
  return (
    <div className="rw-table-wrap">
      <table className="rw-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (
                <td key={i} className={numLast && i === r.length - 1 ? "rw-num" : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function SampleReportPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).sample;
  const ar = locale === "ar";
  const sec = (i: number) => (i).toLocaleString(ar ? "ar-SA" : "en-US");

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

      <section className="rw-doc-stage">
        <div className="rw-wrap">
          <article className="rw-doc" aria-label={c.reportTitle}>
            <div className="rw-doc__top">
              <span className="rw-doc__brand">{ar ? "رواق" : "Ruwaq"}</span>
              <span className="rw-doc__flag">{c.disclaimer}</span>
            </div>
            <span className="rw-stamp" aria-hidden="true">
              {ar ? "رُوجع" : "Checked"}
            </span>

            <h2 className="rw-doc__title">{c.reportTitle}</h2>
            <dl className="rw-doc__meta">
              {c.meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(1)}</span>
                {c.verdictTitle}
              </h3>
              <div className="rw-verdict">
                <strong>{c.verdict}</strong>
                <p>{c.verdictBody}</p>
              </div>
              <dl className="rw-tally">
                {c.summary.map((s) => (
                  <div key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(2)}</span>
                {c.priceTitle}
              </h3>
              <p className="rw-body">{c.priceBody}</p>
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(3)}</span>
                {c.missingTitle}
              </h3>
              <Table cols={c.missingCols} rows={c.missing} numLast />
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(4)}</span>
                {c.vagueTitle}
              </h3>
              <Table cols={c.vagueCols} rows={c.vague} />
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(5)}</span>
                {c.termsTitle}
              </h3>
              <Table cols={c.termsCols} rows={c.terms} />
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(6)}</span>
                {c.questionsTitle}
              </h3>
              <ol className="rw-qlist">
                {c.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </div>

            <div className="rw-doc__section">
              <h3 className="rw-doc__h">
                <span>{sec(7)}</span>
                {c.recommendationTitle}
              </h3>
              <p className="rw-body">{c.recommendation}</p>
            </div>

            <div className="rw-doc__sign">
              <span>{c.reviewedBy}</span>
              <span>{c.disclaimer}</span>
            </div>
          </article>

          <div className="rw-doc-actions rw-no-print">
            <PrintButton label={c.print} event="sample_report_print" />
            <Link href="/check" className="rw-link">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="rw-section rw-no-print">
        <div className="rw-wrap">
          <div className="rw-head-row" style={{ marginBlockEnd: 0 }}>
            <div className="rw-head">
              <h2 className="rw-h2">{c.ctaTitle}</h2>
            </div>
            <Link href="/check" className="rw-btn rw-btn--primary">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
