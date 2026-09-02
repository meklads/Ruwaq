"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";
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
  buildFrameThumbSvg,
  type LetterheadFrameId,
} from "@/modules/proposal/export/letterhead-frames";

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
  labels: Labels;
  startCta: string;
  /** @deprecated library no longer needs proposal sample items */
  items?: readonly unknown[];
  studio?: boolean;
};

function previewUrl(
  locale: Locale,
  palette: TemplatePalette,
  frameId: LetterheadFrameId,
  centerWatermark: boolean
): string {
  const wm = centerWatermark ? "1" : "0";
  return `/api/templates/samples/ruwaq-classic?locale=${locale}&${paletteToQuery(palette)}&frame=${frameId}&wm=${wm}`;
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
      <div className="relative z-[81] flex h-[min(94vh,960px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
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
        <div className="min-h-0 flex-1 overflow-auto bg-[#e8e4dc] p-4 sm:p-6">
          <div className="mx-auto w-full max-w-[820px] overflow-hidden rounded-sm bg-white shadow-xl">
            <iframe
              key={src}
              title={title}
              src={src}
              className="block h-[min(80vh,1123px)] w-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateSampleGallery({ locale, labels, startCta }: Props) {
  const [paletteId, setPaletteId] = useState<string>("gold_sand");
  const [frameId, setFrameId] = useState<LetterheadFrameId>("corner_cut");
  const [centerWatermark, setCenterWatermark] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const palette = useMemo(() => resolveTemplatePalette({ paletteId }), [paletteId]);
  const frame = LETTERHEAD_FRAMES[frameId];
  const frameName = locale === "ar" ? frame.nameAr : frame.nameEn;
  const src = previewUrl(locale, palette, frameId, centerWatermark);
  const startHref = `/proposals/new?${paletteToQuery(palette)}&frame=${frameId}`;

  const openPreview = (id: LetterheadFrameId) => {
    setFrameId(id);
    setModalOpen(true);
  };

  return (
    <div className="nasaq-library">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-[#2F4A6E] sm:text-lg">
            {labels.frameTitle}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-neutral-600">{labels.frameHint}</p>
        </div>
        <p className="text-[11px] font-medium text-[#C9A063]">{labels.subscribeHint}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          {labels.paletteTitle}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATE_PALETTE_ORDER.map((id) => {
            const p = TEMPLATE_PALETTES[id];
            const selected = paletteId === id;
            return (
              <button
                key={id}
                type="button"
                title={locale === "ar" ? p.nameAr : p.nameEn}
                onClick={() => setPaletteId(id)}
                className={`h-7 w-7 overflow-hidden rounded-md border-2 transition ${
                  selected ? "border-[#C9A063] ring-2 ring-[#C9A063]/30" : "border-white shadow"
                }`}
              >
                <span className="flex h-full w-full">
                  <span className="w-1/2" style={{ background: p.primary }} />
                  <span className="w-1/2" style={{ background: p.accent }} />
                </span>
              </button>
            );
          })}
        </div>
        <label className="ms-auto flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
          <input
            type="checkbox"
            checked={centerWatermark}
            onChange={(e) => setCenterWatermark(e.target.checked)}
            className="h-3.5 w-3.5 accent-[#2F4A6E]"
          />
          {labels.watermarkToggle}
        </label>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LETTERHEAD_FRAME_ORDER.map((id) => {
          const f = LETTERHEAD_FRAMES[id];
          const selected = frameId === id;
          const name = locale === "ar" ? f.nameAr : f.nameEn;
          const thumb = buildFrameThumbSvg(id, palette.primary, palette.accent);
          return (
            <button
              key={id}
              type="button"
              onClick={() => openPreview(id)}
              className={`group overflow-hidden rounded-xl border bg-white text-start transition hover:-translate-y-0.5 hover:shadow-md ${
                selected
                  ? "border-[#C9A063] shadow-md ring-1 ring-[#C9A063]/30"
                  : "border-neutral-200"
              }`}
            >
              <div
                className="bg-[#ebe6de] p-3"
                dangerouslySetInnerHTML={{ __html: thumb }}
              />
              <div className="border-t border-neutral-100 px-3 py-2.5">
                <p className="text-xs font-bold text-[#2F4A6E]">{name}</p>
                <p className="mt-0.5 text-[10px] text-neutral-500 group-hover:text-[#C9A063]">
                  {labels.previewCta}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-ruwaq-accent px-6 py-2.5 text-sm"
        >
          {labels.previewLabel}: {frameName}
        </button>
        <Link href={startHref} className="btn-ruwaq-primary px-7 py-2.5 text-sm">
          {labels.startWithLook}
        </Link>
        <Link href="/proposals/new" className="text-sm font-semibold text-neutral-600 underline-offset-2 hover:underline">
          {startCta}
        </Link>
      </div>
      <p className="mt-3 text-center text-xs text-neutral-500">{labels.openSampleHint}</p>

      <PreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        src={src}
        title={`${labels.previewLabel}: ${frameName}`}
        note={labels.note}
        closeLabel={labels.closePreview}
        startHref={startHref}
        startLabel={labels.startWithLook}
      />
    </div>
  );
}
