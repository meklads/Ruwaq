import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";

export async function SiteHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const nav = t.site.header;

  const mainLinks = [
    { href: "/categories", label: nav.directory },
    { href: "/tours", label: nav.tours },
    { href: "/guides", label: nav.guides },
    { href: "/pro", label: nav.featured },
    { href: "/how-it-works", label: nav.howItWorks },
  ];

  return (
    <header className="ruwaq-ad-header">
      <div className="ruwaq-ad-pro-bar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <Link href="/" className="ruwaq-ad-pro-bar-label">
            {t.marketplace.proDirectory.directoryLabel}
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/workspace/proposals/new" className="ruwaq-ad-pro-bar-cta">
              {nav.startProposal}
            </Link>
            <Link href="/join" className="ruwaq-ad-pro-bar-cta">
              {nav.applyNow}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex w-24 shrink-0 flex-col items-start gap-2 sm:w-28">
              <Link
                href="/workspace/proposals/new"
                className="ruwaq-ad-header-cta hidden lg:inline-flex"
              >
                {nav.startProposal}
              </Link>
            </div>
            <div className="flex flex-1 flex-col items-center gap-5">
              <RuwaqLogo href="/" variant="editorial" size="chrome" />
              <nav
                className="hidden flex-wrap items-center justify-center gap-x-1 lg:flex"
                aria-label={nav.mainNavLabel}
              >
                {mainLinks.map((link, i) => (
                  <span key={link.href} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-3 text-neutral-300" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <Link href={link.href} className="ruwaq-ad-nav-link">
                      {link.label}
                    </Link>
                  </span>
                ))}
                <span className="mx-3 text-neutral-300" aria-hidden>
                  ·
                </span>
                <Link href="/proposals" className="ruwaq-ad-nav-link">
                  {nav.forContractors}
                </Link>
              </nav>
            </div>
            <div className="flex w-24 shrink-0 flex-col items-end gap-2 sm:w-28">
              <LocaleSwitcher />
              <Link
                href="/workspace/proposals/new"
                className="ruwaq-ad-header-cta lg:hidden"
              >
                {nav.startProposal}
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center sm:hidden">
            <Link href="/request-quote" className="ruwaq-ad-nav-link">
              {t.nav.requestQuote}
            </Link>
          </p>
        </div>

        <nav
          className="flex gap-0 overflow-x-auto border-t border-neutral-200 lg:hidden"
          aria-label={nav.mainNavLabel}
        >
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ruwaq-ad-mobile-nav-link">
              {link.label}
            </Link>
          ))}
          <Link href="/proposals" className="ruwaq-ad-mobile-nav-link">
            {nav.forContractors}
          </Link>
        </nav>
      </div>
    </header>
  );
}
