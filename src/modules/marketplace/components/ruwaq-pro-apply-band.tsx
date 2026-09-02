import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { ProApplyTrackedLinks } from "@/modules/marketplace/components/pro-apply-tracked-links";

export async function RuwaqProApplyBand() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.site.proApplyBand;

  return (
    <section className="ruwaq-pro-apply-band" aria-labelledby="ruwaq-pro-apply-band-title">
      <div className="ruwaq-ad-content">
        <div className="ruwaq-pro-apply-band__inner">
          <div className="ruwaq-pro-apply-band__copy">
            <p className="ruwaq-pro-apply-band__eyebrow">{copy.eyebrow}</p>
            <h2 id="ruwaq-pro-apply-band-title" className="ruwaq-pro-apply-band__title">
              {copy.title}
            </h2>
            <p className="ruwaq-pro-apply-band__lead">{copy.lead}</p>
          </div>

          <div className="ruwaq-pro-apply-band__benefits">
            <h3 className="ruwaq-pro-apply-band__benefits-title">{copy.benefitsTitle}</h3>
            <ul className="ruwaq-pro-apply-band__benefits-grid">
              {copy.benefits.map((benefit) => (
                <li key={benefit.title} className="ruwaq-pro-apply-band__benefit">
                  <p className="ruwaq-pro-apply-band__benefit-title">{benefit.title}</p>
                  <p className="ruwaq-pro-apply-band__benefit-body">{benefit.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ruwaq-pro-apply-band__footer">
            <div>
              <Link href="/contact" className="ruwaq-pro-apply-band__coming-soon">
                {copy.comingSoonCta}
              </Link>
              <p className="ruwaq-pro-apply-band__coming-note">{copy.comingSoonNote}</p>
            </div>
            <div className="ruwaq-pro-apply-band__actions">
              <ProApplyTrackedLinks
                primaryClass="ruwaq-pro-apply-band__cta-primary"
                secondaryClass="ruwaq-pro-apply-band__cta-secondary"
                links={[
                  {
                    href: "/join",
                    label: copy.applyCta,
                    event: "pro_apply_click",
                    source: "pro_apply_band",
                  },
                  {
                    href: "/pricing",
                    label: copy.pricingCta,
                    event: "pro_apply_click",
                    source: "pro_apply_band_pricing",
                  },
                  {
                    href: "/proposals/new",
                    label: copy.proposalsCta,
                    event: "pro_apply_click",
                    source: "pro_apply_band_proposals",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
