import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { UserNav } from "@/modules/auth/components/user-nav";
import { ContractorNavMenu } from "@/shared/components/contractor-nav-menu";

export async function SiteHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);

  const b2cLinks = [
    { href: "/#categories", label: t.nav.browseCategories },
    { href: "/request-quote", label: t.nav.requestQuote },
  ];

  const contractorItems = [
    { href: "/proposals/new", label: t.nav.newProposal },
    { href: "/proposals", label: t.nav.myProposals },
    { href: "/templates/sample", label: t.nav.previewSample },
    { href: "/settings/company", label: t.nav.settings },
  ];

  return (
    <header className="ruwaq-header">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[6.25rem] items-center justify-between gap-4 py-3 sm:min-h-[6.75rem] sm:py-4 lg:min-h-[7.25rem]">
          <div className="shrink-0 lg:min-w-[11rem]">
            <RuwaqLogo href="/" />
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label={locale === "ar" ? "خدمات العملاء" : "For clients"}
          >
            {b2cLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ruwaq-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:min-w-[200px]">
            <ContractorNavMenu
              hubLabel={t.nav.contractorHub}
              items={contractorItems}
              className="hidden sm:block"
            />
            <UserNav />
            <LocaleSwitcher />
          </div>
        </div>

        <nav
          className="flex gap-2 overflow-x-auto border-t border-slate-100 py-3 lg:hidden"
          aria-label="Mobile"
        >
          {b2cLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ruwaq-ink-soft transition-colors hover:border-slate-300 hover:text-ruwaq-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/proposals/new"
            className="btn-ruwaq-header-gold shrink-0 px-3.5 py-1.5 text-xs"
          >
            {t.nav.contractorHub}
          </Link>
        </nav>
      </div>
    </header>
  );
}
