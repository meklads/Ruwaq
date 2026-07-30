import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { EditorialCategoryGrid } from "@/modules/marketplace/components/editorial-category-grid";

export default async function CategoriesPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="ruwaq-ad-page">
      <EditorialCategoryGrid
        copy={t.marketplace.categories}
        magazineCopy={t.marketplace.homeMagazine}
        locale={locale}
      />
    </div>
  );
}
