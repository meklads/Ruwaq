"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  markLeadMatchResponded,
  markLeadMatchesViewed,
} from "@/modules/marketplace/server/contractor-lead-tracking.actions";
import { buildWhatsAppUrl } from "@/modules/marketplace/lib/lead-phone";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

export type ContractorInboxLeadItem = {
  matchId: string;
  rank: number;
  referenceCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
  projectDetails: string;
  budgetRange: string | null;
  cityLabel: string;
  categoryLabel: string;
  submittedLabel: string;
  viewedAt: string | null;
  respondedAt: string | null;
};

type Props = {
  copy: Messages["marketplace"]["contractorInbox"];
  locale: Locale;
  userId: string;
  userEmail: string | null;
  leads: ContractorInboxLeadItem[];
};

export function ContractorLeadInbox({
  copy,
  locale,
  userId,
  userEmail,
  leads,
}: Props) {
  useEffect(() => {
    const matchIds = leads.filter((l) => !l.viewedAt).map((l) => l.matchId);
    if (matchIds.length === 0) return;
    void markLeadMatchesViewed(userId, userEmail, matchIds);
  }, [leads, userEmail, userId]);

  const onRespond = (matchId: string, channel: "whatsapp" | "email") => {
    void markLeadMatchResponded(userId, userEmail, matchId, channel);
  };

  if (leads.length === 0) {
    return (
      <div className="rounded border border-dashed border-ruwaq-stone bg-ruwaq-paper/40 p-10 text-center">
        <p className="text-sm text-ruwaq-ink-soft">{copy.empty}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {leads.map((lead) => {
        const whatsAppUrl = buildWhatsAppUrl(
          lead.clientPhone,
          locale === "ar"
            ? `مرحباً ${lead.clientName}، تواصلت معكم عبر رواق بخصوص طلب ${lead.referenceCode}.`
            : `Hello ${lead.clientName}, I'm reaching out via Ruwaq about request ${lead.referenceCode}.`
        );

        return (
          <article
            key={lead.matchId}
            className="rounded border border-ruwaq-stone bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                    #{lead.rank}
                  </span>
                  <span className="font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                    {copy.referenceLabel}: {lead.referenceCode}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-ruwaq-ink">{lead.clientName}</h2>
                <p className="mt-1 text-sm text-ruwaq-ink-soft">
                  {lead.categoryLabel} · {lead.cityLabel} · {lead.submittedLabel}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {copy.matchedBadge}
                </span>
                {lead.respondedAt ? (
                  <span className="text-xs font-medium text-sky-700">{copy.respondedBadge}</span>
                ) : lead.viewedAt ? (
                  <span className="text-xs font-medium text-amber-700">{copy.viewedBadge}</span>
                ) : (
                  <span className="text-xs font-medium text-neutral-500">{copy.pendingBadge}</span>
                )}
              </div>
            </div>

            {lead.budgetRange ? (
              <p className="mt-4 text-sm">
                <span className="text-ruwaq-ink-muted">{copy.budgetLabel}: </span>
                {lead.budgetRange}
              </p>
            ) : null}

            <p className="mt-4 rounded bg-ruwaq-paper p-4 text-sm leading-relaxed text-ruwaq-ink-soft">
              {lead.projectDetails}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/proposals/new?matchId=${encodeURIComponent(lead.matchId)}`}
                className="ruwaq-pro-btn-solid px-5 py-2.5 text-sm"
              >
                {copy.createProposalCta}
              </Link>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onRespond(lead.matchId, "whatsapp")}
                className="inline-flex items-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                {copy.whatsAppCta}
              </a>
              {lead.clientEmail ? (
                <a
                  href={`mailto:${lead.clientEmail}`}
                  onClick={() => onRespond(lead.matchId, "email")}
                  className="btn-ruwaq-secondary px-5 py-2.5 text-sm"
                >
                  {copy.emailCta}
                </a>
              ) : null}
            </div>

            <p className="mt-4 font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
              {lead.clientPhone}
            </p>
          </article>
        );
      })}
    </div>
  );
}
