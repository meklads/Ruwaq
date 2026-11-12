import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL, RUWQ_SUPPORT_WHATSAPP_E164 } from "@/shared/constants/brand";
import { getSiteCopy } from "@/modules/site/copy";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { getContentCopy } from "@/modules/site/content/copy";
import { getKnowledgeCopy } from "@/modules/site/knowledge/copy";

export async function SiteFooter() {
  const locale = await getLocale();
  const f = getSiteCopy(locale).footer;
  const waDigits = RUWQ_SUPPORT_WHATSAPP_E164.replace(/\D/g, "");

  const nav = getContentCopy(locale).nav;
  const sections = [
    { href: "/updates", label: nav.updates },
    { href: "/insights", label: nav.insights },
    { href: "/specialists", label: nav.specialists },
    { href: "/glossary", label: getKnowledgeCopy(locale).nav.glossary },
    { href: "/atlas", label: getKnowledgeCopy(locale).nav.atlas },
  ];
  const tools = [
    { href: "/proposals", label: f.nasaq },
    { href: "/proposals#samples", label: f.ready },
    { href: "/guides", label: f.guides },
  ];
  const company = [
    { href: "/about", label: f.aboutLink },
    { href: "/radar", label: f.aboutRadar },
    { href: "/contact", label: f.contact },
    { href: "/subscribers", label: f.subscribers },
    { href: "/privacy", label: f.privacy },
    { href: "/terms", label: f.terms },
  ];
  const columns = [
    { title: f.sections, links: sections },
    { title: f.tools, links: tools },
    { title: f.company, links: company },
  ];

  return (
    <footer className="rw">
      <section className="rw-footer-cta">
        <div className="rw-wrap rw-footer-cta__inner">
          <div>
            <h2 className="rw-h2">{f.cta}</h2>
            <p className="rw-lead" style={{ marginBlockStart: "0.85rem" }}>
              {f.ctaBody}
            </p>
          </div>
          <div className="rw-actions" style={{ marginBlockStart: 0 }}>
            <Link href="/contact" className="rw-btn rw-btn--primary">
              {f.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <div className="rw-footer">
        <div className="rw-wrap">
          <div className="rw-footer__grid">
            <div>
              <RuwaqLogo href="/" variant="dark" size="footer" />
              <p className="rw-footer__about">{f.about}</p>
              <ul className="rw-footer__contact">
                <li>
                  <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" dir="ltr">
                    {RUWQ_SUPPORT_WHATSAPP_E164}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${RUWQ_PUBLIC_EMAIL}`} dir="ltr">
                    {RUWQ_PUBLIC_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
            {columns.map((col) => (
              <div key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rw-footer__bottom">
            <p>
              © {new Date().getFullYear()} {locale === "ar" ? "رواق" : "Ruwaq"} · {f.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
