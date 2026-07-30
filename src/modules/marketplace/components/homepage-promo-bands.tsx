import type { Locale } from "@/shared/i18n/locale";
import { ContractorToolsPromoRow } from "@/modules/marketplace/components/contractor-tools-promo-row";
import { PartnerPromoRow } from "@/modules/marketplace/components/partner-promo-row";

type Props = {
  locale: Locale;
};

/** Homepage partner ad bands — desktop side-by-side rows, mobile horizontal snap per row. */
export function HomepagePromoBands({ locale }: Props) {
  return (
    <div className="ruwaq-ad-partner-bands scroll-mt-28">
      <PartnerPromoRow locale={locale} />
      <ContractorToolsPromoRow locale={locale} />
    </div>
  );
}
