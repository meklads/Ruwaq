import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/shared/lib/db";
import { getLocale } from "@/shared/i18n/server";
import { getMessages } from "@/shared/i18n";
import {
  citySlugFromEnum,
  getCategoryBySlug,
  getCityBySlug,
  type MarketplaceCategorySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { JsonLdScript } from "@/modules/marketplace/components/json-ld-script";
import { RuwaqProBadge } from "@/modules/marketplace/components/ruwaq-pro-badge";
import { ListingGallery } from "@/modules/marketplace/components/listing-gallery";
import { listingGalleryImages } from "@/modules/marketplace/lib/listing-image";
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
  const t = getMessages(locale);
  const detail = t.marketplace.listingDetail;
  const labels = t.marketplace.listing;
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
  const gallery = listingGalleryImages(listing);

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
      <div className="ruwaq-pro-directory">
        <div className="mx-auto max-w-4xl">
          <nav className="ruwaq-pro-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{t.marketplace.proDirectory.directoryLabel}</Link>
            {city && catMeta ? (
              <>
                <span className="mx-2 text-neutral-300">/</span>
                <Link href={`/${city.slug}/${catMeta.slug}`}>
                  {catName} · {cityName}
                </Link>
              </>
            ) : null}
          </nav>

          <header className="mt-6 border-b border-neutral-200 pb-8">
            <div className="flex flex-wrap gap-2">
              {listing.isFeatured ? (
                <RuwaqProBadge label={labels.featuredPro} variant="featured" />
              ) : null}
              {listing.isVerified ? (
                <RuwaqProBadge label={labels.verifiedPro} />
              ) : null}
            </div>
            <h1 className="ruwaq-pro-directory-title mt-4">{title}</h1>
            {cityName ? (
              <p className="ruwaq-pro-directory-meta mt-2">{cityName}</p>
            ) : null}
          </header>

          <ListingGallery images={gallery} title={title} copy={detail} />

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_280px]">
            <article>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {detail.aboutTitle}
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-neutral-700">
                {description}
              </p>
            </article>

            <aside className="h-fit border border-neutral-200 bg-white p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {detail.contactTitle}
              </h2>
              <p className="mt-4 text-sm text-neutral-700" dir="ltr">
                {listing.phone}
              </p>
              {listing.address ? (
                <p className="mt-2 text-sm text-neutral-600">{listing.address}</p>
              ) : null}
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ruwaq-pro-btn-solid w-full py-2.5 text-center"
                >
                  {labels.whatsapp}
                </a>
                {city && catMeta ? (
                  <Link
                    href={`/${city.slug}/${catMeta.slug}`}
                    className="ruwaq-pro-btn-outline w-full py-2.5 text-center"
                  >
                    {detail.backToDirectory}
                  </Link>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
