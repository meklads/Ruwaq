import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { JoinDirectoryForm } from "@/modules/marketplace/components/join-directory-form";
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

  const tc = getTrustCopy(locale).join;
  const n = (i: number) => (i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero rw-page-hero--ink">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{tc.eyebrow}</span>
          <h1 className="rw-display">{tc.title}</h1>
          <p className="rw-lead">{tc.lead}</p>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split" style={{ alignItems: "start" }}>
          <div>
            {existing ? (
              <div className="rw-note-box rw-note-box--mark" style={{ marginBlockEnd: "2rem" }}>
                <h2 className="rw-h3">{copy.existingTitle}</h2>
                <p className="rw-body">{copy.existingBody}</p>
                <Link href={joinStatusPath(existing.id)} className="rw-link" style={{ display: "inline-block", marginBlockStart: "0.75rem" }}>
                  {copy.existingCta}
                </Link>
              </div>
            ) : null}
            <div className="rw-head">
              <h2 className="rw-h2">{tc.stepsTitle}</h2>
            </div>
            <ol className="rw-steps">
              {tc.steps.map((s, i) => (
                <li key={s}>
                  <span className="rw-steps__n">{n(i)}</span>
                  <p className="rw-body" style={{ color: "var(--rw-ink)", paddingBlockStart: "0.35rem" }}>
                    {s}
                  </p>
                </li>
              ))}
            </ol>
            <p className="rw-fineprint" style={{ marginBlockStart: "1.75rem" }}>
              {tc.rankingNote}
            </p>
          </div>

          <div className="rw-form-card rw-join-form">
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
                contactEmail: profile?.email?.trim() || session?.user?.email?.trim() || undefined,
                crNumber: profile?.crNumber?.trim() || undefined,
                portfolioUrl: profile?.portfolioUrl?.trim() || profile?.website?.trim() || undefined,
                message: about ? about.slice(0, 2000) : undefined,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
