import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL, RUWQ_PUBLIC_HOST, RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const nav = t.site.header;

  const directoryLinks = [
    { href: "/categories", label: nav.directory },
    { href: "/pro", label: nav.featured },
    { href: "/join", label: nav.applyNow },
    { href: "/how-it-works", label: nav.howItWorks },
  ];

  const companyLinks = [
    { href: "/about", label: t.nav.aboutPlatform },
    { href: "/pricing", label: t.site.nav.pricing },
    { href: "/proposals", label: t.nav.contractorHub },
    { href: `mailto:${RUWQ_PUBLIC_EMAIL}`, label: t.site.footer.contact },
  ];

  return (
    <footer className="ruwaq-ad-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 border-b border-neutral-200 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <RuwaqLogo href="/" variant="editorial" size="footer" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-600">
              {t.marketplace.footerTagline}
            </p>
          </div>

          <div>
            <h3 className="ruwaq-ad-footer-heading">{nav.directory}</h3>
            <ul className="mt-5 space-y-2.5">
              {directoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ruwaq-ad-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="ruwaq-ad-footer-heading">{t.site.footer.company}</h3>
            <ul className="mt-5 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ruwaq-ad-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-[10px] uppercase tracking-widest text-neutral-500 sm:flex-row sm:items-center">
          <p>{t.site.footer.copyright}</p>
          <a href={RUWQ_PUBLIC_URL} className="transition-colors hover:text-neutral-950">
            {RUWQ_PUBLIC_HOST}
          </a>
        </div>
      </div>
    </footer>
  );
}
