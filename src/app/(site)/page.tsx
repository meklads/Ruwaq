import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { MarketingHero } from "@/modules/marketing/components/marketing-hero";
import { NewProposalForm } from "@/modules/proposal/components/new-proposal-form";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      <MarketingHero hero={t.sales.hero} locale={locale} primaryCtaHref="#create-proposal" />
      <NewProposalForm variant="embedded" />
    </>
  );
}
