export type Locale = "ar" | "en";

export const LOCALE_COOKIE = "ruwaq_locale";
export const defaultLocale: Locale = "ar";

const ARABIC_RE =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LATIN_RE = /[a-zA-Z]/;

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ar" || value === "en";
}

export function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localeToBcp47(locale: Locale): string {
  return locale === "ar" ? "ar-SA" : "en-US";
}

export function hasArabicScript(text: string): boolean {
  return ARABIC_RE.test(text);
}

export function hasLatinScript(text: string): boolean {
  return LATIN_RE.test(text);
}

export type LocaleTextError = "arabicOnly" | "englishOnly";

export function validateLocaleText(
  text: string,
  locale: Locale
): LocaleTextError | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (locale === "ar" && hasLatinScript(trimmed)) return "arabicOnly";
  if (locale === "en" && hasArabicScript(trimmed)) return "englishOnly";
  return null;
}

export function validateProposalFields(
  fields: { projectName: string; clientName: string; description: string },
  locale: Locale
): LocaleTextError | null {
  for (const value of [fields.projectName, fields.clientName, fields.description]) {
    const err = validateLocaleText(value, locale);
    if (err) return err;
  }
  return null;
}
