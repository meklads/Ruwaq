import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["hero"];
  locale: Locale;
};

export function MarketplaceHomeHero({ copy, locale }: Props) {
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
          <Link href="/request-quote" className="btn-ruwaq-hero-gold px-10 py-4 text-base">
            {copy.ctaPrimary} {arrow}
          </Link>
          <a href="#categories" className="ruwaq-market-btn-outline">
            {copy.ctaSecondary}
          </a>
          <a href="#contractor-promo" className="ruwaq-market-btn-ghost">
            {copy.ctaContractor}
          </a>
        </div>
        <p className="ruwaq-market-trust mt-8">{copy.trustLine}</p>
      </div>
    </section>
  );
}
