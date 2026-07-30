"use client";

import { QuoteRequestModal } from "@/modules/marketplace/components/quote-request-modal";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  triggerLabel: string;
  closeLabel: string;
  copy: Messages["marketplace"]["quote"];
  visualizationCopy: Messages["marketplace"]["visualization"];
  locale: Locale;
  className?: string;
  initialCity?: string;
  initialCategory?: string;
  initialIntent?: "marketplace" | "visualization";
};

/** Single quote action — reuse in header, hero, and contextual pages (not duplicated in footer/about). */
export function QuoteRequestCtaButton(props: Props) {
  return <QuoteRequestModal {...props} />;
}
