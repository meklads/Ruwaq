import type { Metadata } from "next";
import {
  Amiri,
  Aref_Ruqaa,
  IBM_Plex_Sans_Arabic,
  Inter,
  Montserrat,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import "./ruwaq-v3.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@/shared/components/google-analytics";
import { getLocale } from "@/shared/i18n/server";
import { localeDir } from "@/shared/i18n/locale";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { DEFAULT_MARKETING_HERO } from "@/content/marketing-images";

/**
 * Arabic stack: IBM Plex Sans Arabic primary (Saudi DGA / institutional feel —
 * closest free stand-in for Vision 2030’s licensed 29LT Bukra; we do not embed Bukra).
 * Tajawal kept as soft marketing fallback.
 */
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800"],
  variable: "--font-ar-alt",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ar-display",
  display: "swap",
});

/** Reviewer's handwriting — used only inside the hero quote-sheet illustration. */
const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin-display",
  display: "swap",
});

/** Marketing site, matches Graphics House ProjectLaunch™ stack (Inter on GH; Plus Jakarta on Ruwaq EN) */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-marketing-latin",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? "رواق | شريكك المستقل في مشاريع التشطيب والبناء بجدة"
      : "Ruwaq | Your independent partner in fit-out and construction, Jeddah";
  const description =
    locale === "ar"
      ? "نراجع عروض المقاولين، ونعدّ مواصفات مشروعك، ونرافقك حتى الاستلام النهائي، لتدفع مقابل عمل أُنجِز بالمواصفات التي اخترتها."
      : "We review contractor quotes, define your specifications and stay with you until handover, so you pay for work done to the specs you chose.";

  return {
    title,
    description,
    metadataBase: new URL(RUWQ_PUBLIC_URL),
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
      className={`${tajawal.variable} ${ibmPlexArabic.variable} ${amiri.variable} ${arefRuqaa.variable} ${inter.variable} ${montserrat.variable} ${playfair.variable} ${plusJakarta.variable}`}
    >
      <body
        className={`min-h-screen bg-white ${locale === "ar" ? ibmPlexArabic.className : plusJakarta.className}`}
      >
        <GoogleAnalytics />
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
