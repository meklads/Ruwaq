export const QUOTE_CHECK_CITY_KEYS = ["jeddah", "makkah", "madinah", "other"] as const;
export const QUOTE_CHECK_PROJECT_KEYS = [
  "villa_fitout",
  "apartment_fitout",
  "renovation",
  "construction",
] as const;
export const QUOTE_CHECK_LEVEL_KEYS = ["economy", "standard", "luxury"] as const;
export const QUOTE_CHECK_PACKAGE_KEYS = ["free", "detailed"] as const;
export const QUOTE_CHECK_SIGNED_KEYS = ["no", "yes"] as const;

export type QuoteCheckCityKey = (typeof QUOTE_CHECK_CITY_KEYS)[number];
export type QuoteCheckProjectKey = (typeof QUOTE_CHECK_PROJECT_KEYS)[number];
export type QuoteCheckLevelKey = (typeof QUOTE_CHECK_LEVEL_KEYS)[number];
export type QuoteCheckPackageKey = (typeof QUOTE_CHECK_PACKAGE_KEYS)[number];
export type QuoteCheckSignedKey = (typeof QUOTE_CHECK_SIGNED_KEYS)[number];

export const QUOTE_CHECK_DETAILED_PRICE_SAR = 299;
