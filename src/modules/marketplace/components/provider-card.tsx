import Link from "next/link";
import type { ProviderListing } from "@prisma/client";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  listing: ProviderListing;
  labels: Messages["marketplace"]["listing"];
  locale: Locale;
};

function whatsappHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("966") ? digits : `966${digits.replace(/^0/, "")}`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}

export function ProviderCard({ listing, labels, locale }: Props) {
  const title = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;
  const wa = whatsappHref(
    listing.whatsapp,
    locale === "ar"
      ? `مرحباً، أتواصل عبر منصة رواق بخصوص: ${title}`
      : `Hello, contacting via Ruwaq about: ${title}`
  );

  return (
    <article className="flex flex-col rounded-2xl border border-ruwaq-stone/50 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {listing.isVerified && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            {labels.verified}
          </span>
        )}
        {listing.isFeatured && (
          <span className="rounded-full bg-ruwaq-gold-muted px-2.5 py-0.5 text-xs font-semibold text-ruwaq-gold">
            {labels.featured}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-bold text-ruwaq-ink">
        <Link href={`/listing/${listing.slug}`} className="hover:text-ruwaq-gold">
          {title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ruwaq-ink-soft">
        {listing.descriptionAr}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ruwaq-primary px-4 py-2 text-xs"
        >
          {labels.whatsapp}
        </a>
      </div>
    </article>
  );
}
