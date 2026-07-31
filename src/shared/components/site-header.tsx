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

  const proNavLink = { href: "/proposals", label: nav.forContractors };

  return (
    <header className="ruwaq-ad-header">
      <div className="ruwaq-ad-pro-bar">
        <div className="ruwaq-ad-container flex items-center justify-between gap-4 py-2">
          <Link href="/" className="ruwaq-ad-pro-bar-label">
            {t.marketplace.proDirectory.directoryLabel}
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/join" className="ruwaq-ad-pro-bar-cta">
              {nav.applyNow}
            </Link>
            <Link href="/request-quote" className="ruwaq-ad-pro-bar-cta">
              {t.nav.requestQuote}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-white">
        <div className="ruwaq-ad-container flex items-center justify-between gap-4 py-3 lg:py-4">
          <RuwaqLogo href="/" variant="editorial" />

          <nav
            className="hidden flex-1 items-center justify-center gap-6 lg:flex"
            aria-label={nav.mainNavLabel}
          >
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ruwaq-ad-nav-link">
                {link.label}
              </Link>
            ))}
            <Link href={proNavLink.href} className="ruwaq-ad-nav-link ruwaq-ad-nav-link--pro">
              {proNavLink.label}
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <LocaleSwitcher />
          </div>
        </div>

        <nav
          className="flex gap-0 overflow-x-auto border-t border-neutral-100 lg:hidden"
          aria-label={nav.mainNavLabel}
        >
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ruwaq-ad-mobile-nav-link">
              {link.label}
            </Link>
          ))}
          <Link href={proNavLink.href} className="ruwaq-ad-mobile-nav-link ruwaq-ad-mobile-nav-link--pro">
            {proNavLink.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
