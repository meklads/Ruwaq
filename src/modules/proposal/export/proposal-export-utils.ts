import type { Locale } from "@/shared/i18n/locale";
import { localeToBcp47 } from "@/shared/i18n/locale";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatAmount(amount: unknown, locale: Locale): string {
  const n = typeof amount === "number" ? amount : Number(amount ?? 0);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString(localeToBcp47(locale));
}

export function asciiFilename(name: string, fallback = "proposal"): string {
  const cleaned = name
    .replace(/[^\x20-\x7E]/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 80);
  return cleaned || fallback;
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string" ? item : String(item ?? "")
  );
}

export function asObjectList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && typeof item === "object") as Record<
    string,
    unknown
  >[];
}

import { normalizeAppUrl } from "@/shared/lib/request-url";

export function appBaseUrlFromEnv(): string {
  return normalizeAppUrl(
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL,
    "https://turriva.co"
  );
}
