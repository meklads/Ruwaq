import { z } from "zod";
import { dateStr, imageSchema, localized } from "../content/schema";

/**
 * Knowledge sections: the glossary (one page per term) and the visual atlas of Saudi architecture
 * (one page per style). Same rules as the other editorial content: real sources with dates,
 * drafts stay out of production until the owner reviews them, nothing is self-declared "approved".
 */

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case");
const FAKE_HOST = /(^|\.)(example\.(com|org|net)|[^.]+\.invalid|localhost)$/i;

const source = z
  .object({
    label: text,
    publisher: text.optional(),
    url: z.string().url().refine((u) => u.startsWith("https://") && !FAKE_HOST.test(new URL(u).hostname), "real https source only"),
    publishedAt: dateStr.optional(),
    accessedAt: dateStr,
  })
  .strict();

/** Where a page sends a reader who wants the service behind the knowledge. One company per link. */
export const GROUP_TARGETS = ["graphicshouse", "turriva", "beesmotion"] as const;
export type GroupTarget = (typeof GROUP_TARGETS)[number];

export const TERM_CATEGORIES = ["visualization", "models", "sales", "development", "regulation", "architecture"] as const;
export type TermCategory = (typeof TERM_CATEGORIES)[number];

const termBase = {
  slug,
  term: localized,
  /** Other spellings or the foreign word, e.g. "Render", "ماكيت". */
  aliases: z.array(text).default([]),
  category: z.enum(TERM_CATEGORIES),
  definition: localized,
  example: localized,
  related: z.array(slug).default([]),
  /** Regulatory terms must cite an official source; general terms may cite one. */
  regulatory: z.boolean().default(false),
  sources: z.array(source).default([]),
  next: z.enum(GROUP_TARGETS).optional(),
  publishedAt: dateStr,
  reviewedAt: dateStr,
};

const needsSource = (v: { regulatory: boolean; sources: unknown[] }, ctx: z.RefinementCtx) => {
  if (v.regulatory && v.sources.length === 0) ctx.addIssue({ code: "custom", path: ["sources"], message: "regulatory terms need an official source" });
};

const styleBase = {
  slug,
  name: localized,
  region: localized,
  /** Official reference this page summarises (map, guidelines). At least one, always. */
  sources: z.array(source).min(1),
  summary: localized,
  characteristics: z.array(localized).min(1),
  materials: z.array(localized).default([]),
  colours: z.array(localized).default([]),
  /** Traditional / transitional / contemporary readings, only where the official source covers them. */
  readings: z.array(z.object({ kind: z.enum(["traditional", "transitional", "contemporary"]), text: localized }).strict()).default([]),
  applyInYourProject: localized,
  /** What we could not confirm yet; shown to readers. */
  unclear: z.array(localized).default([]),
  image: imageSchema.optional(),
  architectReviewed: dateStr.optional(),
  publishedAt: dateStr,
  reviewedAt: dateStr,
};

const published = { draft: z.literal(false).default(false) };
const draft = { draft: z.literal(true) };

export const publishedTerm = z.object({ ...termBase, ...published }).strict().superRefine(needsSource);
export const draftTerm = z.object({ ...termBase, ...draft }).strict().superRefine(needsSource);
/** A published style page also needs an architect's review date. */
export const publishedStyle = z
  .object({ ...styleBase, ...published })
  .strict()
  .superRefine((v, ctx) => {
    if (!v.architectReviewed) ctx.addIssue({ code: "custom", path: ["architectReviewed"], message: "published styles need an architect review" });
  });
export const draftStyle = z.object({ ...styleBase, ...draft }).strict();

export type Term = z.infer<typeof publishedTerm> | z.infer<typeof draftTerm>;
export type Style = z.infer<typeof publishedStyle> | z.infer<typeof draftStyle>;
