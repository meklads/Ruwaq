import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";
import { getEntities, getInsights, getUpdates, publishedOnly } from "@/modules/site/content/loader";
import { getStyles, getTerms, publishedKnowledge } from "@/modules/site/knowledge/loader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  type RouteEntry = {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
    lastModified?: Date;
  };

  // Only URLs that answer 200. next.config.mjs (v2 retirement) redirects the rest to "/",
  // so listing them caused "Page with redirect" in Search Console. Re-add when they return.
  const staticRoutes: RouteEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/radar", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/join", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/proposals", priority: 0.88, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.72, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" as const },
  ];

  const guideRoutes: RouteEntry[] = RUWQ_GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    priority: 0.78,
    changeFrequency: "monthly" as const,
  }));

  // Editorial sections: published items only (never previews); a section without items has no URL at all.
  const sectionRoutes = (list: string, items: { slug: string }[]): RouteEntry[] =>
    items.length === 0
      ? []
      : [
          { path: `/${list}`, priority: 0.8, changeFrequency: "weekly" as const },
          ...items.map((i) => ({ path: `/${list}/${i.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
        ];
  const contentRoutes: RouteEntry[] = [
    ...sectionRoutes("updates", publishedOnly(getUpdates())),
    ...sectionRoutes("insights", publishedOnly(getInsights())),
    ...sectionRoutes("specialists", publishedOnly(getEntities())),
    ...sectionRoutes("glossary", publishedKnowledge(getTerms())),
    // The atlas index is public from day one (the map of the 19 styles); style pages only once published.
    { path: "/atlas", priority: 0.8, changeFrequency: "weekly" as const },
    ...publishedKnowledge(getStyles()).map((st) => ({ path: `/atlas/${st.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  const allRoutes: RouteEntry[] = [...staticRoutes, ...contentRoutes, ...guideRoutes];

  return allRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
