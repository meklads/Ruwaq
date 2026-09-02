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
  /** Compact studio: controls + one big preview, no long scroll. */
  studio?: boolean;
};

function buildSampleUrl(
  slug: SampleTemplateSlug,
  locale: Locale,
  palette: TemplatePalette,
  frameId: LetterheadFrameId,
  centerWatermark: boolean,
  full = false
): string {
  const wm = centerWatermark ? "1" : "0";
  const view = full ? "&view=full" : "";
  return `/api/templates/samples/${slug}?locale=${locale}&${paletteToQuery(palette)}&frame=${frameId}&wm=${wm}${view}`;
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
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5"
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
      <div className="relative z-[81] flex h-[min(94vh,920px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 bg-[#F7F4EF] px-4 py-3">
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
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700"
            >
              {closeLabel}
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-[#e5e1d8] p-3 sm:p-4">
          <div className="mx-auto max-w-[820px] overflow-hidden rounded-xl bg-white shadow-lg">
            <iframe key={src} title={title} src={src} className="h-[min(78vh,1000px)] w-full border-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateSampleGallery({ locale, items, labels, startCta, studio }: Props) {
  const [paletteId, setPaletteId] = useState<string>("gold_sand");
  const [customPrimary, setCustomPrimary] = useState("#2F4A6E");
  const [customAccent, setCustomAccent] = useState("#C9A063");
  const [customSurface, setCustomSurface] = useState("#F7F4EF");
  const [useCustom, setUseCustom] = useState(false);
  const [frameId, setFrameId] = useState<LetterheadFrameId>("corner_cut");
  const [centerWatermark, setCenterWatermark] = useState(true);
  const [activeSlug, setActiveSlug] = useState<SampleTemplateSlug>(
    items[0]?.slug ?? "ruwaq-executive"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const palette = useMemo(
    () =>
      resolveTemplatePalette(
        useCustom
          ? { primary: customPrimary, accent: customAccent, surface: customSurface }
          : { paletteId }
      ),
    [useCustom, customPrimary, customAccent, customSurface, paletteId]
  );

  const activeItem = items.find((item) => item.slug === activeSlug) ?? items[0];
  const previewSrc = activeItem
    ? buildSampleUrl(activeItem.slug, locale, palette, frameId, centerWatermark)
    : "";
  const fullSrc = activeItem
    ? buildSampleUrl(activeItem.slug, locale, palette, frameId, centerWatermark, true)
    : "";
  const startHref = `/proposals/new?${paletteToQuery(palette)}&frame=${frameId}`;

  const controls = (
    <div className="flex min-h-0 flex-col gap-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A063]">
          {labels.frameTitle}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">{labels.frameHint}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {LETTERHEAD_FRAME_ORDER.map((id) => {
            const frame = LETTERHEAD_FRAMES[id];
            const selected = frameId === id;
            const name = locale === "ar" ? frame.nameAr : frame.nameEn;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFrameId(id)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  selected
                    ? "border-[#2F4A6E] bg-[#2F4A6E] text-white"
                    : "border-neutral-200 bg-white text-[#2F4A6E] hover:border-neutral-300"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A063]">
          {labels.paletteTitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TEMPLATE_PALETTE_ORDER.map((id) => {
            const p = TEMPLATE_PALETTES[id];
            const selected = !useCustom && paletteId === id;
            return (
              <button
                key={id}
                type="button"
                title={locale === "ar" ? p.nameAr : p.nameEn}
                onClick={() => {
                  setUseCustom(false);
                  setPaletteId(id);
                }}
                className={`h-8 w-8 overflow-hidden rounded-lg border-2 transition ${
                  selected ? "border-[#C9A063] ring-2 ring-[#C9A063]/25" : "border-white shadow-sm"
                }`}
              >
                <span className="flex h-full w-full">
                  <span className="w-[45%]" style={{ background: p.primary }} />
                  <span className="w-[30%]" style={{ background: p.accent }} />
                  <span className="w-[25%]" style={{ background: p.surface }} />
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setUseCustom(true)}
          className="mt-2 text-[11px] font-semibold text-neutral-500 underline-offset-2 hover:underline"
        >
          {labels.customColors}
        </button>
        {useCustom ? (
          <div className="mt-2 flex flex-wrap gap-3">
            <label className="flex items-center gap-1.5 text-[11px] text-neutral-600">
              <span>{labels.primaryColor}</span>
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="h-7 w-9 cursor-pointer rounded border border-neutral-200"
              />
            </label>
            <label className="flex items-center gap-1.5 text-[11px] text-neutral-600">
              <span>{labels.accentColor}</span>
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="h-7 w-9 cursor-pointer rounded border border-neutral-200"
              />
            </label>
            <label className="flex items-center gap-1.5 text-[11px] text-neutral-600">
              <span>{labels.surfaceColor}</span>
              <input
                type="color"
                value={customSurface}
                onChange={(e) => setCustomSurface(e.target.value)}
                className="h-7 w-9 cursor-pointer rounded border border-neutral-200"
              />
            </label>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const selected = item.slug === activeSlug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActiveSlug(item.slug)}
              className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                selected
                  ? "border-[#C9A063] bg-[#F7F4EF] text-[#2F4A6E]"
                  : "border-neutral-200 bg-white text-neutral-600"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
        <input
          type="checkbox"
          checked={centerWatermark}
          onChange={(e) => setCenterWatermark(e.target.checked)}
          className="h-3.5 w-3.5 rounded border-neutral-300 accent-[#2F4A6E]"
        />
        {labels.watermarkToggle}
      </label>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <Link href={startHref} className="btn-ruwaq-primary w-full px-4 py-2.5 text-center text-sm">
          {labels.startWithLook}
        </Link>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-center text-xs font-semibold text-[#2F4A6E] hover:bg-[#F7F4EF]"
        >
          {labels.previewCta}
        </button>
        <p className="text-center text-[10px] text-neutral-400">{labels.subscribeHint}</p>
      </div>
    </div>
  );

  if (studio) {
    return (
      <div className="nasaq-studio">
        <aside className="nasaq-studio-controls">{controls}</aside>
        <div className="nasaq-studio-stage">
          <div className="nasaq-studio-sheet-wrap">
            <iframe
              key={previewSrc}
              title={activeItem?.title ?? labels.previewLabel}
              src={previewSrc}
              className="nasaq-studio-iframe"
            />
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="nasaq-studio-expand"
          >
            {labels.previewCta}
          </button>
        </div>
        <PreviewModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          src={fullSrc}
          title={`${labels.previewLabel}: ${activeItem?.title ?? ""}`}
          note={labels.note}
          closeLabel={labels.closePreview}
          startHref={startHref}
          startLabel={labels.startWithLook}
        />
      </div>
    );
  }

  return (
    <div className="nasaq-template-gallery">
      <div className="grid gap-6 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-neutral-200 bg-[#F7F4EF]/80 p-4 sm:p-5">
          {controls}
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#ebe6de] p-3 sm:p-4">
          <div className="nasaq-a4-stage mx-auto max-w-md cursor-pointer" onClick={() => setModalOpen(true)}>
            <iframe
              key={previewSrc}
              title={activeItem?.title ?? labels.previewLabel}
              src={previewSrc}
              className="nasaq-a4-iframe pointer-events-none"
            />
          </div>
          <p className="mt-3 text-center text-xs text-neutral-500">{labels.openSampleHint}</p>
          <div className="mt-3 flex justify-center gap-2">
            <Link href={startHref} className="btn-ruwaq-primary px-6 py-2.5 text-sm">
              {labels.startWithLook}
            </Link>
            <Link href="/proposals/new" className="btn-ruwaq-accent px-5 py-2.5 text-sm">
              {startCta}
            </Link>
          </div>
        </div>
      </div>
      <PreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        src={fullSrc}
        title={`${labels.previewLabel}: ${activeItem?.title ?? ""}`}
        note={labels.note}
        closeLabel={labels.closePreview}
        startHref={startHref}
        startLabel={labels.startWithLook}
      />
    </div>
  );
}
