import { LETTERHEAD_FRAMES, parseLetterheadFrameId } from "../export/letterhead-frames";
import { TEMPLATE_PALETTES } from "../export/template-palettes";
import { SAMPLE_TEMPLATE_SLUGS, sampleSlugToTemplateId } from "../export/sample-template-keys";
import type { ExportTemplateId } from "@/modules/company/lib/export-template-ids";

/**
 * The look a proposal was started with (template, letterhead frame, palette or custom colours).
 *
 * It is stored with the proposal itself, inside the existing `Proposal.confidence` JSON under
 * `_look`, so a guest keeps it when reopening the proposal and no database migration is needed.
 * Everything is validated against known ids / hex colours before it is stored or used.
 */
export type ProposalLook = {
  templateId?: ExportTemplateId;
  frameId?: string;
  paletteId?: string;
  primary?: string;
  accent?: string;
  surface?: string;
};

const HEX = /^#[0-9a-fA-F]{6}$/;
const hex = (v: unknown): string | undefined => (typeof v === "string" && HEX.test(v) ? v : undefined);

export function sanitizeLook(raw: unknown): ProposalLook | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const look: ProposalLook = {};

  if (typeof r.templateId === "string") {
    const slug = (SAMPLE_TEMPLATE_SLUGS as readonly string[]).includes(r.templateId) ? r.templateId : null;
    if (slug) look.templateId = sampleSlugToTemplateId(slug as (typeof SAMPLE_TEMPLATE_SLUGS)[number]);
    else if (["ruwaq", "ruwaq_executive", "graphics_house"].includes(r.templateId)) look.templateId = r.templateId as ExportTemplateId;
  }
  if (typeof r.frameId === "string" && r.frameId in LETTERHEAD_FRAMES) look.frameId = parseLetterheadFrameId(r.frameId);
  const primary = hex(r.primary);
  const accent = hex(r.accent);
  if (primary && accent) {
    look.primary = primary;
    look.accent = accent;
    const surface = hex(r.surface);
    if (surface) look.surface = surface;
  } else if (typeof r.paletteId === "string" && r.paletteId in TEMPLATE_PALETTES) {
    look.paletteId = r.paletteId;
  }
  return Object.keys(look).length ? look : null;
}

/** Look from the page URL (`?template=&frame=&palette=` or custom `c1,c2,c3`). */
export function lookFromSearchParams(sp: Record<string, string | string[] | undefined>): ProposalLook | null {
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : (sp[k] as string | undefined));
  return sanitizeLook({
    templateId: one("template"),
    frameId: one("frame"),
    paletteId: one("palette"),
    primary: one("c1"),
    accent: one("c2"),
    surface: one("c3"),
  });
}

export function readLook(confidence: unknown): ProposalLook | null {
  if (!confidence || typeof confidence !== "object") return null;
  return sanitizeLook((confidence as Record<string, unknown>)._look);
}

/** Returns a copy of `confidence` carrying `look` (or without it when look is null). */
export function withLook(confidence: unknown, look: ProposalLook | null): Record<string, unknown> {
  const base = confidence && typeof confidence === "object" ? { ...(confidence as Record<string, unknown>) } : {};
  if (look) base._look = look;
  else delete base._look;
  return base;
}
