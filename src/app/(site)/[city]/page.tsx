import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  getCityBySlug,
  MARKETPLACE_CATEGORIES,
} from "@/shared/constants/marketplace-taxonomy";

type Props = { params: { city: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? `شركات معتمدة في ${city.nameAr} | منصة رواق`
      : `Verified providers in ${city.nameEn} | Ruwaq`;
  return { title, description: city.nameAr };
}

export default async function CityHubPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="app-content-area max-w-6xl">
      <h1 className="ruwaq-app-title">
        {locale === "ar" ? city.nameAr : city.nameEn}
      </h1>
      <p className="mt-2 text-ruwaq-ink-soft">{t.marketplace.categories.subtitle}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MARKETPLACE_CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${city.slug}/${cat.slug}`}
              className="block rounded-2xl border border-ruwaq-stone/50 p-5 hover:border-ruwaq-gold/40"
            >
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="mt-2 font-bold">
                {locale === "ar" ? cat.nameAr : cat.nameEn}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
