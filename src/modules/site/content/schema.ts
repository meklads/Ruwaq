import { z } from "zod";

/**
 * Validation for editorial content (updates, insights, specialist profiles).
 * Run at build/render time (loader) and by `npm run content:validate`.
 * There is deliberately no "approved" flag: a published item carries real, checkable
 * facts (sources, dates, review scope) instead of a self-declared approval.
 */

const isRealDate = (v: string) => {
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
};

export const dateStr = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD")
  .refine(isRealDate, "not a real calendar date");

/** Event dates are often not known; "unknown" is allowed and shown as such. */
export const dateOrUnknown = z.union([dateStr, z.literal("unknown")]);

const text = z.string().trim().min(1);

/** Text available in Arabic, English or both. At least one is required. */
export const localized = z
  .object({ ar: text.optional(), en: text.optional() })
  .strict()
  .refine((v) => Boolean(v.ar || v.en), "needs at least one of ar / en");

const httpsUrl = z
  .string()
  .url()
  .refine((u) => u.startsWith("https://"), "https only");

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case");

const sourceBase = z
  .object({
    label: text,
    publisher: text.optional(),
    url: httpsUrl,
    publishedAt: dateStr.optional(),
    accessedAt: dateStr,
  })
  .strict();

const FAKE_HOST = /(^|\.)(example\.(com|org|net)|[^.]+\.invalid|localhost)$/i;

/** Published content may not point at placeholder hosts. Preview content must. */
const publishedSource = sourceBase.refine(
  (s) => !FAKE_HOST.test(new URL(s.url).hostname),
  "placeholder source host is not allowed in published content"
);
const previewSource = sourceBase.refine(
  (s) => FAKE_HOST.test(new URL(s.url).hostname),
  "preview sources must use a placeholder host (*.invalid)"
);

/** Required only when an image is present: where it is stored, who made it, and the usage right. */
export const imageSchema = z
  .object({
    src: z.string().startsWith("/", "store images under /public and reference them with a leading /"),
    alt: localized,
    credit: text,
    license: text,
  })
  .strict();

const ENTITY_REVIEW_SCOPE = ["entity_identity", "official_website", "contact_channels", "works_attribution"] as const;
export type EntityReviewScope = (typeof ENTITY_REVIEW_SCOPE)[number];

function shapes(source: z.ZodType<z.infer<typeof sourceBase>>) {
  const sources = z.array(source).min(1);
  const base = {
    slug,
    title: localized,
    summary: localized,
    publishedAt: dateStr,
    reviewedAt: dateStr,
    sources,
    image: imageSchema.optional(),
  };
  const update = {
    ...base,
    project: z.object({ name: localized, location: localized.optional() }).strict().optional(),
    what: localized,
    eventDate: dateOrUnknown,
    entities: z.array(z.object({ name: localized, roleAsStated: localized }).strict()).default([]),
    unclear: z.array(localized).min(1),
    analysis: localized.optional(),
    /** An older item kept as a selected archival piece, not a current event. */
    archival: z.boolean().default(false),
  };
  const insight = {
    ...base,
    question: localized,
    period: z.object({ from: dateStr, to: dateStr }).strict(),
    scope: localized,
    methodology: localized,
    findings: z.array(localized).min(1),
    analysis: z.array(localized).default([]),
    limits: localized,
    updatedAt: dateStr.optional(),
  };
  const entity = {
    slug,
    name: localized,
    disciplines: z.array(localized).min(1),
    city: localized.optional(),
    workArea: localized.optional(),
    website: httpsUrl.optional(),
    publishedAt: dateStr,
    // 1) what the entity says about itself on its own official sources
    selfPublished: z
      .object({
        about: localized,
        contacts: z
          .array(z.object({ kind: z.enum(["email", "phone", "website", "form"]), value: text, label: localized.optional() }).strict())
          .default([]),
      })
      .strict(),
    // 2) what is published on its own official sources
    publishedOnOfficialSources: z
      .object({
        works: z
          .array(z.object({ title: localized, role: localized.optional(), sourceLabel: text, sourceUrl: httpsUrl }).strict())
          .default([]),
      })
      .strict()
      .default({ works: [] }),
    // 2b) claims supported by an independent source
    supportedByOtherSources: z
      .array(z.object({ claim: localized, sourceLabel: text, sourceUrl: httpsUrl }).strict())
      .default([]),
    // 3) what Ruwaq reviewed, with scope and date. Never a quality rating.
    reviewedByRuwaq: z
      .object({ reviewedAt: dateStr, scope: z.array(z.enum(ENTITY_REVIEW_SCOPE)).min(1), note: localized.optional() })
      .strict(),
    sources,
    image: imageSchema.optional(),
  };
  return { update, insight, entity };
}

const pub = shapes(publishedSource);
const prev = shapes(previewSource);

const checkPeriod = (v: { period: { from: string; to: string } }, ctx: z.RefinementCtx) => {
  if (v.period.from > v.period.to) ctx.addIssue({ code: "custom", path: ["period"], message: "period.from is after period.to" });
};
const requireWebsite = (v: { website?: string }, ctx: z.RefinementCtx) => {
  if (!v.website) ctx.addIssue({ code: "custom", path: ["website"], message: "published profiles need the official website" });
};

const publishedFlags = { preview: z.literal(false).default(false), draft: z.literal(false).default(false) };
const previewFlags = { preview: z.literal(true), draft: z.literal(false).default(false) };
/** Real content awaiting the owner's review: shown only in local development, never in production. */
const draftFlags = { preview: z.literal(false).default(false), draft: z.literal(true) };

export const publishedUpdate = z.object({ ...pub.update, ...publishedFlags }).strict();
export const previewUpdate = z.object({ ...prev.update, ...previewFlags }).strict();
export const draftUpdate = z.object({ ...pub.update, ...draftFlags }).strict();
export const publishedInsight = z.object({ ...pub.insight, ...publishedFlags }).strict().superRefine(checkPeriod);
export const previewInsight = z.object({ ...prev.insight, ...previewFlags }).strict().superRefine(checkPeriod);
export const draftInsight = z.object({ ...pub.insight, ...draftFlags }).strict().superRefine(checkPeriod);
export const publishedEntity = z.object({ ...pub.entity, ...publishedFlags }).strict().superRefine(requireWebsite);
export const previewEntity = z.object({ ...prev.entity, ...previewFlags }).strict();
export const draftEntity = z.object({ ...pub.entity, ...draftFlags }).strict().superRefine(requireWebsite);

export type Update = z.infer<typeof publishedUpdate> | z.infer<typeof previewUpdate> | z.infer<typeof draftUpdate>;
export type Insight = z.infer<typeof publishedInsight> | z.infer<typeof previewInsight> | z.infer<typeof draftInsight>;
export type Entity = z.infer<typeof publishedEntity> | z.infer<typeof previewEntity> | z.infer<typeof draftEntity>;
export type Source = z.infer<typeof sourceBase>;
export type Localized = z.infer<typeof localized>;
