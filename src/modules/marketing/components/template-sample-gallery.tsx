"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";
import type { SampleTemplateSlug } from "@/modules/proposal/export/sample-template-keys";

type GalleryItem = {
  slug: SampleTemplateSlug;
  brand: string;
  title: string;
  body: string;
  badge: string;
};

type Props = {
  locale: Locale;
  items: readonly GalleryItem[];
  labels: {
    openSample: string;
    openSampleHint: string;
    note: string;
    previewLabel: string;
  };
  startCta: string;
};

export function TemplateSampleGallery({ locale, items, labels, startCta }: Props) {
  const [active, setActive] = useState<SampleTemplateSlug>(
    items[0]?.slug ?? "ruwaq-executive"
  );

  const sampleUrl = useMemo(
    () => `/api/templates/samples/${active}?locale=${locale}`,
    [active, locale]
  );

  const activeItem = items.find((item) => item.slug === active) ?? items[0];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const selected = item.slug === active;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(item.slug)}
              className={`rounded-2xl border p-5 text-start transition-all ${
                selected
                  ? "border-ruwaq-gold/50 bg-ruwaq-cream-bg shadow-ruwaq-premium ring-1 ring-ruwaq-gold/20"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-ruwaq-gold">
                {item.brand}
              </p>
              <h2 className="mt-2 font-display text-base font-bold text-ruwaq-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ruwaq-ink-soft">{item.body}</p>
              <span className="mt-3 inline-block rounded-full bg-ruwaq-gold/10 px-2.5 py-1 text-[10px] font-semibold text-ruwaq-gold">
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-100/90 bg-white shadow-ruwaq-premium">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-ruwaq-canvas-soft px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs font-semibold text-ruwaq-ink sm:text-sm">
              {labels.previewLabel}: {activeItem?.title}
            </p>
            <p className="mt-0.5 text-[11px] text-ruwaq-ink-muted sm:text-xs">{labels.note}</p>
          </div>
          <a
            href={sampleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ruwaq-accent px-4 py-2 text-xs sm:text-sm"
          >
            {labels.openSample}
          </a>
        </div>
        <iframe
          key={active}
          title={activeItem?.title ?? labels.previewLabel}
          src={sampleUrl}
          className="h-[min(78vh,920px)] w-full border-0 bg-slate-200/80 shadow-inner"
        />
      </div>

      <p className="mt-3 text-center text-xs text-ruwaq-ink-muted">{labels.openSampleHint}</p>

      <div className="mt-10 text-center">
        <Link href="/proposals/new" className="btn-ruwaq-primary inline-flex px-9 py-3.5">
          {startCta}
        </Link>
      </div>
    </div>
  );
}
