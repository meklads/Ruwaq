import Image from "next/image";
import Link from "next/link";
import type { RuwaqTier } from "@prisma/client";
import { buildWhatsAppUrl } from "@/modules/marketplace/lib/lead-phone";
import type { MatchResponseStatus, PublicLeadMatch } from "@/modules/marketplace/server/lead-status.actions";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  match: PublicLeadMatch;
  copy: Messages["marketplace"]["leadStatus"];
  locale: Locale;
  clientName: string;
};

function responseCopy(
  status: MatchResponseStatus,
  hours: number | null,
  copy: Messages["marketplace"]["leadStatus"]
): string {
  if (status === "responded") {
    return hours ? copy.matchRespondedHours(hours) : copy.matchResponded;
  }
  if (status === "viewed") return copy.matchViewed;
  return copy.matchPending;
}

export function QuoteStatusMatchCard({ match, copy, locale, clientName }: Props) {
  const companyName = locale === "ar" ? match.companyNameAr : match.companyNameEn;
  const waMessage =
    locale === "ar"
      ? `مرحباً، أتواصل عبر رواق بخصوص طلبي — ${clientName}`
      : `Hello, I'm reaching out via Ruwaq about my request — ${clientName}`;

  return (
    <li className="overflow-hidden border border-neutral-200 bg-white">
      <div className="relative aspect-[16/9] w-full bg-neutral-100">
        <Image
          src={match.heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
        />
        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-white">
            #{match.rank}
          </span>
          {match.isVerified ? (
            <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-neutral-900">
              {copy.verifiedBadge}
            </span>
          ) : null}
          {match.directoryTier === "PRO" ? (
            <span className="rounded-full bg-ruwaq-gold/90 px-2.5 py-0.5 text-xs font-semibold text-neutral-900">
              {copy.tierBadges.PRO}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-950">{companyName}</h3>
        {match.descriptionExcerpt ? (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {match.descriptionExcerpt}
          </p>
        ) : null}

        <p
          className={`mt-4 text-xs font-semibold ${
            match.responseStatus === "responded"
              ? "text-emerald-700"
              : match.responseStatus === "viewed"
                ? "text-amber-700"
                : "text-neutral-500"
          }`}
        >
          {responseCopy(match.responseStatus, match.responseTimeHours, copy)}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/listing/${match.listingSlug}`}
            className="ruwaq-pro-btn-outline px-4 py-2 text-sm"
          >
            {copy.viewProfile}
          </Link>
          {match.whatsapp ? (
            <a
              href={buildWhatsAppUrl(match.whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              {copy.whatsapp}
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}
