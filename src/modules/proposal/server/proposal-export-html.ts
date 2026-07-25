import type { Locale } from "@/shared/i18n/locale";
import type { ProposalExportData } from "../export/proposal-export-types";
import { renderProposalExportHtml } from "../export/templates";
import {
  appBaseUrlFromEnv,
  asciiFilename,
  asObjectList,
  asStringList,
  escapeHtml,
  formatAmount,
} from "../export/proposal-export-utils";

export {
  appBaseUrlFromEnv,
  asciiFilename,
  asObjectList,
  asStringList,
  escapeHtml,
  formatAmount,
};

export function buildProposalExportHtml(
  locale: Locale,
  data: Omit<ProposalExportData, "appBaseUrl" | "templateId"> & {
    appBaseUrl?: string;
    templateId?: ProposalExportData["templateId"];
  }
): string {
  return renderProposalExportHtml(locale, {
    ...data,
    appBaseUrl: data.appBaseUrl ?? appBaseUrlFromEnv(),
    templateId: data.templateId ?? "ruwaq",
    platformBranding: data.platformBranding ?? false,
  });
}
