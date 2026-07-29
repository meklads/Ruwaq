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
    <section className="ruwaq-market-hero relative overflow-hidden border-b border-ruwaq-stone/50 bg-gradient-to-b from-[#0F2C59] via-[#1B4D3E] to-[#0f172a] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -start-24 top-0 h-72 w-72 rounded-full bg-ruwaq-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 end-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold text-ruwaq-gold-light">ruwaq.co</p>
        <h1 className="mt-4 text-3xl font-bold leading-[1.35] sm:text-4xl lg:text-[2.35rem]">
          {copy.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {copy.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/request-quote"
            className="btn-ruwaq-hero-gold inline-flex px-10 py-4 text-base"
          >
            {copy.ctaPrimary} {arrow}
          </Link>
          <a
            href="#categories"
            className="btn-ruwaq-hero-outline inline-flex px-8 py-3.5"
          >
            {copy.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
