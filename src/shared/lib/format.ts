import type { Locale } from "@/shared/i18n/locale";
import { localeToBcp47 } from "@/shared/i18n/locale";

export function formatSar(amount: unknown, locale: Locale = "ar"): string {
  const n = typeof amount === "number" ? amount : Number(amount ?? 0);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString(localeToBcp47(locale));
}

export function formatDate(iso: string, locale: Locale = "ar"): string {
  return new Date(iso).toLocaleDateString(localeToBcp47(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
