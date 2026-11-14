import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "./ruwaq-v3.css";
import "./ruwaq-radar.css";
import "./ruwaq-polish.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@/shared/components/google-analytics";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";
import { localeDir } from "@/shared/i18n/locale";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { DEFAULT_MARKETING_HERO } from "@/content/marketing-images";

/**
 * Fonts are self-hosted in ./fonts.css (files in public/fonts/gf) so the production build never
 * downloads from Google: the Coolify server's fetch of fonts.googleapis.com failed and broke deploys.
 * Arabic stack: IBM Plex Sans Arabic primary, Tajawal as soft marketing fallback, Amiri for display.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { title, description } = getSiteCopy(locale).meta;

  return {
    robots: process.env.RUWAQ_PRIVATE_PREVIEW === "1" ? { index: false, follow: false } : undefined,
    title,
    description,
    metadataBase: new URL(RUWQ_PUBLIC_URL),
    // Google Search Console ownership (property https://ruwaq.co/). Public by design; keep it to stay verified.
    verification: { google: "VWf_PkqBx_tOvYyLm9G3Q2slT-B-bjGyKuoqxpWkQuA" },
    openGraph: {
      title,
      description,
      url: RUWQ_PUBLIC_URL,
      siteName: locale === "ar" ? "رواق" : "Ruwaq",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: DEFAULT_MARKETING_HERO,
          width: 1749,
          height: 899,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = localeDir(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      data-lang={locale}
    >
      <body
        className={`min-h-screen bg-white ${locale === "ar" ? "rw-font-ar" : "rw-font-latin"}`}
      >
        <GoogleAnalytics />
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
