import type { Metadata } from "next";
import type { ProviderListing, ServiceCategory } from "@prisma/client";
import type { JeddahSectorLanding } from "@/content/jeddah-landings/types";
import type { Locale } from "@/shared/i18n/locale";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
  type MarketplaceCitySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { appBaseUrlFromEnv } from "@/modules/proposal/export/proposal-export-utils";
import {
  absoluteMarketingImage,
  categoryImageForSlug,
  DEFAULT_MARKETING_HERO,
} from "@/content/marketing-images";

type CityMeta = NonNullable<ReturnType<typeof getCityBySlug>>;
type CatMeta = NonNullable<ReturnType<typeof getCategoryBySlug>>;

const KSA_COUNTRY = "SA";

function canonical(path: string): string {
  const base = appBaseUrlFromEnv().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function marketplaceCategoryTitle(
  locale: Locale,
  city: CityMeta,
  cat: CatMeta
): string {
  if (locale === "ar") {
    return `أفضل شركات ${cat.nameAr} في ${city.nameAr} | منصة رواق`;
  }
  return `Best ${cat.nameEn} companies in ${city.nameEn} | Ruwaq`;
}

export function marketplaceCategoryDescription(
  locale: Locale,
  city: CityMeta,
  cat: CatMeta,
  listingCount: number
): string {
  if (locale === "ar") {
    const countPhrase =
      listingCount > 0
        ? `${listingCount} ${listingCount === 1 ? "شركة معتمدة" : "شركات معتمدة"}`
        : "شركات معتمدة";
    return (
      `دليل ${cat.nameAr} في ${city.nameAr}، ${countPhrase} للفلل والفنادق والمشاريع العقارية. ` +
      `قارن المزودين واطلب عرض سعر مجاناً خلال 24 ساعة عبر منصة رواق في المنطقة الغربية.`
    );
  }
  const countPhrase =
    listingCount > 0 ? `${listingCount} verified provider(s)` : "verified providers";
  return (
    `Ruwaq directory for ${cat.nameEn} in ${city.nameEn}, ${countPhrase} for villas, hotels, and property projects. ` +
    `Compare providers and request a free quote within 24 hours across Western Region KSA.`
  );
}

export function buildCategoryListingMetadata(opts: {
  locale: Locale;
  citySlug: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
  listingCount: number;
}): Metadata {
  const city = getCityBySlug(opts.citySlug);
  const cat = getCategoryBySlug(opts.categorySlug);
  if (!city || !cat) return {};

  const title = marketplaceCategoryTitle(opts.locale, city, cat);
  const description = marketplaceCategoryDescription(
    opts.locale,
    city,
    cat,
    opts.listingCount
  );
  const path = `/${city.slug}/${cat.slug}`;
  const url = canonical(path);
  const ogImage = absoluteMarketingImage(
    categoryImageForSlug(cat.slug),
    appBaseUrlFromEnv()
  );

  const keywordsAr = [
    cat.nameAr,
    city.nameAr,
    "مقاولين",
    "عروض أسعار",
    "عقار",
    "المنطقة الغربية",
    "رواق",
  ];
  const keywordsEn = [
    cat.nameEn,
    city.nameEn,
    "contractors",
    "quotes",
    "Saudi Arabia",
    "Western Region",
    "Ruwaq",
  ];

  return {
    title,
    description,
    keywords: opts.locale === "ar" ? keywordsAr : keywordsEn,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: opts.locale === "ar" ? "رواق" : "Ruwaq",
      locale: opts.locale === "ar" ? "ar_SA" : "en_SA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true     },
  };
}

export function buildJeddahLandingMetadata(opts: {
  locale: Locale;
  landing: JeddahSectorLanding;
  path: string;
}): Metadata {
  const cat = getCategoryBySlug(opts.landing.categorySlug);
  const title = opts.locale === "ar" ? opts.landing.metaTitleAr : opts.landing.metaTitleEn;
  const description =
    opts.locale === "ar" ? opts.landing.metaDescriptionAr : opts.landing.metaDescriptionEn;
  const url = canonical(opts.path);
  const ogImage = absoluteMarketingImage(
    categoryImageForSlug(opts.landing.categorySlug),
    appBaseUrlFromEnv()
  );

  const keywordsAr = cat
    ? [cat.nameAr, "جدة", "مقاولين", "3 مقاولين", "رواق", ...opts.landing.metaDescriptionAr.split(" ").slice(0, 6)]
    : ["جدة", "رواق"];
  const keywordsEn = cat
    ? [cat.nameEn, "Jeddah", "contractors", "Ruwaq", ...opts.landing.metaDescriptionEn.split(" ").slice(0, 6)]
    : ["Jeddah", "Ruwaq"];

  return {
    title,
    description,
    keywords: opts.locale === "ar" ? keywordsAr : keywordsEn,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: opts.locale === "ar" ? "رواق" : "Ruwaq",
      locale: opts.locale === "ar" ? "ar_SA" : "en_SA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildCategoryItemListJsonLd(opts: {
  locale: Locale;
  citySlug: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
  listings: Pick<ProviderListing, "slug" | "titleAr" | "titleEn">[];
}): Record<string, unknown> {
  const city = getCityBySlug(opts.citySlug)!;
  const cat = getCategoryBySlug(opts.categorySlug)!;
  const pageUrl = canonical(`/${city.slug}/${cat.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: marketplaceCategoryTitle(opts.locale, city, cat),
    description: marketplaceCategoryDescription(
      opts.locale,
      city,
      cat,
      opts.listings.length
    ),
    url: pageUrl,
    numberOfItems: opts.listings.length,
    itemListElement: opts.listings.map((listing, index) => {
      const name =
        opts.locale === "ar"
          ? listing.titleAr
          : listing.titleEn ?? listing.titleAr;
      return {
        "@type": "ListItem",
        position: index + 1,
        url: canonical(`/listing/${listing.slug}`),
        name,
      };
    }),
  };
}

export function buildCategoryCollectionJsonLd(opts: {
  locale: Locale;
  citySlug: MarketplaceCitySlug;
  categorySlug: MarketplaceCategorySlug;
}): Record<string, unknown> {
  const city = getCityBySlug(opts.citySlug)!;
  const cat = getCategoryBySlug(opts.categorySlug)!;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: marketplaceCategoryTitle(opts.locale, city, cat),
    description: marketplaceCategoryDescription(opts.locale, city, cat, 0),
    url: canonical(`/${city.slug}/${cat.slug}`),
    inLanguage: opts.locale === "ar" ? "ar-SA" : "en-SA",
    isPartOf: {
      "@type": "WebSite",
      name: opts.locale === "ar" ? "رواق" : "Ruwaq",
      url: canonical("/"),
    },
  };
}

export function marketplaceListingTitle(
  locale: Locale,
  listing: Pick<ProviderListing, "titleAr" | "titleEn">,
  city: CityMeta,
  cat: CatMeta
): string {
  const name = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;
  if (locale === "ar") {
    return `${name}، ${cat.nameAr} في ${city.nameAr} | رواق`;
  }
  return `${name}, ${cat.nameEn} in ${city.nameEn} | Ruwaq`;
}

export function marketplaceListingDescription(
  locale: Locale,
  listing: Pick<ProviderListing, "descriptionAr" | "descriptionEn">,
  city: CityMeta,
  cat: CatMeta
): string {
  const body =
    locale === "ar"
      ? listing.descriptionAr
      : listing.descriptionEn ?? listing.descriptionAr;
  const trimmed = body.replace(/\s+/g, " ").trim().slice(0, 155);
  if (locale === "ar") {
    return `${trimmed}… شركة ${cat.nameAr} معتمدة في ${city.nameAr} على منصة رواق.`;
  }
  return `${trimmed}… Verified ${cat.nameEn} provider in ${city.nameEn} on Ruwaq.`;
}

export function buildProviderListingMetadata(
  listing: ProviderListing & { category: ServiceCategory },
  locale: Locale
): Metadata {
  const citySlug = citySlugFromEnum(listing.city);
  const city = getCityBySlug(citySlug)!;
  const catMeta = getCategoryBySlug(listing.category.slug as MarketplaceCategorySlug);
  const catForSeo = (catMeta ?? {
    slug: listing.category.slug as MarketplaceCategorySlug,
    nameAr: listing.category.nameAr,
    nameEn: listing.category.nameEn,
    icon: listing.category.icon,
    subcategoriesAr: [] as string[],
    subcategoriesEn: [] as string[],
    turrivaCapture: listing.category.slug === "fit-out" || listing.category.slug === "contracting",
  }) as CatMeta;

  const title = marketplaceListingTitle(locale, listing, city, catForSeo);
  const description = marketplaceListingDescription(locale, listing, city, catForSeo);
  const path = `/listing/${listing.slug}`;
  const url = canonical(path);

  const images = parseListingImages(listing.images);
  const base = appBaseUrlFromEnv();
  const fallbackImage = absoluteMarketingImage(
    categoryImageForSlug(listing.category.slug),
    base
  );
  const ogImage =
    images.length > 0
      ? images[0]!.startsWith("http")
        ? images[0]!
        : absoluteMarketingImage(images[0]!, base)
      : fallbackImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    robots: { index: true, follow: true },
  };
}

function parseListingImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images.filter((u): u is string => typeof u === "string" && u.length > 0);
}

function localityForCity(city: CityMeta, locale: Locale): string {
  return locale === "ar" ? city.nameAr : city.nameEn;
}

export function buildProviderLocalBusinessJsonLd(
  listing: ProviderListing & { category: ServiceCategory },
  locale: Locale
): Record<string, unknown> {
  const citySlug = citySlugFromEnum(listing.city);
  const city = getCityBySlug(citySlug)!;
  const cat = getCategoryBySlug(listing.category.slug as MarketplaceCategorySlug);
  const name = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;
  const images = parseListingImages(listing.images);
  const pageUrl = canonical(`/listing/${listing.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name,
    description:
      locale === "ar"
        ? listing.descriptionAr.slice(0, 500)
        : (listing.descriptionEn ?? listing.descriptionAr).slice(0, 500),
    url: pageUrl,
    telephone: listing.phone,
    image: images.length > 0 ? images : undefined,
    address: listing.address
      ? {
          "@type": "PostalAddress",
          streetAddress: listing.address,
          addressLocality: localityForCity(city, locale),
          addressCountry: KSA_COUNTRY,
        }
      : {
          "@type": "PostalAddress",
          addressLocality: localityForCity(city, locale),
          addressCountry: KSA_COUNTRY,
        },
    areaServed: {
      "@type": "City",
      name: localityForCity(city, locale),
      containedInPlace: {
        "@type": "Country",
        name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia",
      },
    },
    ...(listing.isVerified
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: locale === "ar" ? "معتمد على رواق" : "Ruwaq verified",
            value: "true",
          },
        }
      : {}),
    parentOrganization: {
      "@type": "Organization",
      name: locale === "ar" ? "رواق" : "Ruwaq",
      url: canonical("/"),
    },
    knowsAbout: cat
      ? locale === "ar"
        ? cat.nameAr
        : cat.nameEn
      : listing.category.nameAr,
  };
}

