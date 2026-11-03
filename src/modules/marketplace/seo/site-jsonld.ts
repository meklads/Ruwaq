import {
  BEESMOTION_URL,
  GRAPHICS_HOUSE_URL,
  RUWQ_PUBLIC_EMAIL,
  RUWQ_PUBLIC_URL,
  TURRIVA_URL,
} from "@/shared/constants/brand";
import { DEFAULT_MARKETING_HERO } from "@/content/marketing-images";
import type { Locale } from "@/shared/i18n/locale";

export function buildOrganizationJsonLd(locale: Locale) {
  const name = locale === "ar" ? "رواق" : "Ruwaq";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: RUWQ_PUBLIC_URL,
    email: RUWQ_PUBLIC_EMAIL,
    logo: `${RUWQ_PUBLIC_URL}${DEFAULT_MARKETING_HERO}`,
    description:
      locale === "ar"
        ? "منصة استخبارات فرص تجارية تبدأ بالسوق السعودي. الرادار في مرحلة بناء الإصدار الداخلي ولم يُفتح للاستخدام التجاري بعد."
        : "Business-opportunity intelligence platform starting with the Saudi market. Radar is at the stage of building its internal release and has not been opened for commercial use.",
    areaServed: [
      { "@type": "City", name: "Jeddah" },
      { "@type": "City", name: "Makkah" },
      { "@type": "City", name: "Madinah" },
    ],
    sameAs: [TURRIVA_URL, GRAPHICS_HOUSE_URL, BEESMOTION_URL],
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  const name = locale === "ar" ? "رواق" : "Ruwaq";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: RUWQ_PUBLIC_URL,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${RUWQ_PUBLIC_URL}/categories?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
