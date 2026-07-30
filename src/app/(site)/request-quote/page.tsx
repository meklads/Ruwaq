import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";
import {
  parseCategorySlug,
  parseCitySlug,
  parseQuoteIntent,
} from "@/modules/marketplace/lib/marketplace-slugs";

type Props = {
  searchParams: { city?: string; category?: string };
};

export default async function RequestQuotePage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const initialIntent = parseQuoteIntent(searchParams.category);

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <QuoteRequestForm
          copy={t.marketplace.quote}
          visualizationCopy={t.marketplace.visualization}
          locale={locale}
          initialCity={parseCitySlug(searchParams.city)}
          initialCategory={
            initialIntent === "visualization" ? "fit-out" : parseCategorySlug(searchParams.category)
          }
          initialIntent={initialIntent}
        />
      </div>
    </div>
  );
}
