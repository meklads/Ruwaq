import type { Metadata } from "next";
import Link from "next/link";
import type { MarketplaceLeadStatus } from "@prisma/client";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getPublicLeadStatus } from "@/modules/marketplace/server/lead-status.actions";
import { QuoteStatusMatchCard } from "@/modules/marketplace/components/quote-status-match-card";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

const STATUS_CLASS: Record<MarketplaceLeadStatus, string> = {
  NEW: "bg-amber-100 text-amber-950",
  ASSIGNED_TO_TURRIVA: "bg-sky-100 text-sky-950",
  BROADCASTED_TO_PARTNERS: "bg-emerald-100 text-emerald-950",
  CLOSED: "bg-neutral-200 text-neutral-800",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getMessages(locale).marketplace.leadStatus;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function QuoteStatusPage({ params }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.leadStatus;
  const lead = await getPublicLeadStatus(params.id);

  if (!lead) {
    return (
      <div className="ruwaq-ad-page">
        <div className="ruwaq-ad-page-inner max-w-xl">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.notFoundTitle}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.notFoundBody}</p>
          <Link href="/request-quote" className="ruwaq-pro-btn-solid mt-8 inline-flex px-6 py-3">
            {copy.newRequest}
          </Link>
        </div>
      </div>
    );
  }

  const city = locale === "ar" ? lead.cityNameAr : lead.cityNameEn;
  const category = locale === "ar" ? lead.categoryNameAr : lead.categoryNameEn;
  const submitted = lead.createdAt.toISOString().slice(0, 10);
  const hasMatches = lead.matches.length > 0;
  const nextCopy =
    lead.status === "CLOSED"
      ? copy.nextClosed
      : hasMatches || lead.status === "BROADCASTED_TO_PARTNERS"
        ? copy.nextMatched
        : lead.status === "ASSIGNED_TO_TURRIVA"
          ? copy.nextAssigned
          : copy.nextNew;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner max-w-2xl">
        <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title mt-3">{lead.clientName}</h1>
        <p className="mt-4 text-sm text-neutral-500">
          {city} · {category}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[lead.status]}`}
          >
            {copy.labels[lead.status]}
          </span>
          <span className="text-sm text-neutral-500">
            {copy.submittedOn}: {submitted}
          </span>
          <span className="text-sm font-mono text-neutral-600">
            {copy.referenceLabel}: {lead.referenceCode}
          </span>
        </div>

        <div className="mt-10 border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-sm font-semibold text-neutral-950">{copy.nextTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{nextCopy}</p>
        </div>

        {hasMatches ? (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-neutral-950">{copy.matchesTitle}</h2>
            <p className="mt-2 text-sm text-neutral-600">{copy.matchesIntro}</p>
            <ol className="mt-6 grid gap-6">
              {lead.matches.map((match) => (
                <QuoteStatusMatchCard
                  key={match.listingSlug}
                  match={match}
                  copy={copy}
                  locale={locale}
                  clientName={lead.clientName}
                />
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/request-quote" className="ruwaq-pro-btn-solid px-6 py-3">
            {copy.newRequest}
          </Link>
          <Link
            href="/how-we-match"
            className="px-4 py-3 text-sm font-semibold text-neutral-600 underline underline-offset-4"
          >
            {copy.howWeMatch}
          </Link>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">{copy.bookmarkHint}</p>
      </div>
    </div>
  );
}
