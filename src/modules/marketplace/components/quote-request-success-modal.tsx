"use client";

import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import { quoteStatusPath } from "@/modules/marketplace/lib/quote-status";

type Props = {
  copy: Messages["marketplace"]["quote"]["successModal"];
  locale: Locale;
  referenceCode: string;
  leadId: string;
  whatsAppUrl: string | null;
  onClose?: () => void;
  variant?: "inline" | "overlay";
};

export function QuoteRequestSuccessModal({
  copy,
  locale,
  referenceCode,
  leadId,
  whatsAppUrl,
  onClose,
  variant = "inline",
}: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  const panel = (
    <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/90 to-white px-6 py-8 text-center shadow-ruwaq sm:px-8 sm:py-10">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700"
        aria-hidden
      >
        ✓
      </div>
      <h2 className="mt-5 text-xl font-bold text-ruwaq-ink">{copy.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ruwaq-ink-soft">{copy.subtitle}</p>
      <p className="mt-4 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ruwaq-ink-muted ring-1 ring-emerald-200/80">
        {copy.referenceLabel}: <span className="ms-1 font-mono text-ruwaq-ink">{referenceCode}</span>
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href={quoteStatusPath(leadId)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800"
        >
          {copy.statusCta} {arrow}
        </Link>
        {whatsAppUrl ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105"
          >
            {copy.whatsAppCta} {arrow}
          </a>
        ) : null}
        {onClose ? (
          <button type="button" onClick={onClose} className="btn-ruwaq-secondary px-6 py-3.5">
            {copy.close}
          </button>
        ) : (
          <Link href="/how-we-match" className="btn-ruwaq-secondary px-6 py-3.5">
            {copy.browseCategories}
          </Link>
        )}
      </div>
      {!whatsAppUrl ? (
        <p className="mt-4 text-xs text-ruwaq-ink-muted">{copy.noWhatsAppHint}</p>
      ) : null}
    </div>
  );

  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md">{panel}</div>
      </div>
    );
  }

  return panel;
}
