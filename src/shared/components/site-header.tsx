import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { QuoteRequestCtaButton } from "@/modules/marketplace/components/quote-request-cta-button";

export async function SiteHeader() {
  const locale = await getLocale();
  const t = getMessages(locale);

  const b2cLinks = [
    { href: "/categories", label: t.nav.browseCategories },
    { href: "/about", label: t.nav.aboutPlatform },
  ];

  return (
    <header className="ruwaq-header">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[6.25rem] items-center justify-between gap-4 py-3 sm:min-h-[6.75rem] sm:py-4 lg:min-h-[7.25rem]">
          <div className="shrink-0">
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

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <QuoteRequestCtaButton
              triggerLabel={t.nav.requestQuote}
              closeLabel={t.nav.closeModal}
              copy={t.marketplace.quote}
              locale={locale}
              className="btn-ruwaq-header-cta hidden px-4 py-2.5 text-xs sm:inline-flex sm:px-5 sm:text-sm"
            />
            <Link
              href="/proposals"
              className="btn-ruwaq-gold-link hidden px-3.5 py-2 text-[11px] lg:inline-flex lg:px-4 lg:text-xs"
            >
              {t.nav.contractorHub}
            </Link>
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
          <QuoteRequestCtaButton
            triggerLabel={t.nav.requestQuote}
            closeLabel={t.nav.closeModal}
            copy={t.marketplace.quote}
            locale={locale}
            className="btn-ruwaq-header-cta shrink-0 px-3.5 py-1.5 text-xs"
          />
          <Link
            href="/proposals"
            className="btn-ruwaq-gold-link shrink-0 px-3.5 py-1.5 text-xs"
          >
            {t.nav.contractorHub}
          </Link>
        </nav>
      </div>
    </header>
  );
}
