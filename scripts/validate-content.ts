/**
 * Validates published and preview site content against the Zod schemas, and proves the
 * validators actually reject bad input. Run: npm run content:validate
 */
import { ENTITIES, INSIGHTS, UPDATES } from "../src/content/site";
import { PREVIEW_ENTITIES, PREVIEW_INSIGHTS, PREVIEW_UPDATES } from "../src/content/site/preview";
import { DRAFT_ENTITIES, DRAFT_INSIGHTS, DRAFT_UPDATES } from "../src/content/site/drafts";
import {
  draftEntity, draftInsight, draftUpdate,
  previewEntity, previewInsight, previewUpdate, publishedEntity, publishedInsight, publishedUpdate,
} from "../src/modules/site/content/schema";
import { parseCollection } from "../src/modules/site/content/loader";

const counts = {
  updates: parseCollection("updates", publishedUpdate, UPDATES).length,
  insights: parseCollection("insights", publishedInsight, INSIGHTS).length,
  entities: parseCollection("entities", publishedEntity, ENTITIES).length,
  previewUpdates: parseCollection("preview updates", previewUpdate, PREVIEW_UPDATES).length,
  previewInsights: parseCollection("preview insights", previewInsight, PREVIEW_INSIGHTS).length,
  previewEntities: parseCollection("preview entities", previewEntity, PREVIEW_ENTITIES).length,
  draftUpdates: parseCollection("draft updates", draftUpdate, DRAFT_UPDATES).length,
  draftInsights: parseCollection("draft insights", draftInsight, DRAFT_INSIGHTS).length,
  draftEntities: parseCollection("draft entities", draftEntity, DRAFT_ENTITIES).length,
};
console.log("content OK:", JSON.stringify(counts));

// Negative checks: these must be rejected.
const good = { ...(PREVIEW_UPDATES[0] as object) } as Record<string, unknown>;
const bad: [string, unknown, "published" | "preview"][] = [
  ["preview item in published set", good, "published"],
  ["published item without sources", { ...good, preview: false, sources: [] }, "published"],
  ["published item with placeholder source host", { ...good, preview: false }, "published"],
  ["missing review date", { ...good, reviewedAt: undefined }, "preview"],
  ["impossible date", { ...good, publishedAt: "2026-02-31" }, "preview"],
  ["image without license", { ...good, image: { src: "/x.jpg", alt: { en: "x" }, credit: "someone" } }, "preview"],
  ["empty 'unclear'", { ...good, unclear: [] }, "preview"],
];
let failures = 0;
for (const [name, item, kind] of bad) {
  const schema = kind === "published" ? publishedUpdate : previewUpdate;
  if (schema.safeParse(item).success) { console.error(`NOT REJECTED: ${name}`); failures++; }
}
// Real drafts must not be accepted as published, and must not carry placeholder hosts.
const draftSample = DRAFT_UPDATES[0] as Record<string, unknown>;
if (publishedUpdate.safeParse(draftSample).success) { console.error("draft accepted as published"); failures++; }
if (draftUpdate.safeParse({ ...draftSample, draft: false }).success) { console.error("draft without draft:true accepted"); failures++; }
const published = { ...good, preview: false, sources: [{ label: "x", url: "https://publisher.test-site.org/a", accessedAt: "2026-11-03" }] };
if (!publishedUpdate.safeParse(published).success) { console.error("valid published item was rejected"); failures++; }
if (failures) process.exit(1);
console.log(`negative checks OK (${bad.length + 2} rejected, 1 accepted)`);
