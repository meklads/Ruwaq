"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";
import type { SampleTemplateSlug } from "@/modules/proposal/export/sample-template-keys";
import {
  TEMPLATE_PALETTE_ORDER,
  TEMPLATE_PALETTES,
  paletteToQuery,
  resolveTemplatePalette,
  type TemplatePalette,
} from "@/modules/proposal/export/template-palettes";
import {
  LETTERHEAD_FRAME_ORDER,
  LETTERHEAD_FRAMES,
  type LetterheadFrameId,
} from "@/modules/proposal/export/letterhead-frames";

type GalleryItem = {
  slug: SampleTemplateSlug;
  brand: string;
  title: string;
  body: string;
  badge: string;
};

type Labels = {
  openSample: string;
  openSampleHint: string;
  note: string;
  previewLabel: string;
  paletteTitle: string;
  paletteHint: string;
  customColors: string;
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  previewCta: string;
  closePreview: string;
  startWithLook: string;
  subscribeHint: string;
  frameTitle: string;
  frameHint: string;
  watermarkToggle: string;
};

type Props = {
  locale: Locale;
  items: readonly GalleryItem[];
  labels: Labels;
  startCta: string;
};

function buildSampleUrl(
  slug: SampleTemplateSlug,
  locale: Locale,
  palette: TemplatePalette,
  frameId: LetterheadFrameId,
  centerWatermark: boolean
): string {
  const wm = centerWatermark ? "1" : "0";
  return `/api/templates/samples/${slug}?locale=${locale}&${paletteToQuery(palette)}&frame=${frameId}&wm=${wm}`;
}

function A4Thumb({
  src,
  title,
  onOpen,
  openLabel,
}: {
  src: string;
  title: string;
  onOpen: () => void;
  openLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#ebe6de] text-start shadow-sm transition hover:-translate-y-0.5 hover:border-[#C9A063]/50 hover:shadow-lg"
      aria-label={openLabel}
    >
      <div className="nasaq-a4-stage">
        <iframe
          key={src}
          title={title}
          src={src}
          loading="lazy"
          tabIndex={-1}
          className="nasaq-a4-iframe pointer-events-none"
        />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2F4A6E]/85 to-transparent px-3 pb-3 pt-10 text-center text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
        {openLabel}
      </span>
    </button>
  );
}

