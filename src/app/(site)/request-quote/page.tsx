import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";

type Props = {
  searchParams: { city?: string; category?: string };
};

export default async function RequestQuotePage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="app-content-area py-10 sm:py-14">
      <QuoteRequestForm
        copy={t.marketplace.quote}
        locale={locale}
        initialCity={searchParams.city ?? "jeddah"}
        initialCategory={searchParams.category ?? "fit-out"}
      />
    </div>
  );
}
