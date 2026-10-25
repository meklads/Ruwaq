import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function SiteHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const c = getSiteCopy(locale).header;

  const mainLinks = [
    { href: "/check", label: c.check },
    { href: "/project-file", label: c.projectFile },
    { href: "/aman", label: c.aman },
    { href: "/how-it-works", label: c.howItWorks },
    { href: "/guides", label: c.guides },
    { href: "/about", label: c.about },
  ];

  return (
    <header className="ruwaq-ad-header">
      <div className="ruwaq-ad-pro-bar">
        <div className="ruwaq-ad-container flex flex-wrap items-center justify-between gap-3 py-2.5 sm:gap-4">
          <span className="ruwaq-ad-pro-bar-tagline">{c.topBar}</span>
          <Link href="/pro" className="ruwaq-ad-pro-bar-link">
            {c.contractors}
          </Link>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-white">
        <div className="ruwaq-ad-container flex items-center justify-between gap-4 py-3 lg:py-4">
          <RuwaqLogo href="/" variant="editorial" />

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex" aria-label={t.site.header.mainNavLabel}>
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="ruwaq-ad-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/check" className="ruwaq-ad-pro-bar-apply hidden sm:inline-flex">
              {c.cta}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>

        <nav className="flex gap-0 overflow-x-auto border-t border-neutral-100 lg:hidden" aria-label={t.site.header.mainNavLabel}>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ruwaq-ad-mobile-nav-link">
              {link.label}
            </Link>
          ))}
          <Link href="/pro" className="ruwaq-ad-mobile-nav-link ruwaq-ad-mobile-nav-link--pro">
            {c.contractors}
          </Link>
        </nav>
      </div>
    </header>
  );
}
