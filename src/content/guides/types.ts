import type { MarketplaceCitySlug, MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";

export type GuideChartItem = {
  label: string;
  value: number;
  max?: number;
};

export type GuideSource = {
  label: string;
  url: string;
};

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "chart"; caption?: string; unit?: string; items: GuideChartItem[] }
  | { type: "callout"; variant: "tip" | "warning" | "fact"; title: string; text: string }
  | { type: "cta"; lead?: string; label: string; href: string }
  | { type: "sources"; title: string; items: GuideSource[] };

export type RuwaqGuide = {
  slug: string;
  citySlug?: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  seoKeywordsAr: string[];
  seoKeywordsEn: string[];
  readMinutes: number;
  heroImage: string;
  blocksAr: GuideBlock[];
  blocksEn: GuideBlock[];
  publishedAt: string;
  updatedAt: string;
};

export function guideCtaHref(guide: Pick<RuwaqGuide, "citySlug" | "categorySlug">): string {
  return guide.citySlug ? `/${guide.citySlug}/${guide.categorySlug}` : `/jeddah/${guide.categorySlug}`;
}

export function countGuideWords(blocks: GuideBlock[]): number {
  let count = 0;
  for (const block of blocks) {
    switch (block.type) {
      case "p":
      case "h2":
      case "h3":
        count += block.text.split(/\s+/).length;
        break;
      case "ul":
      case "ol":
        count += block.items.join(" ").split(/\s+/).length;
        break;
      case "callout":
        count += `${block.title} ${block.text}`.split(/\s+/).length;
        break;
      case "cta":
        count += `${block.lead ?? ""} ${block.label}`.split(/\s+/).length;
        break;
      case "table":
        count += [...block.headers, ...block.rows.flat()].join(" ").split(/\s+/).length;
        break;
      default:
        break;
    }
  }
  return count;
}
