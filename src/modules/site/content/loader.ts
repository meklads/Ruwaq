import type { z } from "zod";
import { gateActive } from "./preview-mode";
import { ENTITIES, INSIGHTS, UPDATES } from "@/content/site";
import {
  draftEntity, draftInsight, draftUpdate,
  previewEntity, previewInsight, previewUpdate,
  publishedEntity, publishedInsight, publishedUpdate,
  type Entity, type Insight, type Update,
} from "./schema";

/**
 * Preview samples are available only in development. Any other NODE_ENV (production,
 * test, unset) fails closed. In production the preview module is not even bundled.
 */
export function previewEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

type PreviewData = { updates: unknown[]; insights: unknown[]; entities: unknown[] };

function loadPreview(): PreviewData {
  // The require sits inside a constant-folded NODE_ENV branch so the bundler drops the whole
  // preview module from production builds (an early `return` would not).
  if (process.env.NODE_ENV === "development") {
    const m = require("@/content/site/preview") as {
      PREVIEW_UPDATES: unknown[]; PREVIEW_INSIGHTS: unknown[]; PREVIEW_ENTITIES: unknown[];
    };
    return { updates: m.PREVIEW_UPDATES, insights: m.PREVIEW_INSIGHTS, entities: m.PREVIEW_ENTITIES };
  }
  return { updates: [], insights: [], entities: [] };
}

function loadDrafts(): PreviewData {
  // Constant-folded branch: the draft module is bundled only in development and in the private
  // preview build (RUWAQ_PRIVATE_PREVIEW=1, inlined by next.config.mjs). Any other production
  // build drops it. A private preview build additionally requires the full-site password gate at
  // runtime; without it, drafts are not loaded (fail closed).
  if (process.env.NODE_ENV === "development" || process.env.RUWAQ_PRIVATE_PREVIEW === "1") {
    if (process.env.NODE_ENV !== "development" && !gateActive()) return { updates: [], insights: [], entities: [] };
    const m = require("@/content/site/drafts") as {
      DRAFT_UPDATES: unknown[]; DRAFT_INSIGHTS: unknown[]; DRAFT_ENTITIES: unknown[];
    };
    return { updates: m.DRAFT_UPDATES, insights: m.DRAFT_INSIGHTS, entities: m.DRAFT_ENTITIES };
  }
  return { updates: [], insights: [], entities: [] };
}

export function parseCollection<S extends z.ZodTypeAny>(name: string, schema: S, items: unknown[]): z.infer<S>[] {
  const problems: string[] = [];
  const out: z.infer<S>[] = [];
  items.forEach((item, i) => {
    const r = schema.safeParse(item);
    if (r.success) out.push(r.data);
    else {
      const slug = (item as { slug?: string })?.slug ?? `#${i}`;
      for (const issue of r.error.issues) problems.push(`${name}[${slug}] ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
  });
  if (problems.length) throw new Error(`Invalid site content:\n${problems.join("\n")}`);
  const slugs = out.map((o) => (o as { slug: string }).slug);
  const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (dup) throw new Error(`Invalid site content: duplicate slug "${dup}" in ${name}`);
  return out;
}

type Store = { updates: Update[]; insights: Insight[]; entities: Entity[] };
let cache: Store | null = null;

function load(): Store {
  if (cache) return cache;
  const prev = loadPreview();
  const drafts = loadDrafts();
  const updates = [
    ...parseCollection("updates", publishedUpdate, UPDATES),
    ...parseCollection("draft updates", draftUpdate, drafts.updates),
    ...parseCollection("preview updates", previewUpdate, prev.updates),
  ] as Update[];
  const insights = [
    ...parseCollection("insights", publishedInsight, INSIGHTS),
    ...parseCollection("draft insights", draftInsight, drafts.insights),
    ...parseCollection("preview insights", previewInsight, prev.insights),
  ] as Insight[];
  const entities = [
    ...parseCollection("entities", publishedEntity, ENTITIES),
    ...parseCollection("draft entities", draftEntity, drafts.entities),
    ...parseCollection("preview entities", previewEntity, prev.entities),
  ] as Entity[];
  for (const [name, list] of [["updates", updates], ["insights", insights], ["entities", entities]] as const) {
    const slugs = list.map((x) => x.slug);
    const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
    if (dup) throw new Error(`Invalid site content: slug "${dup}" used by both published and preview ${name}`);
  }
  const byDateDesc = <T extends { publishedAt: string; slug: string }>(a: T, b: T) =>
    b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug);
  cache = {
    updates: updates.sort(byDateDesc),
    insights: insights.sort(byDateDesc),
    entities: entities.sort((a, b) => b.reviewedByRuwaq.reviewedAt.localeCompare(a.reviewedByRuwaq.reviewedAt) || a.slug.localeCompare(b.slug)),
  };
  return cache;
}

export const getUpdates = () => load().updates;
export const getInsights = () => load().insights;
export const getEntities = () => load().entities;
export const getUpdate = (slug: string) => load().updates.find((x) => x.slug === slug) ?? null;
export const getInsight = (slug: string) => load().insights.find((x) => x.slug === slug) ?? null;
export const getEntity = (slug: string) => load().entities.find((x) => x.slug === slug) ?? null;

/** Which sections have something to show. Empty sections are hidden everywhere (nav, home, sitemap, direct URLs). */
export function sectionAvailability() {
  const s = load();
  return { updates: s.updates.length > 0, insights: s.insights.length > 0, specialists: s.entities.length > 0 };
}

/** Items that may be exposed to crawlers (sitemap, structured data): never previews or drafts. */
export const publishedOnly = <T extends { preview: boolean; draft: boolean }>(items: T[]) =>
  items.filter((i) => !i.preview && !i.draft);
