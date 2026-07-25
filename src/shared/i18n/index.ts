import { ar } from "./messages/ar";
import { en } from "./messages/en";
import type { Messages } from "./messages/types";
import type { Locale } from "./locale";
export { defaultLocale, type Locale } from "./locale";

const catalogs: Record<Locale, Messages> = { ar, en };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

/** @deprecated Use getMessages(locale) in server components or useT() in client */
export const t = ar;

export type { Messages };
