"use client";

import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["contractorPromo"];
  locale: Locale;
};

export function ContractorPromoBanner({ copy, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <section
      id="contractor-promo"
      className="ruwaq-contractor-zone scroll-mt-28 px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="contractor-promo-title"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-ruwaq-stone/50 bg-white shadow-ruwaq-lg ring-1 ring-ruwaq-gold/15">
        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="border-b border-ruwaq-stone/40 p-8 sm:p-10 lg:border-b-0 lg:border-e">
            <p className="ruwaq-eyebrow">{copy.eyebrow}</p>
            <h2 id="contractor-promo-title" className="ruwaq-section-title mt-3 text-start text-2xl sm:text-[1.85rem]">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ruwaq-ink-soft">{copy.subtitle}</p>
            <ul className="mt-6 space-y-2 text-sm text-ruwaq-ink-soft">
              {copy.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-ruwaq-gold" aria-hidden>
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/proposals" className="btn-ruwaq-primary mt-8 inline-flex px-8 py-3.5">
              {copy.cta} {arrow}
            </Link>
          </div>
          <div className="bg-gradient-to-br from-ruwaq-linen to-white p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-ruwaq-ink-muted">
              {copy.previewLabel}
            </p>
            <div className="mt-4 space-y-3 rounded-2xl border border-ruwaq-stone/60 bg-white p-5 shadow-sm">
              <div className="h-2 w-24 rounded-full bg-ruwaq-gold/30" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-ruwaq-stone/50" />
                <div className="h-3 w-[85%] rounded bg-ruwaq-stone/40" />
                <div className="h-3 w-[70%] rounded bg-ruwaq-stone/30" />
              </div>
              <div className="flex gap-2 pt-2">
                <span className="rounded-full bg-[#0f2c59] px-3 py-1 text-[10px] font-semibold text-white">
                  {copy.previewPill}
                </span>
                <span className="rounded-full border border-ruwaq-gold/40 px-3 py-1 text-[10px] font-semibold text-ruwaq-gold">
                  PDF
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-ruwaq-ink-muted">{copy.previewNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
