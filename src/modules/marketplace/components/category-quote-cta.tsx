"use client";

import { QuoteRequestCtaButton } from "@/modules/marketplace/components/quote-request-cta-button";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  label: string;
  closeLabel: string;
  copy: Messages["marketplace"]["quote"];
  locale: Locale;
  citySlug: string;
  categorySlug: string;
};

export function CategoryQuoteCta({
  label,
  closeLabel,
  copy,
  locale,
  citySlug,
  categorySlug,
}: Props) {
  return (
    <QuoteRequestCtaButton
      triggerLabel={label}
      closeLabel={closeLabel}
      copy={copy}
      locale={locale}
      initialCity={citySlug}
      initialCategory={categorySlug}
      className="btn-ruwaq-primary mt-8 inline-flex"
    />
  );
}
