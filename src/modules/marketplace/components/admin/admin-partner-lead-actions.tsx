"use client";

import {
  buildAdminPartnerLeadOutreachMessage,
  whatsAppLinkForClient,
} from "@/modules/marketplace/lib/admin-lead-outreach";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  clientPhone: string;
  clientName: string;
  projectType: string;
  locale: Locale;
};

export function AdminPartnerLeadActions({
  clientPhone,
  clientName,
  projectType,
  locale,
}: Props) {
  const whatsAppUrl = whatsAppLinkForClient(
    clientPhone,
    buildAdminPartnerLeadOutreachMessage({ locale, clientName, projectType })
  );

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1fb855]"
    >
      WhatsApp
    </a>
  );
}
