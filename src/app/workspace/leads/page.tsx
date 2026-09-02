import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/modules/auth/server/session";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { getContractorLeadInbox } from "@/modules/marketplace/server/contractor-leads.actions";
import { buildWhatsAppUrl } from "@/modules/marketplace/lib/lead-phone";

export const dynamic = "force-dynamic";

export default async function ContractorLeadsPage() {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/leads");
  }

  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.contractorInbox;
  const inbox = await getContractorLeadInbox(session.user.id, session.user.email);

  if (!inbox.allowed) {
    const body =
      inbox.reason === "no_profile"
        ? copy.noProfileBody
        : inbox.reason === "tier_locked"
          ? copy.tierLockedBody
          : copy.noListingBody;

    return (
      <>
        <AppPageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="app-content-area max-w-2xl">
          <div className="rounded border border-ruwaq-stone bg-white p-8 text-center shadow-sm">
            <p className="text-sm leading-relaxed text-ruwaq-ink-soft">{body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {inbox.reason === "no_profile" || inbox.reason === "no_listing" ? (
                <Link href="/settings/company" className="ruwaq-pro-btn-solid px-6 py-3">
                  {copy.completeProfileCta}
                </Link>
              ) : null}
              {inbox.reason === "tier_locked" ? (
                <Link href="/join" className="ruwaq-pro-btn-solid px-6 py-3">
                  {copy.joinDirectoryCta}
                </Link>
              ) : null}
              <Link href="/proposals" className="btn-ruwaq-secondary px-6 py-3">
                {copy.backToProposals}
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppPageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
      <div className="app-content-area space-y-6">
        {inbox.leads.length === 0 ? (
          <div className="rounded border border-dashed border-ruwaq-stone bg-ruwaq-paper/40 p-10 text-center">
            <p className="text-sm text-ruwaq-ink-soft">{copy.empty}</p>
          </div>
        ) : (
          inbox.leads.map((lead) => {
            const city = locale === "ar" ? lead.cityNameAr : lead.cityNameEn;
            const category = locale === "ar" ? lead.categoryNameAr : lead.categoryNameEn;
            const submitted = lead.createdAt.toISOString().slice(0, 16).replace("T", " ");

            return (
              <article
                key={lead.matchId}
                className="rounded border border-ruwaq-stone bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                        #{lead.rank}
                      </span>
                      <span className="font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                        {copy.referenceLabel}: {lead.referenceCode}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-ruwaq-ink">{lead.clientName}</h2>
                    <p className="mt-1 text-sm text-ruwaq-ink-soft">
                      {category} · {city} · {submitted}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {copy.matchedBadge}
                  </span>
                </div>

                {lead.budgetRange ? (
                  <p className="mt-4 text-sm">
                    <span className="text-ruwaq-ink-muted">{copy.budgetLabel}: </span>
                    {lead.budgetRange}
                  </p>
                ) : null}

                <p className="mt-4 rounded bg-ruwaq-paper p-4 text-sm leading-relaxed text-ruwaq-ink-soft">
                  {lead.projectDetails}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      lead.clientPhone,
                      locale === "ar"
                        ? `مرحباً ${lead.clientName}، تواصلت معكم عبر رواق بخصوص طلب ${lead.referenceCode}.`
                        : `Hello ${lead.clientName}, I'm reaching out via Ruwaq about request ${lead.referenceCode}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {copy.whatsAppCta}
                  </a>
                  {lead.clientEmail ? (
                    <a
                      href={`mailto:${lead.clientEmail}`}
                      className="btn-ruwaq-secondary px-5 py-2.5 text-sm"
                    >
                      {copy.emailCta}
                    </a>
                  ) : null}
                </div>

                <p className="mt-4 font-mono text-xs text-ruwaq-ink-muted" dir="ltr">
                  {lead.clientPhone}
                </p>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}
