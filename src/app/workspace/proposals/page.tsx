import Link from "next/link";
import { listProposalsQuery } from "@/modules/proposal/server/proposal.queries";
import {
  PROPOSAL_LIST_GROUP_ORDER,
  type ProposalListGroup,
} from "@/modules/proposal/lib/proposal-list.utils";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { formatDate } from "@/shared/lib/format";
import { ProposalListActions } from "@/modules/proposal/components/proposal-list-actions";
import { AppPageHero } from "@/shared/components/app-page-hero";

export const dynamic = "force-dynamic";

function statusBadgeClass(status: string): string {
  if (status === "exported") return "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80";
  if (status === "review" || status === "reviewed") {
    return "bg-amber-50 text-amber-900 ring-1 ring-amber-200/80";
  }
  if (status === "generating") return "bg-blue-50 text-blue-800 ring-1 ring-blue-200/80";
  return "bg-ruwaq-linen text-ruwaq-ink-muted ring-1 ring-ruwaq-stone/60";
}

export default async function ProposalsListPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const isAr = locale === "ar";
  const proposals = await listProposalsQuery();

  const statusLabels: Record<string, string> = {
    draft: t.list.status.draft,
    generating: t.list.status.generating,
    review: t.list.status.review,
    reviewed: t.list.status.reviewed,
    exported: t.list.status.exported,
  };

  const groupLabels: Record<ProposalListGroup, string> = {
    review: t.list.groups.review,
    draft: t.list.groups.draft,
    published: t.list.groups.published,
  };

  const groupEmpty: Record<ProposalListGroup, string> = {
    review: t.list.groupEmpty.review,
    draft: t.list.groupEmpty.draft,
    published: t.list.groupEmpty.published,
  };

  const grouped = PROPOSAL_LIST_GROUP_ORDER.reduce(
    (acc, group) => {
      acc[group] = proposals.filter((p) => p.group === group);
      return acc;
    },
    {} as Record<ProposalListGroup, typeof proposals>
  );

  return (
    <>
      <AppPageHero
        eyebrow={t.nav.myProposals}
        title={t.list.title}
        subtitle={t.list.subtitle}
      >
        <Link href="/proposals/new" className="btn-ruwaq-primary w-full sm:w-auto">
          {t.list.new}
        </Link>
      </AppPageHero>

      <div className="app-content-area max-w-3xl">
        {proposals.length === 0 ? (
          <div className="ruwaq-form-card border-dashed text-center">
            <p className="text-ruwaq-ink-muted">{t.list.empty}</p>
            <Link
              href="/proposals/new"
              className="btn-ruwaq-secondary mt-4 inline-flex"
            >
              {t.list.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {PROPOSAL_LIST_GROUP_ORDER.map((group) => {
              const items = grouped[group];
              return (
                <section key={group} aria-labelledby={`group-${group}`}>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      id={`group-${group}`}
                      className={`text-sm font-bold text-ruwaq-ink ${
                        isAr
                          ? "tracking-normal"
                          : "uppercase tracking-wide"
                      }`}
                    >
                      {groupLabels[group]}
                    </h2>
                    <span className="text-xs font-medium text-ruwaq-ink-muted">
                      {t.list.proposalCount(items.length)}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-ruwaq-stone/60 bg-ruwaq-linen/50 px-5 py-4 text-sm leading-relaxed text-ruwaq-navy-soft">
                      {groupEmpty[group]}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {items.map((p) => {
                        const showGateProgress =
                          group === "review" && p.gateProgress.total > 0;
                        const gatesComplete =
                          p.gateProgress.confirmed >= p.gateProgress.total;

                        return (
                          <div
                            key={p.id}
                            className="rounded-3xl border border-ruwaq-stone/50 bg-white/90 p-5 shadow-ruwaq transition-all hover:border-ruwaq-champagne/20 hover:shadow-ruwaq-lg sm:p-6"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <Link
                                href={`/proposals/${p.id}`}
                                className="min-w-0 flex-1"
                              >
                                <p className="font-semibold leading-snug text-ruwaq-ink">
                                  {p.projectName || t.list.untitled}
                                </p>
                                <p className="mt-1 text-xs text-ruwaq-navy-soft">
                                  {p.clientName}
                                  <span className="mx-1.5 opacity-40">·</span>
                                  {formatDate(
                                    p.updatedAt.toISOString(),
                                    locale
                                  )}
                                </p>
                                {showGateProgress ? (
                                  <p
                                    className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                      gatesComplete
                                        ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80"
                                        : "bg-amber-50 text-amber-900 ring-1 ring-amber-200/80"
                                    }`}
                                  >
                                    {t.list.gatesProgress(
                                      p.gateProgress.confirmed,
                                      p.gateProgress.total
                                    )}
                                  </p>
                                ) : null}
                              </Link>

                              <div className="flex shrink-0 items-center gap-2 self-start sm:flex-col sm:items-end lg:flex-row lg:items-center">
                                <ProposalListActions proposalId={p.id} />
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(p.status)}`}
                                >
                                  {statusLabels[p.status] ?? p.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
