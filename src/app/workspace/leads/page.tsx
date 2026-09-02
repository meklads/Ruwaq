import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/modules/auth/server/session";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { getContractorLeadInbox } from "@/modules/marketplace/server/contractor-leads.actions";
import { ContractorLeadInbox } from "@/modules/marketplace/components/contractor-lead-inbox";

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

  const leads = inbox.leads.map((lead) => ({
    matchId: lead.matchId,
    rank: lead.rank,
    referenceCode: lead.referenceCode,
    clientName: lead.clientName,
    clientPhone: lead.clientPhone,
    clientEmail: lead.clientEmail,
    projectDetails: lead.projectDetails,
    budgetRange: lead.budgetRange,
    cityLabel: locale === "ar" ? lead.cityNameAr : lead.cityNameEn,
    categoryLabel: locale === "ar" ? lead.categoryNameAr : lead.categoryNameEn,
    submittedLabel: lead.createdAt.toISOString().slice(0, 16).replace("T", " "),
    viewedAt: lead.viewedAt?.toISOString() ?? null,
    respondedAt: lead.respondedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <AppPageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
      <div className="app-content-area">
        <ContractorLeadInbox
          copy={copy}
          locale={locale}
          userId={session.user.id}
          userEmail={session.user.email ?? null}
          leads={leads}
        />
      </div>
    </>
  );
}
