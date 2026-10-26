import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL } from "@/shared/constants/brand";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";

const WHATSAPP_DISPLAY = "0502786513";
const WHATSAPP_URL = "https://wa.me/966502786513";

export async function SiteFooter() {
  const locale = await getLocale();
  const c = getSiteCopy(locale);
  const f = c.footer;
  const t = getTrustCopy(locale);
  const ar = locale !== "en";

  const owner = [
    { href: "/check", label: c.header.check },
    { href: "/project-file", label: c.header.projectFile },
    { href: "/estimate", label: t.nav.estimate },
    { href: "/checklist", label: t.nav.checklist },
    { href: "/guides", label: c.header.guides },
  ];
  const contractors = [
    { href: "/pro", label: f.network },
    { href: "/join", label: f.join },
    { href: "/proposals", label: f.nasaq },
    { href: "/pricing", label: f.pricing },
  ];
  const company = [
    { href: "/about", label: c.header.about },
    { href: "/how-it-works", label: c.header.howItWorks },
    { href: "/charter", label: t.nav.charter },
    { href: "/faq", label: f.nasaqFaq },
    { href: "/contact", label: f.contact },
    { href: "/privacy", label: f.privacy },
    { href: "/terms", label: f.terms },
  ];

  return (
    <footer className="rw">
      <section className="rw-footer-cta">
        <div className="rw-wrap rw-footer-cta__inner">
          <div>
            <h2 className="rw-h2">{f.ctaTitle}</h2>
            <p className="rw-lead" style={{ marginBlockStart: "0.85rem" }}>
              {f.ctaSubtitle}
            </p>
          </div>
          <div className="rw-actions" style={{ marginBlockStart: 0 }}>
            <Link href="/check" className="rw-btn rw-btn--primary">
              {f.ctaOwner}
            </Link>
            <Link href="/pro" className="rw-btn rw-btn--outline">
              {f.ctaContractor}
            </Link>
          </div>
        </div>
      </section>

      <div className="rw-footer">
        <div className="rw-wrap">
          <div className="rw-footer__grid">
            <div>
              <RuwaqLogo href="/" variant="dark" size="footer" />
              <p className="rw-footer__about">{f.tagline}</p>
              <ul className="rw-footer__contact">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" dir="ltr">
                    {ar ? "واتساب" : "WhatsApp"}: {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${RUWQ_PUBLIC_EMAIL}`} dir="ltr">
                    {RUWQ_PUBLIC_EMAIL}
                  </a>
                </li>
                <li>{f.city}</li>
              </ul>
            </div>
            <div>
              <h3>{f.servicesTitle}</h3>
              <ul>
                {owner.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{f.contractorsTitle}</h3>
              <ul>
                {contractors.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{f.companyTitle}</h3>
              <ul>
                {company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rw-footer__bottom">
            <p>{f.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
