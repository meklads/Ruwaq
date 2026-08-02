import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import { CategoryIllustration } from "@/modules/marketplace/components/category-illustration";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["categories"];
  magazineCopy: Messages["marketplace"]["homeMagazine"];
  locale: Locale;
  defaultCitySlug?: string;
};

export function EditorialCategoryGrid({
  copy,
  magazineCopy,
  locale,
  defaultCitySlug = "jeddah",
}: Props) {
  const city = MARKETPLACE_CITIES.find((c) => c.slug === defaultCitySlug);
  const cityName = city ? (locale === "ar" ? city.nameAr : city.nameEn) : "";

  return (
    <section id="categories" className="ruwaq-ad-section scroll-mt-28 border-t border-neutral-200">
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{magazineCopy.trendingEyebrow}</p>
            <h2 className="ruwaq-ad-section-title">{magazineCopy.trendingTitle}</h2>
            <p className="ruwaq-ad-section-lead">{copy.subtitle}</p>
          </div>
          <Link href="/categories" className="ruwaq-pro-btn-outline hidden px-5 py-2 sm:inline-flex">
            {magazineCopy.allSectors}
          </Link>
        </header>

        <div className="mt-10 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const catName = locale === "ar" ? cat.nameAr : cat.nameEn;

            return (
              <Link
                key={cat.slug}
                href={`/${defaultCitySlug}/${cat.slug}`}
                className="group flex min-h-[180px] flex-col bg-white transition-colors hover:bg-neutral-50"
              >
                <CategoryIllustration slug={cat.slug} className="transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="ruwaq-ad-eyebrow">
                    {locale === "en" ? cityName.toUpperCase() : cityName}
                  </p>
                  <h3 className="ruwaq-ad-card-title mt-2">{catName}</h3>
                  <p className="mt-auto pt-4 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-950">
                    {locale === "ar" ? "استكشف ←" : "Explore →"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
