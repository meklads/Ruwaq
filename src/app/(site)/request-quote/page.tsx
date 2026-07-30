import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { QuoteRequestForm } from "@/modules/marketplace/components/quote-request-form";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";

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
        initialCity={parseCitySlug(searchParams.city)}
        initialCategory={parseCategorySlug(searchParams.category)}
      />
    </div>
  );
}
