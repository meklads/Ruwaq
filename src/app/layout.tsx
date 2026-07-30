import type { Metadata } from "next";
import {
  Amiri,
  IBM_Plex_Sans_Arabic,
  Inter,
  Montserrat,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getLocale } from "@/shared/i18n/server";
import { localeDir } from "@/shared/i18n/locale";
import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";

/** Graphics House ProjectLaunch™ — Tajawal primary, IBM Plex Sans Arabic fallback */
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-ar",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ar-alt",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ar-display",
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

/** Marketing site — matches Graphics House ProjectLaunch™ stack (Inter on GH; Plus Jakarta on Ruwaq EN) */
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
      ? "رواق | منصة الهندسة والعقار — المنطقة الغربية"
      : "Ruwaq | Engineering & property marketplace — Western Region";
  const description =
    locale === "ar"
      ? "دليل مقاولات وتكييف وتشطيبات معتمد في جدة ومكة والمدينة — مع أداة عروض احترافية للمقاولين."
      : "Verified contractors directory in Jeddah, Makkah, and Madinah — plus AI proposal builder.";

  return {
    title,
    description,
    metadataBase: new URL(RUWQ_PUBLIC_URL),
    openGraph: {
      title,
      description,
      url: RUWQ_PUBLIC_URL,
      siteName: "Ruwaq",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
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
      className={`${tajawal.variable} ${ibmPlexArabic.variable} ${amiri.variable} ${inter.variable} ${montserrat.variable} ${playfair.variable} ${plusJakarta.variable}`}
    >
      <body
        className={`min-h-screen bg-white ${locale === "ar" ? tajawal.className : plusJakarta.className}`}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
