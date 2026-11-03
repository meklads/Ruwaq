import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

/** Labels for the ready-proposals gallery; the hint and note describe full fictional samples. */
export function readyProposalsLabels(templates: Messages["templates"], locale: Locale) {
  const ar = locale === "ar";
  return {
    openSample: templates.openSample,
    openSampleHint: ar
      ? "اضغط على أي نموذج لمعاينته كاملًا. البيانات خيالية للتوضيح فقط."
      : "Click any sample to preview it in full. The data is fictional, for illustration only.",
    note: ar ? "نموذج كامل ببيانات خيالية لغرض العرض فقط." : "A full sample with fictional data, for illustration only.",
    previewLabel: templates.previewLabel,
    paletteTitle: templates.paletteTitle,
    paletteHint: templates.paletteHint,
    customColors: templates.customColors,
    primaryColor: templates.primaryColor,
    accentColor: templates.accentColor,
    surfaceColor: templates.surfaceColor,
    previewCta: templates.previewCta,
    closePreview: templates.closePreview,
    startWithLook: templates.startWithLook,
    subscribeHint: templates.subscribeHint,
  };
}
