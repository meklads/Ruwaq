/**
 * Validates glossary terms and atlas styles (published and drafts) and proves the key rules reject
 * bad input. Run: npm run knowledge:validate
 */
import { STYLES, TERMS } from "../src/content/knowledge";
import { DRAFT_STYLES, DRAFT_TERMS } from "../src/content/knowledge/drafts";
import { draftStyle, draftTerm, publishedStyle, publishedTerm } from "../src/modules/site/knowledge/schema";
import { parseCollection } from "../src/modules/site/content/loader";

const terms = [...parseCollection("terms", publishedTerm, TERMS), ...parseCollection("draft terms", draftTerm, DRAFT_TERMS)];
const styles = [...parseCollection("styles", publishedStyle, STYLES), ...parseCollection("draft styles", draftStyle, DRAFT_STYLES)];
const known = new Set(terms.map((t) => t.slug));
for (const t of terms) for (const r of t.related) if (!known.has(r)) throw new Error(`term ${t.slug} links to unknown term ${r}`);
console.log("knowledge OK:", JSON.stringify({ terms: terms.length, styles: styles.length }));

const term = { ...(DRAFT_TERMS[0] as object) } as Record<string, unknown>;
const style = { ...(DRAFT_STYLES[0] as object) } as Record<string, unknown>;
const bad: [string, boolean][] = [
  ["regulatory term without source", draftTerm.safeParse({ ...term, regulatory: true, sources: [] }).success],
  ["draft term in published set", publishedTerm.safeParse(term).success],
  ["published style without architect review", publishedStyle.safeParse({ ...style, draft: false }).success],
  ["style without sources", draftStyle.safeParse({ ...style, sources: [] }).success],
  ["placeholder source host", draftStyle.safeParse({ ...style, sources: [{ label: "x", url: "https://x.invalid/a", accessedAt: "2026-11-12" }] }).success],
];
const failed = bad.filter(([, ok]) => ok);
if (failed.length) { console.error("not rejected:", failed.map(([n]) => n)); process.exit(1); }
console.log(`negative checks OK (${bad.length} rejected)`);
