import type { ReactNode } from "react";
import type { ShareProposalView } from "@/modules/proposal/server/share.service";
import type { Messages } from "@/shared/i18n/messages/types";
import { formatSar } from "@/shared/lib/format";
import { localeToBcp47 } from "@/shared/i18n/locale";

type ShareLabels = Messages["share"];
type ReviewLabels = Messages["review"];
type ExportLabels = Messages["export"];

type Props = {
  data: ShareProposalView;
  labels: ShareLabels;
  reviewLabels: ReviewLabels;
  exportLabels: ExportLabels;
  dir: "rtl" | "ltr";
};

export function ProposalShareView({
  data,
  labels,
  reviewLabels,
  exportLabels,
  dir,
}: Props) {
  const locale = data.locale;
  const isEstimate = data.commercialMode === "estimate_only";
  const variancePct = data.estimateVariancePercent ?? 15;
  const currency = locale === "ar" ? "ريال" : "SAR";
  const watermarkDate = new Date(data.exportedAt).toLocaleDateString(
    localeToBcp47(locale),
    { year: "numeric", month: "long", day: "numeric" }
  );
  const watermarkText = `${data.clientName} · ${watermarkDate}`;
  const paymentSchedule = data.commercialTerms?.paymentSchedule ?? [];

  return (
    <div className="ruwaq-share-root" dir={dir}>
      <div className="ruwaq-share-watermark-layer" aria-hidden>
        <div className="ruwaq-share-watermark-grid">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="ruwaq-share-watermark-tile">
              {watermarkText}
            </span>
          ))}
        </div>
      </div>

      <div className="ruwaq-share-watermark-band" aria-hidden>
        <span>{watermarkText}</span>
      </div>

      <header className="ruwaq-share-header sticky top-0 z-40">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ruwaq-champagne-light">
              {labels.confidentialNotice}
            </p>
            <p className="truncate text-sm font-semibold text-ruwaq-ink">
              {data.projectName}
            </p>
          </div>
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ruwaq-primary shrink-0 text-center shadow-ruwaq-lg"
          >
            {labels.downloadOfficialPdf}
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <article className="ruwaq-share-article">
          {/* Hero banner */}
          <div className="ruwaq-share-hero">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ruwaq-champagne-light">
                  {locale === "ar" ? "عرض سعر" : "Proposal"}
                </p>
                <h1 className="mt-2 text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {data.projectName}
                </h1>
                <p className="mt-3 text-sm text-ruwaq-cream/90">
                  {exportLabels.preparedFor}{" "}
                  <span className="font-semibold text-white">
                    {data.clientName}
                  </span>
                </p>
                {data.proposalNumber && (
                  <p className="mt-1 text-xs text-ruwaq-cream/70">
                    {exportLabels.proposalNumber} {data.proposalNumber}
                  </p>
                )}
              </div>
              {data.company?.logoUrl ? (
                <div className="shrink-0 rounded-xl bg-white px-4 py-3 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.company.logoUrl}
                    alt=""
                    className="max-h-14 max-w-[140px] object-contain"
                  />
                </div>
              ) : data.company?.companyName ? (
                <p className="text-lg font-bold text-ruwaq-cream">
                  {data.company.companyName}
                </p>
              ) : null}
            </div>
            <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-ruwaq-gold to-transparent" />
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-8">
            {/* Meta strip */}
            <div className="grid gap-3 rounded-xl border border-ruwaq-cream bg-ruwaq-cream-bg/60 p-4 text-sm sm:grid-cols-2">
              <div>
                <span className="text-ruwaq-ink-soft">{exportLabels.date}</span>{" "}
                <strong className="text-ruwaq-ink">{watermarkDate}</strong>
              </div>
              {data.company?.companyName && (
                <div>
                  <span className="text-ruwaq-ink-soft">
                    {exportLabels.preparedBy}
                  </span>{" "}
                  <strong className="text-ruwaq-ink">
                    {data.company.companyName}
                  </strong>
                </div>
              )}
            </div>

            {data.introduction && (
              <section>
                <p className="rounded-xl border border-ruwaq-cream bg-ruwaq-cream-bg/50 px-4 py-4 text-sm leading-relaxed text-ruwaq-ink-soft">
                  {data.introduction}
                </p>
              </section>
            )}

            {/* Scope */}
            {data.scopeItems.length > 0 && (
              <ShareSection title={exportLabels.scopeOfWork}>
                <div className="space-y-3">
                  {data.scopeItems.map((item, i) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-ruwaq-cream bg-ruwaq-cream-bg/40 px-4 py-3"
                    >
                      <h3 className="text-sm font-bold text-ruwaq-ink">
                        {i + 1}. {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ruwaq-ink-soft">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ShareSection>
            )}

            {/* Deliverables */}
            {data.deliverables.length > 0 && (
              <ShareSection title={exportLabels.deliverables}>
                <ul className="space-y-2">
                  {data.deliverables.map((d) => (
                    <li
                      key={d.id}
                      className="flex gap-3 rounded-lg border border-ruwaq-cream px-4 py-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ruwaq-gold" />
                      <div>
                        <p className="text-sm font-semibold text-ruwaq-ink">
                          {d.name}
                        </p>
                        <p className="mt-0.5 text-xs text-ruwaq-ink-soft">
                          {d.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ShareSection>
            )}

            {/* Commercial + BOQ */}
            <ShareSection title={exportLabels.commercialTerms}>
              {isEstimate && (
                <div className="ruwaq-estimate-callout mb-4">
                  {reviewLabels.boq.estimateDisclaimerTop(variancePct)}
                </div>
              )}
              <div className="inline-block rounded-xl bg-ruwaq-navy px-5 py-3 text-lg font-bold text-white">
                {exportLabels.total}{" "}
                {formatSar(data.budget, locale)} {currency}
              </div>

              {paymentSchedule.length > 0 && (
                <div className="ruwaq-trust-table-wrap mt-4">
                  <table className="ruwaq-trust-table">
                    <thead>
                      <tr>
                        <th className="text-start">{exportLabels.milestone}</th>
                        <th className="text-center">{exportLabels.percentage}</th>
                        <th className="text-end">{exportLabels.amount}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentSchedule.map((m, i) => (
                        <tr key={i}>
                          <td>{m.label}</td>
                          <td className="text-center tabular-nums">
                            {m.percentage}%
                          </td>
                          <td className="text-end tabular-nums font-semibold">
                            {formatSar(m.amount, locale)} {currency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {data.boqLines.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-bold text-ruwaq-ink">
                    {reviewLabels.boq.title}
                  </h3>
                  <div className="ruwaq-trust-table-wrap">
                    <table className="ruwaq-trust-table">
                      <thead>
                        <tr>
                          <th className="text-start">
                            {reviewLabels.boq.lineItem}
                          </th>
                          <th className="text-center">
                            {reviewLabels.percentage}
                          </th>
                          <th className="text-end">{reviewLabels.amount}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.boqLines.map((line, i) => (
                          <tr key={i}>
                            <td className="font-medium">
                              {line.label}
                              {line.isEstimated && isEstimate && (
                                <span className="ruwaq-badge-estimate ms-2">
                                  {reviewLabels.boq.estimateBadge}
                                </span>
                              )}
                            </td>
                            <td className="text-center tabular-nums">
                              {Number(line.percent ?? 0).toFixed(1)}%
                            </td>
                            <td className="text-end tabular-nums font-semibold">
                              {formatSar(line.amount, locale)} {currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {isEstimate && (
                    <p className="ruwaq-estimate-footnote mt-3">
                      {reviewLabels.boq.estimateDisclaimerBottom(variancePct)}
                    </p>
                  )}
                </div>
              )}
            </ShareSection>

            {/* Timeline */}
            {data.timeline && (
              <ShareSection title={exportLabels.timeline}>
                <p className="text-sm text-ruwaq-ink">
                  {exportLabels.duration}{" "}
                  <strong>{data.timeline.duration}</strong>
                </p>
              </ShareSection>
            )}

            {/* Clause pack */}
            {data.clauseItems.length > 0 && (
              <ShareSection title={reviewLabels.clauses.title}>
                <p className="mb-4 text-xs text-ruwaq-ink-soft">
                  {data.clausePackName}
                  {data.clausePackVersion
                    ? ` · v${data.clausePackVersion}`
                    : ""}
                  {" · "}
                  {reviewLabels.clauses.approvedCount(data.clauseItems.length)}
                </p>
                <div className="space-y-3">
                  {data.clauseItems.map((clause, i) => (
                    <div
                      key={i}
                      className="ruwaq-clause-card ruwaq-clause-card--mandatory"
                    >
                      <div className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruwaq-navy text-[11px] font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wide text-ruwaq-champagne-light">
                            {clause.categoryLabel}
                          </span>
                        </div>
                        <p className="ruwaq-clause-text mt-3">{clause.text}</p>
                        {clause.sourceRef && (
                          <p className="mt-2 text-[10px] font-medium text-ruwaq-ink-soft/70">
                            {reviewLabels.clauses.source}: {clause.sourceRef}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-lg border border-ruwaq-cream bg-ruwaq-cream-bg/50 px-4 py-3 text-[11px] leading-relaxed text-ruwaq-ink-soft">
                  {reviewLabels.clauses.legalDisclaimer}
                </p>
              </ShareSection>
            )}
          </div>

          {/* Footer */}
          <footer className="border-t border-ruwaq-cream bg-ruwaq-cream-bg/50 px-6 py-6 sm:px-8">
            {data.company && (
              <div className="text-sm text-ruwaq-ink-soft">
                {data.company.companyName && (
                  <p className="font-semibold text-ruwaq-ink">
                    {data.company.companyName}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {data.company.crNumber && (
                    <span>
                      {exportLabels.crNumber} {data.company.crNumber}
                    </span>
                  )}
                  {data.company.vatNumber && (
                    <span>
                      {exportLabels.vatNumber} {data.company.vatNumber}
                    </span>
                  )}
                  {data.company.phone && (
                    <span>
                      {exportLabels.phone} {data.company.phone}
                    </span>
                  )}
                </div>
              </div>
            )}
            <p className="mt-4 text-[10px] text-ruwaq-ink-soft/60">
              {labels.poweredBy}
            </p>
          </footer>
        </article>

        <div className="mt-6 text-center sm:hidden">
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ruwaq-primary inline-flex w-full justify-center"
          >
            {labels.downloadOfficialPdf}
          </a>
        </div>
      </main>
    </div>
  );
}

function ShareSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 border-b-2 border-ruwaq-gold pb-2 text-base font-bold text-ruwaq-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
