import type { Locale } from "@/shared/i18n/locale";
import type { ProposalExportData } from "../proposal-export-types";
import { renderRuwaqTemplate } from "./ruwaq.template";
import { renderGraphicsHouseTemplate } from "./graphics-house.template";

export function renderProposalExportHtml(
  locale: Locale,
  data: ProposalExportData
): string {
  const templateId = data.templateId ?? "ruwaq";

  switch (templateId) {
    case "ruwaq":
    case "ruwaq_executive":
      return renderRuwaqTemplate(locale, data);
    case "graphics_house":
      return renderGraphicsHouseTemplate(locale, data);
    default:
      return renderRuwaqTemplate(locale, data);
  }
}
