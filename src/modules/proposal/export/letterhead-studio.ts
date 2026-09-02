import type { Locale } from "@/shared/i18n/locale";
import {
  parseLetterheadFrameId,
  renderExactLetterheadHtml,
  type LetterheadFrameId,
} from "./letterhead-frames";
import { resolveTemplatePalette } from "./template-palettes";
import { appBaseUrlFromEnv } from "./proposal-export-utils";

export function renderLetterheadStudioHtml(options: {
  locale: Locale;
  frameId?: LetterheadFrameId | string;
  centerWatermark?: boolean;
  appBaseUrl?: string;
  paletteId?: string | null;
  primary?: string | null;
  accent?: string | null;
}): string {
  const palette = resolveTemplatePalette({
    paletteId: options.paletteId,
    primary: options.primary,
    accent: options.accent,
  });

  return renderExactLetterheadHtml({
    locale: options.locale === "en" ? "en" : "ar",
    frameId: parseLetterheadFrameId(options.frameId),
    appBaseUrl: options.appBaseUrl ?? appBaseUrlFromEnv(),
    centerWatermark: options.centerWatermark,
    primary: palette.primary,
    accent: palette.accent,
  });
}
