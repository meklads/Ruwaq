import type { Locale } from "@/shared/i18n/locale";
import type { Localized } from "./schema";

export type Picked = { text: string; lang: Locale; fallback: boolean };

/**
 * Language policy: show the requested language when it exists; otherwise show the
 * other language and mark it as a fallback so the UI can say so. Nothing is machine-translated.
 */
export function pickText(l: Localized | undefined, locale: Locale): Picked | null {
  if (!l) return null;
  const primary = l[locale];
  if (primary) return { text: primary, lang: locale, fallback: false };
  const other: Locale = locale === "ar" ? "en" : "ar";
  const alt = l[other];
  return alt ? { text: alt, lang: other, fallback: true } : null;
}

export function availableLocales(l: Localized): Locale[] {
  return (["ar", "en"] as const).filter((k) => Boolean(l[k]));
}
