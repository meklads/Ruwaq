import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import { PROJECT_TOURS } from "@/content/project-tours";
import { RUWQ_GUIDES } from "@/content/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  type RouteEntry = {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
    lastModified?: Date;
  };

  const staticRoutes: RouteEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/request-quote", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/categories", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/tours", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/visualization", priority: 0.88, changeFrequency: "weekly" as const },
    { path: "/join", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" as const },
  ];

  const tourRoutes: RouteEntry[] = PROJECT_TOURS.map((t) => ({
    path: `/tours/${t.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const guideRoutes: RouteEntry[] = RUWQ_GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    priority: 0.78,
    changeFrequency: "monthly" as const,
  }));

  const cityRoutes: RouteEntry[] = MARKETPLACE_CITIES.map((city) => ({
    path: `/${city.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const seoRoutes: RouteEntry[] = MARKETPLACE_CITIES.flatMap((city) =>
    MARKETPLACE_CATEGORIES.map((cat) => ({
      path: `/${city.slug}/${cat.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    }))
  );

  let listingRoutes: RouteEntry[] = [];

  try {
    const listings = await db.providerListing.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    listingRoutes = listings.map((l) => ({
      path: `/listing/${l.slug}`,
      priority: 0.75,
      changeFrequency: "weekly" as const,
      lastModified: l.updatedAt,
    }));
  } catch {
    listingRoutes = [];
  }

  const allRoutes: RouteEntry[] = [
    ...staticRoutes,
    ...cityRoutes,
    ...seoRoutes,
    ...tourRoutes,
    ...guideRoutes,
    ...listingRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
