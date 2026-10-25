import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function SiteHeader() {
  const locale = await getLocale();
  const c = getSiteCopy(locale).header;

  const links = [
    { href: "/check", label: c.check },
    { href: "/project-file", label: c.projectFile },
    { href: "/aman", label: c.aman },
    { href: "/how-it-works", label: c.howItWorks },
    { href: "/guides", label: c.guides },
    { href: "/about", label: c.about },
  ];

  return (
    <header className="rw rw-header">
      <div className="rw-wrap rw-header__bar">
        <Link href="/" className="rw-header__logo" aria-label="رواق Ruwaq">
          <Image src="/brand/ruwaq/logo-on-light-trim.png" alt="رواق Ruwaq" width={738} height={324} priority />
        </Link>

        <nav className="rw-nav" aria-label={c.menu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="rw-header__actions">
          <Link href="/pro" className="rw-btn rw-btn--outline rw-btn--sm rw-header__contractors">
            {c.contractors}
          </Link>
          <Link href="/check" className="rw-btn rw-btn--primary rw-btn--sm rw-header__cta">
            {c.cta}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>

      <nav className="rw-mobile-nav rw-wrap" aria-label={c.menu}>
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/pro" className="rw-mobile-nav__pro">
          {c.contractors}
        </Link>
      </nav>
    </header>
  );
}
