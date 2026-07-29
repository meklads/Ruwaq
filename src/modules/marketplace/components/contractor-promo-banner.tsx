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
      className="ruwaq-contractor-zone scroll-mt-28 px-4 py-14 sm:px-6 sm:py-20"
      aria-labelledby="contractor-promo-title"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-ruwaq-stone/50 bg-gradient-to-br from-white via-ruwaq-linen/30 to-white p-10 text-center shadow-ruwaq-lg ring-1 ring-ruwaq-gold/20 sm:p-14">
        {copy.eyebrow ? (
          <p className="ruwaq-eyebrow mx-auto">{copy.eyebrow}</p>
        ) : null}
        <h2
          id="contractor-promo-title"
          className="ruwaq-section-title mx-auto mt-4 max-w-2xl text-2xl sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ruwaq-ink-soft sm:text-lg">
          {copy.subtitle}
        </p>
        <Link href="/proposals" className="btn-ruwaq-primary mt-10 inline-flex px-10 py-4 text-base">
          {copy.cta} {arrow}
        </Link>
      </div>
    </section>
  );
}
