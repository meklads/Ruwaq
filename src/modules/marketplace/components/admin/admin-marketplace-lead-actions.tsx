"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { MarketplaceLeadStatus } from "@prisma/client";
import {
  updateMarketplaceLeadStatus,
  type AdminLeadActionResult,
} from "@/modules/marketplace/server/admin-leads.actions";
import {
  buildAdminLeadOutreachMessage,
  whatsAppLinkForClient,
} from "@/modules/marketplace/lib/admin-lead-outreach";
import type { Locale } from "@/shared/i18n/locale";

const STATUSES: MarketplaceLeadStatus[] = [
  "NEW",
  "ASSIGNED_TO_TURRIVA",
  "BROADCASTED_TO_PARTNERS",
  "CLOSED",
];

const ERROR_LABELS: Record<string, string> = {
  unauthorized: "Sign in as admin.",
  not_found: "Lead not found.",
  validation: "Invalid status.",
  server: "Update failed.",
};

type Props = {
  leadId: string;
  status: MarketplaceLeadStatus;
  clientPhone: string;
  clientName: string;
  referenceCode: string;
  categoryLabel: string;
  locale: Locale;
};

export function AdminMarketplaceLeadActions({
  leadId,
  status,
  clientPhone,
  clientName,
  referenceCode,
  categoryLabel,
  locale,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [error, setError] = useState<string | null>(null);

  const whatsAppUrl = whatsAppLinkForClient(
    clientPhone,
    buildAdminLeadOutreachMessage({
      locale,
      referenceCode,
      clientName,
      categoryLabel,
    })
  );

  const onStatusChange = (next: MarketplaceLeadStatus) => {
    setError(null);
    setCurrentStatus(next);
    startTransition(async () => {
      const result: AdminLeadActionResult = await updateMarketplaceLeadStatus({
        leadId,
        status: next,
      });
      if (!result.success) {
        setCurrentStatus(status);
        setError(ERROR_LABELS[result.error] ?? "Update failed.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="rounded border border-ruwaq-stone bg-white px-2 py-1.5 text-xs"
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value as MarketplaceLeadStatus)}
          disabled={pending}
          aria-label="Lead status"
        >
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1fb855]"
        >
          WhatsApp
        </a>
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
