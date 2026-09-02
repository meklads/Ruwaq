import type { Locale } from "@/shared/i18n/locale";
import {
  parseLetterheadFrameId,
  renderExactLetterheadHtml,
  type LetterheadFrameId,
} from "./letterhead-frames";
import { appBaseUrlFromEnv } from "./proposal-export-utils";

export function renderLetterheadStudioHtml(options: {
  locale: Locale;
  frameId?: LetterheadFrameId | string;
  centerWatermark?: boolean;
  appBaseUrl?: string;
}): string {
  return renderExactLetterheadHtml({
    locale: options.locale === "en" ? "en" : "ar",
    frameId: parseLetterheadFrameId(options.frameId),
    appBaseUrl: options.appBaseUrl ?? appBaseUrlFromEnv(),
    centerWatermark: options.centerWatermark,
  });
}
