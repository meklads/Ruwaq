import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL, RUWQ_PUBLIC_HOST, RUWQ_PUBLIC_URL } from "@/shared/constants/brand";
import { RuwaqLogo, SITE_LOGO_SIZE_CLASS } from "@/shared/components/ruwaq-logo";
import { GraphicsHouseLogo } from "@/shared/components/graphics-house-logo";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const arrow = locale === "ar" ? "←" : "→";

  const columns = [
    {
      title: t.site.footer.product,
      links: [
        { href: "/proposals/new", label: t.site.nav.startProposal },
        { href: "/proposals", label: t.nav.myProposals },
        { href: "/templates/sample", label: t.nav.previewSample },
        { href: "/settings/company", label: t.nav.settings },
      ],
    },
    {
      title: t.site.footer.company,
      links: [{ href: `mailto:${RUWQ_PUBLIC_EMAIL}`, label: t.site.footer.contact }],
    },
  ];

  return (
    <footer className="ruwaq-footer-light">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 border-b border-slate-100 pb-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:pb-16">
          <div>
            <h2 className="ruwaq-footer-cta-title">{t.site.footer.ctaTitle}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ruwaq-ink-soft">
              {t.site.footer.ctaSubtitle}
            </p>
            <Link href="/proposals/new" className="btn-ruwaq-primary mt-8 inline-flex px-9 py-3.5">
              {t.site.footer.ctaButton} {arrow}
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="ruwaq-footer-col-title">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ruwaq-ink-soft transition-colors hover:text-ruwaq-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-14">
          <div>
            <RuwaqLogo href="/proposals/new" className={SITE_LOGO_SIZE_CLASS} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ruwaq-ink-soft">
              {t.site.footer.tagline}
            </p>
            <p className="mt-4 text-xs text-ruwaq-ink-muted">{t.site.footer.address}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-ruwaq-ink-muted">
              <span>{t.site.footer.sponsoredBy}</span>
              <GraphicsHouseLogo variant="mark" className="h-7 w-auto sm:h-8" />
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 py-8 text-xs text-ruwaq-ink-muted sm:flex-row">
          <p>{t.site.footer.copyright}</p>
          <a href={RUWQ_PUBLIC_URL} className="ruwaq-link-gold hover:underline">
            {RUWQ_PUBLIC_HOST}
          </a>
        </div>
      </div>
    </footer>
  );
}