export function buildProviderServiceJsonLd(
  listing: ProviderListing & { category: ServiceCategory },
  locale: Locale
): Record<string, unknown> {
  const citySlug = citySlugFromEnum(listing.city);
  const city = getCityBySlug(citySlug)!;
  const cat = getCategoryBySlug(listing.category.slug as MarketplaceCategorySlug);
  const serviceName =
    cat != null
      ? locale === "ar"
        ? cat.nameAr
        : cat.nameEn
      : listing.category.nameAr;
  const pageUrl = canonical(`/listing/${listing.slug}`);
  const providerName =
    locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: serviceName,
    description:
      locale === "ar"
        ? listing.descriptionAr.slice(0, 400)
        : (listing.descriptionEn ?? listing.descriptionAr).slice(0, 400),
    url: pageUrl,
    serviceType: serviceName,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${pageUrl}#localbusiness`,
      name: providerName,
      telephone: listing.phone,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: localityForCity(city, locale),
      containedIn: {
        "@type": "Country",
        name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia",
      },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: pageUrl,
      servicePhone: listing.phone,
    },
  };
}

export function buildProviderListingJsonLdGraph(
  listing: ProviderListing & { category: ServiceCategory },
  locale: Locale
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildProviderLocalBusinessJsonLd(listing, locale),
      buildProviderServiceJsonLd(listing, locale),
    ],
  };
}
