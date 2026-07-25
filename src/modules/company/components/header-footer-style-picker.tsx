"use client";

import { useMemo } from "react";
import { useT, useLocale } from "@/shared/i18n/context";
import {
  HEADER_FOOTER_STYLE_ORDER,
  HEADER_FOOTER_STYLES,
  buildHeaderFooterPreviewHtml,
  isPremiumHeaderFooterStyle,
  type HeaderFooterStyleId,
} from "@/modules/proposal/export/header-footer-styles";

interface Props {
  value: string;
  onChange: (id: HeaderFooterStyleId) => void;
  companyName: string;
  logoUrl: string;
  /** During the free trial (billingEnabled=false) everything is unlocked. */
  isPaid: boolean;
  onRequestUpgrade: () => void;
}

export function HeaderFooterStylePicker({
  value,
  onChange,
  companyName,
  logoUrl,
  isPaid,
  onRequestUpgrade,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const previewHtml = useMemo(
    () =>
      buildHeaderFooterPreviewHtml({
        styleId: value,
        companyName,
        logoUrl,
        dir,
        badgeLabel: t.company.headerFooter.previewBadge,
        companyFallback: t.company.headerFooter.previewCompanyFallback,
      }),
    [value, companyName, logoUrl, dir, t]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-ruwaq-ink">
        {t.company.headerFooter.title}
      </label>
      <p className="mt-1 text-xs text-ruwaq-ink-muted">{t.company.headerFooter.hint}</p>

      {/* Live preview */}
      <div className="mt-3 overflow-hidden rounded-xl border border-ruwaq-stone/70 shadow-sm">
        <iframe
          key={value}
          title="header-footer-preview"
          srcDoc={previewHtml}
          className="h-[150px] w-full border-0"
          scrolling="no"
        />
      </div>

      {/* Swatch grid */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {HEADER_FOOTER_STYLE_ORDER.map((id) => {
          const style = HEADER_FOOTER_STYLES[id];
          const selected = value === id;
          const locked = !isPaid && isPremiumHeaderFooterStyle(id);
          const name = locale === "ar" ? style.nameAr : style.nameEn;
          return (
            <button
              key={id}
              type="button"
              onClick={() => (locked ? onRequestUpgrade() : onChange(id))}
              className={`group relative flex flex-col items-center gap-1.5 rounded-lg border p-2 text-center transition-colors ${
                selected
                  ? "border-ruwaq-gold ring-2 ring-ruwaq-gold/30"
                  : "border-ruwaq-stone/60 hover:border-ruwaq-stone"
              }`}
            >
              {locked && (
                <span className="absolute end-1 top-1 rounded-full bg-ruwaq-navy/85 p-1 text-white">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-2.5 w-2.5">
                    <path
                      fillRule="evenodd"
                      d="M10 1a4 4 0 00-4 4v2H5a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm2 6V5a2 2 0 10-4 0v2h4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              <span
                className={`block h-8 w-full rounded-md ${locked ? "opacity-60" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${style.swatch[0]} 55%, ${style.swatch[1]} 55%)`,
                }}
              />
              <span className="text-[11px] font-medium leading-tight text-ruwaq-ink">
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
