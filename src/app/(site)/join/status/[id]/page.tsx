import type { Metadata } from "next";
import Link from "next/link";
import type { DirectoryApplicationStatus } from "@prisma/client";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getPublicJoinApplication } from "@/modules/marketplace/server/join.actions";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

const STATUS_CLASS: Record<DirectoryApplicationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-950",
  REVIEWING: "bg-sky-100 text-sky-950",
  APPROVED: "bg-emerald-100 text-emerald-950",
  REJECTED: "bg-neutral-200 text-neutral-800",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getMessages(locale).marketplace.join.status;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function JoinStatusPage({ params }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.join.status;
  const application = await getPublicJoinApplication(params.id);

  if (!application) {
    return (
      <div className="ruwaq-ad-page">
        <div className="ruwaq-ad-page-inner max-w-xl">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.notFoundTitle}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.notFoundBody}</p>
          <Link href="/join" className="ruwaq-pro-btn-solid mt-8 inline-flex px-6 py-3">
            {copy.applyAgain}
          </Link>
        </div>
      </div>
    );
  }

  const city = locale === "ar" ? application.cityNameAr : application.cityNameEn;
  const category =
    locale === "ar" ? application.categoryNameAr : application.categoryNameEn;
  const submitted = application.createdAt.toISOString().slice(0, 10);
  const nextCopy =
    application.status === "APPROVED"
      ? copy.nextApproved
      : application.status === "REJECTED"
        ? copy.nextRejected
        : application.status === "REVIEWING"
          ? copy.nextReviewing
          : copy.nextPending;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner max-w-2xl">
        <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title mt-3">{application.companyName}</h1>
        <p className="mt-4 text-sm text-neutral-500">
          {city} · {category}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[application.status]}`}
          >
            {copy.labels[application.status]}
          </span>
          <span className="text-sm text-neutral-500">
            {copy.submittedOn}: {submitted}
          </span>
        </div>

        <div className="mt-10 border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-sm font-semibold text-neutral-950">{copy.nextTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{nextCopy}</p>
          {application.reviewNote ? (
            <p className="mt-4 border-t border-neutral-200 pt-4 text-sm leading-relaxed text-neutral-700">
              {application.reviewNote}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {application.status === "APPROVED" && application.listingSlug ? (
            <Link
              href={`/listing/${application.listingSlug}`}
              className="ruwaq-pro-btn-solid px-6 py-3"
            >
              {copy.viewListing}
            </Link>
          ) : null}
          {application.status === "REJECTED" ? (
            <Link href="/join" className="ruwaq-pro-btn-solid px-6 py-3">
              {copy.applyAgain}
            </Link>
          ) : (
            <Link href="/settings/company" className="ruwaq-pro-btn-outline px-6 py-3">
              {copy.completeProfile}
            </Link>
          )}
          <Link href="/join" className="px-4 py-3 text-sm font-semibold text-neutral-600 underline underline-offset-4">
            {copy.backToJoin}
          </Link>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">{copy.bookmarkHint}</p>
      </div>
    </div>
  );
}
