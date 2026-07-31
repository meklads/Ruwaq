import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { CATEGORY_IMAGES } from "@/content/marketing-images";
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
  const description =
    locale === "ar"
      ? `تصفّح ${MARKETPLACE_CATEGORIES.length} قطاعات في ${city.nameAr} واطلب عرض سعر مجاناً.`
      : `Browse ${MARKETPLACE_CATEGORIES.length} sectors in ${city.nameEn} and request a free quote.`;
  return { title, description };
}

export default async function CityHubPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
  const locale = await getLocale();
  const t = getMessages(locale);
  const cityName = locale === "ar" ? city.nameAr : city.nameEn;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content py-12 lg:py-16">
        <header className="ruwaq-ad-section-header max-w-3xl">
          <p className="ruwaq-ad-eyebrow">{t.marketplace.homeMagazine.trendingEyebrow}</p>
          <h1 className="ruwaq-ad-section-title">{cityName}</h1>
          <p className="ruwaq-ad-section-lead">{t.marketplace.categories.subtitle}</p>
        </header>

        <ul className="mt-10 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const imageSrc = CATEGORY_IMAGES[cat.slug];
            const catName = locale === "ar" ? cat.nameAr : cat.nameEn;

            return (
              <li key={cat.slug}>
                <Link
                  href={`/${city.slug}/${cat.slug}`}
                  className="group flex h-full flex-col bg-white transition-colors hover:bg-neutral-50"
                >
                  {imageSrc ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={imageSrc}
                        alt={catName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="ruwaq-ad-card-title">{catName}</h2>
                    <p className="mt-auto pt-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-950">
                      {locale === "ar" ? "استكشف ←" : "Explore →"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
