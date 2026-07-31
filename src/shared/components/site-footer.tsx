import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  BEESMOTION_URL,
  GRAPHICS_HOUSE_URL,
  RUWQ_PUBLIC_EMAIL,
  RUWQ_PUBLIC_URL,
  TURRIVA_URL,
  beesmotionReferralUrl,
  graphicsHouseReferralUrl,
} from "@/shared/constants/brand";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const nav = t.site.header;
  const footer = t.site.footer;

  const directoryLinks = [
    { href: "/categories", label: nav.directory },
    { href: "/tours", label: nav.tours },
    { href: "/guides", label: nav.guides },
    { href: "/pro", label: nav.featured },
    { href: "/join", label: nav.applyNow },
    { href: "/how-it-works", label: nav.howItWorks },
    { href: "/request-quote", label: t.nav.requestQuote },
  ];

  const ecosystemLinks = [
    { href: "/visualization", label: footer.graphicsHouseVisualization, external: false },
    {
      href: graphicsHouseReferralUrl("footer_ecosystem"),
      label: footer.graphicsHouse,
      external: true,
    },
    { href: TURRIVA_URL, label: footer.turriva, external: true },
    {
      href: beesmotionReferralUrl("footer_ecosystem"),
      label: footer.beesmotion,
      external: true,
    },
    { href: "/proposals", label: t.nav.contractorHub, external: false },
    { href: "/pricing", label: t.site.nav.pricing, external: false },
  ];

  const companyLinks = [
    { href: "/about", label: t.nav.aboutPlatform },
    { href: "/faq", label: t.site.nav.faq },
    { href: "/contact", label: footer.contact },
  ];

  const legalLinks = [
    { href: "/privacy", label: t.site.nav.privacy },
    { href: "/terms", label: t.site.nav.terms },
  ];

  return (
    <footer className="ruwaq-ad-footer">
      <div className="ruwaq-ad-band-greige border-b border-neutral-950/10">
        <div className="ruwaq-ad-container grid gap-8 py-14 lg:grid-cols-[1.4fr_auto] lg:items-center lg:gap-12 lg:py-16">
          <div>
            <h2 className="ruwaq-ad-footer-newsletter-title text-neutral-950">{footer.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-700">
              {footer.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/request-quote"
              className="ruwaq-pro-chip inline-flex border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
            >
              {footer.ctaOwner}
            </Link>
            <Link
              href="/proposals"
              className="ruwaq-pro-chip inline-flex border-neutral-950 bg-transparent text-neutral-950 hover:bg-neutral-950/5"
            >
              {footer.ctaButton}
            </Link>
          </div>
        </div>
      </div>

      <div className="ruwaq-ad-band-charcoal ruwaq-ad-footer--dark">
        <div className="ruwaq-ad-container py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <div>
              <RuwaqLogo href="/" variant="dark" />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">{footer.tagline}</p>
              <p className="mt-4 text-xs text-white/50">{footer.address}</p>
              <div className="mt-6">
                <p className="ruwaq-ad-footer-heading text-white/55">{footer.followUs}</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={GRAPHICS_HOUSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-[10px] font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
                    aria-label="Graphics House"
                  >
                    GH
                  </a>
                </div>
              </div>
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
              <h3 className="ruwaq-ad-footer-heading">{footer.ecosystem}</h3>
              <ul className="mt-5 space-y-2.5">
                {ecosystemLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ruwaq-ad-footer-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="ruwaq-ad-footer-link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="ruwaq-ad-footer-heading">{footer.company}</h3>
              <ul className="mt-5 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="ruwaq-ad-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="ruwaq-ad-footer-heading mt-8">{footer.legal}</h3>
              <ul className="mt-5 space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="ruwaq-ad-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {legalLinks.map((link, index) => (
                  <span key={link.href} className="inline-flex items-center gap-3">
                    {index > 0 ? (
                      <span className="hidden text-white/25 sm:inline" aria-hidden>
                        |
                      </span>
                    ) : null}
                    <Link href={link.href} className="ruwaq-ad-footer-legal-link">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 text-[10px] uppercase tracking-widest text-white/70">
                {footer.regionLabel}
              </div>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-white/45">{footer.affiliateNote}</p>
            <div className="mt-4 flex flex-col gap-2 text-[10px] uppercase tracking-widest text-white/45 sm:flex-row sm:items-center sm:justify-between">
              <p>{footer.copyright}</p>
              <a href={RUWQ_PUBLIC_URL} className="transition-colors hover:text-white/70">
                {RUWQ_PUBLIC_URL.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
