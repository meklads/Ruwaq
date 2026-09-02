import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { JoinDirectoryForm } from "@/modules/marketplace/components/join-directory-form";
import { BeesmotionPromoBanner } from "@/modules/marketplace/components/beesmotion-promo-banner";
import { joinStatusPath } from "@/modules/marketplace/lib/join-status";
import { getLatestJoinApplicationForEmail } from "@/modules/marketplace/server/join.actions";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { city?: string; category?: string };
};

export default async function JoinDirectoryPage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.join;
  const session = await getSession();

  const profile = session?.user?.id
    ? await db.companyProfile.findUnique({ where: { userId: session.user.id } })
    : null;

  const existing = session?.user?.email
    ? await getLatestJoinApplicationForEmail(session.user.email)
    : null;

  const about = profile?.about?.trim() ?? "";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-join-editorial">
        <aside className="ruwaq-join-editorial-aside">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.subtitle}</p>

          {existing ? (
            <div className="mt-8 border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">{copy.existingTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {copy.existingBody}
              </p>
              <Link
                href={joinStatusPath(existing.id)}
                className="mt-4 inline-flex text-sm font-semibold text-neutral-950 underline underline-offset-4"
              >
                {copy.existingCta}
              </Link>
            </div>
          ) : null}

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="ruwaq-ad-card-title text-base">{copy.trustTitle}</h2>
            <ul className="mt-4 space-y-3">
              {copy.trustItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-neutral-600">
                  <span className="text-neutral-950" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="ruwaq-join-editorial-form">
          <JoinDirectoryForm
            copy={copy}
            locale={locale}
            initialCity={parseCitySlug(searchParams.city)}
            initialCategory={parseCategorySlug(searchParams.category)}
            variant="editorial"
            prefill={{
              companyName: profile?.companyName?.trim() || undefined,
              contactName: session?.user?.name?.trim() || undefined,
              contactPhone: profile?.phone?.trim() || undefined,
              contactEmail:
                profile?.email?.trim() || session?.user?.email?.trim() || undefined,
              crNumber: profile?.crNumber?.trim() || undefined,
              portfolioUrl:
                profile?.portfolioUrl?.trim() || profile?.website?.trim() || undefined,
              message: about ? about.slice(0, 2000) : undefined,
            }}
          />
        </div>
      </div>

      <BeesmotionPromoBanner locale={locale} campaign="join_page_ad" />
    </div>
  );
}
