"use client";

import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["contractorPromo"];
  locale: Locale;
};

export function ContractorPromoBanner({ copy, locale }: Props) {
  return (
    <section
      id="contractor-promo"
      className="ruwaq-ad-section scroll-mt-28 border-t border-neutral-950 bg-neutral-950 px-4 py-16 text-white sm:px-6 sm:py-20"
      aria-labelledby="contractor-promo-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        {copy.eyebrow ? (
          <p className="ruwaq-ad-eyebrow text-white/55">{copy.eyebrow}</p>
        ) : null}
        <h2 id="contractor-promo-title" className="ruwaq-ad-section-title mt-3 text-white">
          {copy.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{copy.subtitle}</p>
        <Link
          href="/proposals"
          className="ruwaq-pro-chip mt-8 inline-flex border-white/20 bg-white text-neutral-950 hover:bg-neutral-100"
        >
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}
