import { RUWQ_PUBLIC_EMAIL, RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
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
        ? "جهة مستقلة تمثّل مالك المشروع في التشطيب والبناء بجدة: فحص عروض الأسعار، وملف المشروع، ومرافقة التنفيذ حتى الاستلام."
        : "An independent owner's representative for fit-out and construction in Jeddah: quote checks, project files and supervised delivery.",
    areaServed: [
      { "@type": "City", name: "Jeddah" },
      { "@type": "City", name: "Makkah" },
      { "@type": "City", name: "Madinah" },
    ],
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
