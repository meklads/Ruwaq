"use client";

import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import { graphicsHouseReferralUrl } from "@/shared/constants/brand";
import { GraphicsHouseLogo } from "@/shared/components/graphics-house-logo";

type Props = {
  copy: Messages["marketplace"]["graphicsHousePromo"];
};

export function GraphicsHousePromoBanner({ copy }: Props) {
  const ghUrl = graphicsHouseReferralUrl("homepage_visualization");

  return (
    <section
      id="visualization"
      className="ruwaq-ad-band-greige scroll-mt-28 border-t border-neutral-950 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="graphics-house-promo-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        {copy.eyebrow ? (
          <p className="ruwaq-ad-eyebrow text-neutral-600">{copy.eyebrow}</p>
        ) : null}
        <h2
          id="graphics-house-promo-title"
          className="ruwaq-ad-section-title mt-3 text-neutral-950"
        >
          {copy.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
          {copy.subtitle}
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {copy.services.map((service) => (
            <li
              key={service}
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-600"
            >
              {service}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/visualization"
              className="ruwaq-pro-chip inline-flex border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
            >
              {copy.cta}
            </Link>
            <a
              href={ghUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ruwaq-pro-chip inline-flex border-neutral-950 bg-transparent text-neutral-950 hover:bg-neutral-950/5"
            >
              {copy.secondaryCta}
            </a>
          </div>
          <GraphicsHouseLogo href={ghUrl} variant="light" className="h-7 w-auto opacity-90" />
        </div>
      </div>
    </section>
  );
}
