import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";
import { db } from "@/shared/lib/db";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";

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
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
  ];

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
    ...listingRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
