import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { MarketplaceCategoryGrid } from "@/modules/marketplace/components/marketplace-category-grid";

export default async function CategoriesPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="py-6 sm:py-10">
      <MarketplaceCategoryGrid copy={t.marketplace.categories} locale={locale} />
    </div>
  );
}
