import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/shared/lib/db";
import { getLocale } from "@/shared/i18n/server";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import {
  buildProviderListingJsonLdGraph,
  buildProviderListingMetadata,
} from "@/modules/marketplace/seo/marketplace-seo";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await db.providerListing.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!listing) return {};
  const locale = await getLocale();
  return buildProviderListingMetadata(listing, locale);
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await db.providerListing.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!listing) notFound();
  const locale = await getLocale();
  const title = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;
  const description =
    locale === "ar"
      ? listing.descriptionAr
      : listing.descriptionEn ?? listing.descriptionAr;

  const citySlug = citySlugFromEnum(listing.city);
  const city = getCityBySlug(citySlug);
  const catMeta = getCategoryBySlug(listing.category.slug as MarketplaceCategorySlug);
  const cityName = city ? (locale === "ar" ? city.nameAr : city.nameEn) : "";
  const catName = catMeta
    ? locale === "ar"
      ? catMeta.nameAr
      : catMeta.nameEn
    : listing.category.nameAr;

  const jsonLd = buildProviderListingJsonLdGraph(listing, locale);

  const digits = listing.whatsapp.replace(/\D/g, "");
  const waIntl = digits.startsWith("966") ? digits : `966${digits.replace(/^0/, "")}`;
  const waText =
    locale === "ar"
      ? `مرحباً، أتواصل عبر منصة رواق بخصوص: ${title}`
      : `Hello, contacting via Ruwaq about: ${title}`;
  const waHref = `https://wa.me/${waIntl}?text=${encodeURIComponent(waText)}`;

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="app-content-area max-w-3xl">
        <nav className="text-sm text-ruwaq-ink-muted">
          <Link href="/" className="hover:text-ruwaq-gold">
            {locale === "ar" ? "رواق" : "Ruwaq"}
          </Link>
          {city && catMeta ? (
            <>
              <span className="mx-2">/</span>
              <Link href={`/${city.slug}/${catMeta.slug}`} className="hover:text-ruwaq-gold">
                {catName} · {cityName}
              </Link>
            </>
          ) : null}
        </nav>
        <h1 className="ruwaq-app-title mt-4">{title}</h1>
        {listing.isVerified ? (
          <p className="mt-2 text-sm font-semibold text-emerald-800">
            {locale === "ar" ? "✓ شركة معتمدة على رواق" : "✓ Ruwaq verified provider"}
          </p>
        ) : null}
        <p className="mt-6 whitespace-pre-wrap leading-relaxed text-ruwaq-ink-soft">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ruwaq-primary px-6 py-3"
          >
            {locale === "ar" ? "واتساب" : "WhatsApp"}
          </a>
          {city && catMeta ? (
            <Link
              href={`/${city.slug}/${catMeta.slug}`}
              className="btn-ruwaq-secondary px-6 py-3"
            >
              {locale === "ar" ? "← العودة للدليل" : "← Back to directory"}
            </Link>
          ) : null}
        </div>
        <p className="mt-8 text-sm text-ruwaq-ink-muted">
          {listing.phone}
          {listing.address ? ` · ${listing.address}` : null}
        </p>
      </div>
    </>
  );
}
