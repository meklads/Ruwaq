import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { UserNav } from "@/modules/auth/components/user-nav";

export async function SiteHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);

  const links = [
    { href: "/#categories", label: t.nav.browseCategories },
    { href: "/request-quote", label: t.nav.requestQuote },
    { href: "/proposals", label: t.nav.myProposals },
    { href: "/settings/company", label: t.nav.settings },
    { href: "/templates/sample", label: t.nav.previewSample },
  ];

  const homeHref = "/";
  const startHref = "/#create-proposal";

  return (
    <header className="ruwaq-header">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[6.25rem] items-center justify-between gap-4 py-3 sm:min-h-[6.75rem] sm:py-4 lg:min-h-[7.25rem]">
          <div className="shrink-0 lg:min-w-[11rem]">
            <RuwaqLogo href={homeHref} />
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="ruwaq-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:min-w-[200px]">
            <Link href={startHref} className="btn-ruwaq-header-gold hidden sm:inline-flex">
              {t.nav.newProposal}
            </Link>
            <UserNav />
            <LocaleSwitcher />
          </div>
        </div>

        <nav
          className="flex gap-2 overflow-x-auto border-t border-slate-100 py-3 lg:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ruwaq-ink-soft transition-colors hover:border-slate-300 hover:text-ruwaq-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={startHref}
            className="btn-ruwaq-header-gold shrink-0 px-3.5 py-1.5 text-xs sm:hidden"
          >
            {t.nav.newProposal}
          </Link>
        </nav>
      </div>
    </header>
  );
}
