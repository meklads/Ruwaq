import { TERMS, STYLES } from "@/content/knowledge";
import { gateActive } from "../content/preview-mode";
import { parseCollection } from "../content/loader";
import { draftStyle, draftTerm, publishedStyle, publishedTerm, type Style, type Term } from "./schema";

function loadDrafts(): { terms: unknown[]; styles: unknown[] } {
  // Same rule as the other sections: drafts are bundled only in development and in the private
  // preview build, and a private preview build also needs the full-site password gate (fail closed).
  if (process.env.NODE_ENV === "development" || process.env.RUWAQ_PRIVATE_PREVIEW === "1") {
    if (process.env.NODE_ENV !== "development" && !gateActive()) return { terms: [], styles: [] };
    const m = require("@/content/knowledge/drafts") as { DRAFT_TERMS: unknown[]; DRAFT_STYLES: unknown[] };
    return { terms: m.DRAFT_TERMS, styles: m.DRAFT_STYLES };
  }
  return { terms: [], styles: [] };
}

let cache: { terms: Term[]; styles: Style[] } | null = null;

function load() {
  if (cache) return cache;
  const d = loadDrafts();
  const terms = [...parseCollection("terms", publishedTerm, TERMS), ...parseCollection("draft terms", draftTerm, d.terms)] as Term[];
  const styles = [...parseCollection("styles", publishedStyle, STYLES), ...parseCollection("draft styles", draftStyle, d.styles)] as Style[];
  for (const [name, list] of [["terms", terms], ["styles", styles]] as const) {
    const slugs = list.map((x) => x.slug);
    const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
    if (dup) throw new Error(`Invalid knowledge content: slug "${dup}" used twice in ${name}`);
  }
  const known = new Set(terms.map((t) => t.slug));
  for (const t of terms) for (const r of t.related) if (!known.has(r)) throw new Error(`Invalid knowledge content: term "${t.slug}" links to unknown term "${r}"`);
  cache = {
    terms: terms.sort((a, b) => (a.term.ar ?? a.term.en ?? "").localeCompare(b.term.ar ?? b.term.en ?? "", "ar")),
    styles: styles.sort((a, b) => a.slug.localeCompare(b.slug)),
  };
  return cache;
}

export const getTerms = () => load().terms;
export const getTerm = (slug: string) => load().terms.find((t) => t.slug === slug) ?? null;
export const getStyles = () => load().styles;
export const getStyle = (slug: string) => load().styles.find((s) => s.slug === slug) ?? null;
/** Only items that may be shown to crawlers. */
export const publishedKnowledge = <T extends { draft: boolean }>(items: T[]) => items.filter((i) => !i.draft);
