import Image from "next/image";
import Link from "next/link";
import type { ProviderListing, ServiceCategory } from "@prisma/client";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import {
  citySlugFromEnum,
  getCityBySlug,
} from "@/shared/constants/marketplace-taxonomy";
import { listingHeroImage } from "@/modules/marketplace/lib/listing-image";
import { VerifiedBadgeTooltip } from "@/modules/marketplace/components/verified-badge-tooltip";

type ListingWithCategory = ProviderListing & { category?: ServiceCategory };

type Props = {
  listing: ListingWithCategory;
  labels: Messages["marketplace"]["listing"];
  locale: Locale;
  categoryLabel?: string;
  cityLabel?: string;
};

function whatsappHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("966") ? digits : `966${digits.replace(/^0/, "")}`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}

function resolveMetaLine(
  listing: ListingWithCategory,
  locale: Locale,
  categoryLabel?: string,
  cityLabel?: string
): string {
  const cityMeta = getCityBySlug(citySlugFromEnum(listing.city));
  const city =
    cityLabel ?? (cityMeta ? (locale === "ar" ? cityMeta.nameAr : cityMeta.nameEn) : "");

  let category = categoryLabel ?? "";
  if (!category && listing.category) {
    category = locale === "ar" ? listing.category.nameAr : listing.category.nameEn;
  }

  if (locale === "en") {
    return [category, city].filter(Boolean).join(", ").toUpperCase();
  }
  return [category, city].filter(Boolean).join(", ");
}

export function ListingCard({
  listing,
  labels,
  locale,
  categoryLabel,
  cityLabel,
}: Props) {
  const title = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;
  const description =
    locale === "ar"
      ? listing.descriptionAr
      : listing.descriptionEn ?? listing.descriptionAr;
  const wa = whatsappHref(
    listing.whatsapp,
    locale === "ar"
      ? `مرحباً، أتواصل عبر منصة رواق بخصوص: ${title}`
      : `Hello, contacting via Ruwaq about: ${title}`
  );
  const imageUrl = listingHeroImage(listing);
  const metaLine = resolveMetaLine(listing, locale, categoryLabel, cityLabel);

  const tier =
    listing.directoryTier ??
    (listing.isFeatured ? "PRO" : listing.isVerified ? "VERIFIED" : "STARTER");

  const providerType = listing.providerType ?? "EXECUTOR";
  const providerLabel =
    providerType === "SUPPLIER"
      ? labels.providerSupplier
      : providerType === "CONSULTANT"
        ? labels.providerConsultant
        : labels.providerExecutor;

  return (
    <article className="group ruwaq-pro-card">
      <div className="ruwaq-pro-card-image">
        <Link href={`/listing/${listing.slug}`} className="block h-full w-full">
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={675}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="ruwaq-pro-card-badges-overlay">
          <span className="ruwaq-pro-badge ruwaq-pro-badge--type">{providerLabel}</span>
          {tier === "PRO" ? (
            <span className="ruwaq-pro-badge ruwaq-pro-badge--featured">{labels.featuredPro}</span>
          ) : null}
          {tier === "VERIFIED" ? (
            <VerifiedBadgeTooltip
              label={labels.verifiedPro}
              title={labels.verifiedTooltip.title}
              body={labels.verifiedTooltip.body}
              variant="verified"
            />
          ) : null}
        </div>
      </div>

      <div className="ruwaq-pro-card-body">
        {metaLine ? (
          <p className="ruwaq-pro-card-meta">{metaLine}</p>
        ) : null}
        <h3 className="ruwaq-pro-card-title">
          <Link href={`/listing/${listing.slug}`}>{title}</Link>
        </h3>
        <p className="ruwaq-pro-card-description">{description}</p>
        <div className="ruwaq-pro-card-actions">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="ruwaq-pro-btn-solid"
          >
            {labels.whatsapp}
          </a>
          <Link href={`/listing/${listing.slug}`} className="ruwaq-pro-btn-outline">
            {labels.viewProfile}
          </Link>
        </div>
      </div>
    </article>
  );
}
