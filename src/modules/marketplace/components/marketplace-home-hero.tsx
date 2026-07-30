"use client";

import Link from "next/link";
import { QuoteRequestCtaButton } from "@/modules/marketplace/components/quote-request-cta-button";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["hero"];
  quoteCopy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  closeModalLabel: string;
  locale: Locale;
};

export function MarketplaceHomeHero({
  copy,
  quoteCopy,
  visualizationCopy,
  closeModalLabel,
  locale,
}: Props) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <section className="ruwaq-market-hero">
      <div className="ruwaq-market-hero-bg" aria-hidden />
      <div className="ruwaq-market-hero-inner">
        <p className="ruwaq-market-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-market-title">
          {copy.title}
          <span className="ruwaq-market-title-highlight"> {copy.titleHighlight}</span>
        </h1>
        <p className="ruwaq-market-subtitle">{copy.subtitle}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <QuoteRequestCtaButton
            triggerLabel={`${copy.ctaPrimary} ${arrow}`}
            closeLabel={closeModalLabel}
            copy={quoteCopy}
            visualizationCopy={visualizationCopy}
            locale={locale}
            className="btn-ruwaq-hero-gold px-10 py-4 text-base"
          />
          <Link href="/categories" className="ruwaq-market-btn-outline">
            {copy.ctaSecondary}
          </Link>
        </div>
        <p className="ruwaq-market-trust mt-8">{copy.trustLine}</p>
      </div>
    </section>
  );
}