function PreviewModal({
  open,
  onClose,
  src,
  title,
  note,
  closeLabel,
  startHref,
  startLabel,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  note: string;
  closeLabel: string;
  startHref: string;
  startLabel: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2F4A6E]/55 backdrop-blur-[2px]"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div className="relative z-[81] flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 bg-[#F7F4EF] px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-semibold text-[#2F4A6E]">{title}</p>
            <p className="mt-0.5 text-[11px] text-neutral-500">{note}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={startHref} className="btn-ruwaq-primary px-4 py-2 text-xs sm:text-sm">
              {startLabel}
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              {closeLabel}
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-[#e5e1d8] p-3 sm:p-5">
          <div className="mx-auto max-w-[920px] overflow-hidden rounded-xl bg-white shadow-lg">
            <iframe
              key={src}
              title={title}
              src={src}
              className="h-[min(78vh,1100px)] w-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateSampleGallery({ locale, items, labels, startCta }: Props) {
  const [paletteId, setPaletteId] = useState<string>("gold_sand");
  const [customPrimary, setCustomPrimary] = useState("#2F4A6E");
  const [customAccent, setCustomAccent] = useState("#C9A063");
  const [customSurface, setCustomSurface] = useState("#F7F4EF");
  const [useCustom, setUseCustom] = useState(false);
  const [frameId, setFrameId] = useState<LetterheadFrameId>("wave");
  const [centerWatermark, setCenterWatermark] = useState(true);
  const [modalSlug, setModalSlug] = useState<SampleTemplateSlug | null>(null);

  const palette = useMemo(
    () =>
      resolveTemplatePalette(
        useCustom
          ? { primary: customPrimary, accent: customAccent, surface: customSurface }
          : { paletteId }
      ),
    [useCustom, customPrimary, customAccent, customSurface, paletteId]
  );

  const modalItem = items.find((item) => item.slug === modalSlug) ?? null;
  const modalSrc = modalItem
    ? buildSampleUrl(modalItem.slug, locale, palette, frameId, centerWatermark)
    : "";
  const startHref = `/proposals/new?${paletteToQuery(palette)}&frame=${frameId}`;

  return (
    <div className="nasaq-template-gallery">
      <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-[#F7F4EF] via-white to-[#eef3f8] p-5 sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-[#2F4A6E] sm:text-lg">
              {labels.paletteTitle}
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
              {labels.paletteHint}
            </p>
          </div>
          <p className="text-[11px] font-medium text-[#C9A063] sm:text-xs">{labels.subscribeHint}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {TEMPLATE_PALETTE_ORDER.map((id) => {
            const p = TEMPLATE_PALETTES[id];
            const selected = !useCustom && paletteId === id;
            const name = locale === "ar" ? p.nameAr : p.nameEn;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setUseCustom(false);
                  setPaletteId(id);
                }}
                className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 transition ${
                  selected
                    ? "border-[#C9A063] bg-white shadow-md ring-1 ring-[#C9A063]/35"
                    : "border-neutral-200 bg-white/70 hover:border-neutral-300"
                }`}
              >
                <span className="flex h-8 w-8 overflow-hidden rounded-lg shadow-inner">
                  <span className="w-[45%]" style={{ background: p.primary }} />
                  <span className="w-[30%]" style={{ background: p.accent }} />
                  <span className="w-[25%]" style={{ background: p.surface }} />
                </span>
                <span className="text-[11px] font-semibold text-[#2F4A6E] sm:text-xs">{name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-neutral-200/80 pt-5">
          <button
            type="button"
            onClick={() => setUseCustom(true)}
            className={`text-xs font-semibold underline-offset-2 hover:underline ${
              useCustom ? "text-[#2F4A6E]" : "text-neutral-500"
            }`}
          >
            {labels.customColors}
          </button>
          {useCustom ? (
            <div className="mt-3 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-xs text-neutral-600">
                <span>{labels.primaryColor}</span>
                <input
                  type="color"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-neutral-200 bg-white"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-neutral-600">
                <span>{labels.accentColor}</span>
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-neutral-200 bg-white"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-neutral-600">
                <span>{labels.surfaceColor}</span>
                <input
                  type="color"
                  value={customSurface}
                  onChange={(e) => setCustomSurface(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-neutral-200 bg-white"
                />
              </label>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-base font-bold text-[#2F4A6E]">{labels.frameTitle}</h3>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">{labels.frameHint}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {LETTERHEAD_FRAME_ORDER.map((id) => {
            const frame = LETTERHEAD_FRAMES[id];
            const selected = frameId === id;
            const name = locale === "ar" ? frame.nameAr : frame.nameEn;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFrameId(id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? "border-[#2F4A6E] bg-[#2F4A6E] text-white"
                    : "border-neutral-200 bg-[#F7F4EF] text-[#2F4A6E] hover:border-neutral-300"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={centerWatermark}
            onChange={(e) => setCenterWatermark(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 accent-[#2F4A6E]"
          />
          {labels.watermarkToggle}
        </label>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const src = buildSampleUrl(item.slug, locale, palette, frameId, centerWatermark);
          return (
            <article key={item.slug} className="flex flex-col">
              <A4Thumb
                src={src}
                title={item.title}
                openLabel={labels.previewCta}
                onOpen={() => setModalSlug(item.slug)}
              />
              <div className="mt-3 px-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9A063]">
                  {item.brand}
                </p>
                <h3 className="mt-1 font-display text-base font-bold text-[#2F4A6E]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                <span className="mt-2 inline-block text-[10px] font-semibold text-[#2F4A6E]/70">
                  {item.badge}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-neutral-500">{labels.openSampleHint}</p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href={startHref} className="btn-ruwaq-primary inline-flex px-9 py-3.5">
          {labels.startWithLook}
        </Link>
        <Link href="/proposals/new" className="btn-ruwaq-accent inline-flex px-7 py-3 text-sm">
          {startCta}
        </Link>
      </div>

      <PreviewModal
        open={Boolean(modalItem)}
        onClose={() => setModalSlug(null)}
        src={modalSrc}
        title={`${labels.previewLabel}: ${modalItem?.title ?? ""}`}
        note={labels.note}
        closeLabel={labels.closePreview}
        startHref={startHref}
        startLabel={labels.startWithLook}
      />
    </div>
  );
}
