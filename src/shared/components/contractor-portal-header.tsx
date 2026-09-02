import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getSession } from "@/modules/auth/server/session";
import { getCompanyEntitlements } from "@/modules/billing/server/entitlements.service";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { UserNav } from "@/modules/auth/components/user-nav";
import { ContractorPortalNav } from "@/shared/components/contractor-portal-nav";

export async function ContractorPortalHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const session = await getSession();
  let showLeadInbox = false;
  if (session?.user?.id) {
    const entitlements = await getCompanyEntitlements(session.user.id);
    showLeadInbox = Boolean(
      entitlements && (entitlements.tier === "VERIFIED" || entitlements.tier === "PRO")
    );
  }

  const links = [
    { href: "/proposals", label: t.nav.myProposals, key: "proposals" },
    ...(showLeadInbox
      ? [{ href: "/leads", label: t.nav.leadInbox, key: "leads" as const }]
      : []),
    { href: "/proposals/new", label: t.nav.newProposal, key: "new" },
    { href: "/templates/sample", label: t.nav.previewSample, key: "sample" },
    { href: "/settings/company", label: t.nav.settings, key: "settings" },
  ];

  return (
    <header className="ruwaq-header border-b border-white/10 bg-[#0f2c59] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-4">
            <RuwaqLogo href="/proposals" variant="dark" />
            <Link
              href="/"
              className="hidden text-xs font-medium text-white/75 transition hover:text-white sm:inline"
            >
              {t.nav.backToDirectory}
            </Link>
          </div>

          <ContractorPortalNav links={links} />

          <div className="flex items-center gap-2">
            <UserNav />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
