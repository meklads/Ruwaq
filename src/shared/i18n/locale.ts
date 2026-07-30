export type Locale = "ar" | "en";

export const LOCALE_COOKIE = "ruwaq_locale";
export const defaultLocale: Locale = "ar";

/** Invisible chars that can trigger false Arabic-script matches (e.g. BOM). */
const INVISIBLE_LOCALE_CHARS = /[\uFEFF\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

/** Arabic letters — excludes digits/punctuation so English mode stays practical. */
const ARABIC_LETTERS_RE =
  /[\u0621-\u064A\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFC]/;
const LATIN_RE = /[a-zA-Z]/;

export function normalizeLocaleInput(text: string): string {
  return text.replace(INVISIBLE_LOCALE_CHARS, "");
}

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
  return ARABIC_LETTERS_RE.test(normalizeLocaleInput(text));
}

export function hasLatinScript(text: string): boolean {
  return LATIN_RE.test(normalizeLocaleInput(text));
}

export type LocaleTextError = "arabicOnly" | "englishOnly";

export function validateLocaleText(
  text: string,
  locale: Locale
): LocaleTextError | null {
  const trimmed = normalizeLocaleInput(text).trim();
  if (!trimmed) return null;

  if (locale === "ar" && hasLatinScript(trimmed)) return "arabicOnly";
  if (locale === "en" && hasArabicScript(trimmed)) return "englishOnly";
  return null;
}

export type ProposalTextField = "projectName" | "clientName" | "description";

export type ProposalFieldLocaleError = {
  error: LocaleTextError;
  field: ProposalTextField;
};

export function validateProposalFields(
  fields: { projectName: string; clientName: string; description: string },
  locale: Locale
): ProposalFieldLocaleError | null {
  for (const field of ["projectName", "clientName", "description"] as const) {
    const err = validateLocaleText(fields[field], locale);
    if (err) return { error: err, field };
  }
  return null;
}
