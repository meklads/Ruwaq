import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/request-quote", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/templates/sample", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const cityRoutes = MARKETPLACE_CITIES.map((city) => ({
    path: `/${city.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const seoRoutes = MARKETPLACE_CITIES.flatMap((city) =>
    MARKETPLACE_CATEGORIES.map((cat) => ({
      path: `/${city.slug}/${cat.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    }))
  );

  return [...staticRoutes, ...cityRoutes, ...seoRoutes].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
