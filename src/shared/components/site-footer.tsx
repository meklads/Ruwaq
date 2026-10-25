import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import {
  RUWQ_PUBLIC_EMAIL,
  TASAMI_GROUP_URL,
  TURRIVA_URL,
  beesmotionReferralUrl,
  graphicsHouseReferralUrl,
} from "@/shared/constants/brand";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

const WHATSAPP_DISPLAY = "0502786513";
const WHATSAPP_URL = "https://wa.me/966502786513";

export async function SiteFooter() {
  const locale = await getLocale();
  const c = getSiteCopy(locale);
  const f = c.footer;
  const ar = locale !== "en";

  const owner = [
    { href: "/check", label: c.header.check },
    { href: "/project-file", label: c.header.projectFile },
    { href: "/aman", label: c.header.aman },
    { href: "/how-it-works", label: c.header.howItWorks },
    { href: "/guides", label: c.header.guides },
  ];
  const contractors = [
    { href: "/pro", label: f.network },
    { href: "/join", label: f.join },
    { href: "/proposals", label: f.nasaq },
    { href: "/pricing", label: f.pricing },
    { href: "/faq", label: f.nasaqFaq },
  ];
  const company = [
    { href: "/about", label: c.header.about },
    { href: "/contact", label: f.contact },
    { href: "/privacy", label: f.privacy },
    { href: "/terms", label: f.terms },
  ];
  const group = [
    { href: graphicsHouseReferralUrl("footer_ecosystem"), label: ar ? "جرافيكس هاوس" : "Graphics House" },
    { href: TURRIVA_URL, label: ar ? "توريفا" : "Turriva" },
    { href: beesmotionReferralUrl("footer_ecosystem"), label: ar ? "بيز موشن" : "Bees Motion" },
  ];

  return (
    <footer className="rw">
      <section className="rw-footer-cta">
        <div className="rw-wrap rw-footer-cta__inner">
          <div>
            <h2 className="rw-h2">{f.ctaTitle}</h2>
            <p className="rw-lead" style={{ marginBlockStart: "0.75rem" }}>
              {f.ctaSubtitle}
            </p>
          </div>
          <div className="rw-hero__actions" style={{ marginBlockStart: 0 }}>
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
              <Link href="/" className="rw-footer__logo" aria-label="رواق Ruwaq">
                <Image src="/brand/ruwaq/logo-on-dark-trim.png" alt="رواق Ruwaq" width={1274} height={551} />
              </Link>
              <p style={{ marginBlockStart: "1rem", maxWidth: "26rem", lineHeight: 1.9 }}>{f.tagline}</p>
              <ul style={{ marginBlockStart: "1.25rem" }}>
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
            <div>
              <a href={TASAMI_GROUP_URL} target="_blank" rel="noopener noreferrer">
                {f.groupLine}
              </a>
              {": "}
              {group.map((g, i) => (
                <span key={g.label}>
                  {i > 0 ? (ar ? "، " : ", ") : ""}
                  <a href={g.href} target="_blank" rel="noopener noreferrer">
                    {g.label}
                  </a>
                </span>
              ))}
              <p style={{ marginBlockStart: "0.35rem" }}>{f.groupNote}</p>
            </div>
            <p>{f.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
