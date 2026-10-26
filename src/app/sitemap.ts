import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";

/**
 * Ruwaq v3 sitemap — only live owner/contractor pages.
 * Retired v1 routes (directory, cities, listings, tours, hubs, developers,
 * visualization, request-quote, how-we-match) redirect and are not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/check", priority: 0.95, changeFrequency: "weekly" },
    { path: "/check/sample", priority: 0.85, changeFrequency: "monthly" },
    { path: "/estimate", priority: 0.9, changeFrequency: "monthly" },
    { path: "/checklist", priority: 0.85, changeFrequency: "monthly" },
    { path: "/project-file", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.75, changeFrequency: "monthly" },
    { path: "/charter", priority: 0.75, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.85, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/pro", priority: 0.75, changeFrequency: "monthly" },
    { path: "/join", priority: 0.7, changeFrequency: "monthly" },
    { path: "/proposals", priority: 0.75, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
    ...RUWQ_GUIDES.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
