"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HEADER_FOOTER_STYLE_ORDER,
  HEADER_FOOTER_STYLES,
  isPremiumHeaderFooterStyle,
  type HeaderFooterStyleId,
} from "@/modules/proposal/export/header-footer-styles";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
  title: string;
  subtitle: string;
  selectCta: string;
  premiumBadge: string;
  premiumNote: string;
  openInNewTab: string;
};

/**
 * Interactive 30/70 template chooser: a compact style list on one side, a
 * full live proposal preview (real header + real sample body + real
 * footer) on the other — same HTML the exported PDF uses, rendered via
 * `/api/templates/samples/ruwaq-classic`, so nothing here can drift from
 * what a visitor actually gets. Selecting a style and clicking the CTA
 * carries the choice (via `/style/[id]` → cookie) straight into Company
 * Settings, pre-applied the moment the visitor signs in.
 */
export function HeaderFooterShowcase({
  locale,
  title,
  subtitle,
  selectCta,
  premiumBadge,
  premiumNote,
  openInNewTab,
}: Props) {
  const [selected, setSelected] = useState<HeaderFooterStyleId>("gold_classic");
  const style = HEADER_FOOTER_STYLES[selected];
  const name = locale === "ar" ? style.nameAr : style.nameEn;
  const locked = isPremiumHeaderFooterStyle(selected);

  const previewSrc = useMemo(
    () => `/api/templates/samples/ruwaq-classic?locale=${locale}&hf=${selected}`,
    [locale, selected]
  );

  return (
    <section className="mt-16">
      <h2 className="text-center font-display text-xl font-bold text-ruwaq-navy sm:text-2xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ruwaq-ink-soft">
        {subtitle}
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row">
        {/* 30% — style list */}
        <div className="lg:w-[30%] lg:shrink-0">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {HEADER_FOOTER_STYLE_ORDER.map((id) => {
              const s = HEADER_FOOTER_STYLES[id];
              const n = locale === "ar" ? s.nameAr : s.nameEn;
              const isSelected = id === selected;
              const isLocked = isPremiumHeaderFooterStyle(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  className={`flex items-center gap-2.5 rounded-lg border p-2 text-start transition-colors lg:w-full ${
                    isSelected
                      ? "border-ruwaq-gold bg-ruwaq-gold/5 ring-1 ring-ruwaq-gold/30"
                      : "border-ruwaq-stone/60 hover:border-ruwaq-stone"
                  }`}
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-md"
                    style={{
                      background: `linear-gradient(135deg, ${s.swatch[0]} 55%, ${s.swatch[1]} 55%)`,
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-ruwaq-ink">
                      {n}
                    </span>
                    {isLocked && (
                      <span className="mt-0.5 inline-block rounded-full bg-ruwaq-navy/10 px-1.5 py-0.5 text-[9px] font-semibold text-ruwaq-navy">
                        {premiumBadge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-ruwaq-ink-muted">
            {premiumNote}
          </p>
        </div>

        {/* 70% — live full-proposal preview */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl border border-b-0 border-ruwaq-stone/60 bg-white px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ruwaq-ink">{name}</span>
              {locked && (
                <span className="rounded-full bg-ruwaq-navy/10 px-2 py-0.5 text-[10px] font-semibold text-ruwaq-navy">
                  {premiumBadge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={previewSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-ruwaq-ink-soft underline-offset-2 hover:underline"
              >
                {openInNewTab}
              </a>
              <Link href={`/style/${selected}`} className="btn-ruwaq-header-gold px-4 py-1.5 text-xs">
                {selectCta}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-ruwaq-stone/60 shadow-sm">
            <iframe
              key={previewSrc}
              title={name}
              src={previewSrc}
              className="h-[560px] w-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
