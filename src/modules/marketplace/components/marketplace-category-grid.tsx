import Link from "next/link";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_CITIES,
} from "@/shared/constants/marketplace-taxonomy";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["categories"];
  locale: Locale;
  defaultCitySlug?: string;
};

export function MarketplaceCategoryGrid({
  copy,
  locale,
  defaultCitySlug = "jeddah",
}: Props) {
  const city = MARKETPLACE_CITIES.find((c) => c.slug === defaultCitySlug);

  return (
    <section id="categories" className="ruwaq-category-section scroll-mt-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="ruwaq-section-title text-center">
          {locale === "ar" ? (
            <>
              القطاعات <span className="ruwaq-section-title-accent">المعتمدة</span>
            </>
          ) : (
            <>
              Approved <span className="ruwaq-section-title-accent">sectors</span>
            </>
          )}
        </h2>
        <p className="ruwaq-section-lead">{copy.subtitle}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETPLACE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${defaultCitySlug}/${cat.slug}`}
              className="ruwaq-card-accent group flex flex-col rounded-3xl border border-ruwaq-stone/50 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-ruwaq-float"
            >
              <span className="text-3xl" aria-hidden>
                {cat.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ruwaq-ink">
                {locale === "ar" ? cat.nameAr : cat.nameEn}
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-ruwaq-ink-soft">
                {cat.subcategoriesAr.slice(0, 2).map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
              <span className="mt-4 text-sm font-semibold text-ruwaq-gold group-hover:underline">
                {locale === "ar" ? city?.nameAr : city?.nameEn} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
