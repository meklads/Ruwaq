import { notFound } from "next/navigation";
import { db } from "@/shared/lib/db";
import { getLocale } from "@/shared/i18n/server";

type Props = { params: { slug: string } };

export default async function ListingDetailPage({ params }: Props) {
  const listing = await db.providerListing.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!listing) notFound();
  const locale = await getLocale();
  const title = locale === "ar" ? listing.titleAr : listing.titleEn ?? listing.titleAr;

  return (
    <div className="app-content-area max-w-3xl">
      <h1 className="ruwaq-app-title">{title}</h1>
      <p className="mt-6 whitespace-pre-wrap leading-relaxed text-ruwaq-ink-soft">
        {listing.descriptionAr}
      </p>
      <p className="mt-8 text-sm text-ruwaq-ink-muted">
        {listing.phone} · {listing.address}
      </p>
    </div>
  );
}
