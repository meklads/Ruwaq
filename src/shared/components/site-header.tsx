import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { getSiteCopy } from "@/modules/site/copy";
import { getRadarAppUrl } from "@/modules/site/radar-link";
import { getContentCopy } from "@/modules/site/content/copy";

export async function SiteHeader() {
  const locale = await getLocale();
  const c = getSiteCopy(locale).header;
  const radarApp = getRadarAppUrl();

  const nav = getContentCopy(locale).nav;
  const links = [
    { href: "/updates", label: nav.updates },
    { href: "/insights", label: nav.insights },
    { href: "/specialists", label: nav.specialists },
    { href: "/radar", label: c.radar },
    { href: "/about", label: c.about },
    { href: "/contact", label: c.contact },
  ];

  return (
    <header className="rw rw-header">
      <div className="rw-wrap rw-header__bar">
        <RuwaqLogo href="/" variant="editorial" className="rw-header__logo" />

        <nav className="rw-nav" aria-label={c.menu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="rw-header__actions">
          {radarApp && (
            <a href={radarApp} className="rw-link rw-header__enter" rel="noopener">
              {c.enter}
            </a>
          )}
          <Link href="/contact" className="rw-btn rw-btn--primary rw-btn--sm rw-header__cta">
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
      </nav>
    </header>
  );
}
