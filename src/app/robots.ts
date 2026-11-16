import type { MetadataRoute } from "next";
import { env } from "@/shared/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_APP_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/proposals/",
          "/settings/",
          "/admin/",
          // App area behind the pre-launch gate (401 for crawlers). Legacy /admin, /settings and
          // /leads redirect into it, so keep crawlers out instead of letting them report 401.
          "/workspace/",
          "/leads",
          "/login",
          "/join/status/",
          "/quote/status/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
