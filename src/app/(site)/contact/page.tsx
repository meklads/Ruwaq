import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL, RUWQ_SUPPORT_WHATSAPP_E164 } from "@/shared/constants/brand";
import { getSiteCopy } from "@/modules/site/copy";
import { PageHero } from "@/modules/site/home/page-hero";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";

export default async function ContactPage() {
  const locale = await getLocale();
  const c = getSiteCopy(locale).contact;
  const p = getPagesCopy(locale);
  const waDigits = RUWQ_SUPPORT_WHATSAPP_E164.replace(/\D/g, "");

  return (
    <div className="rw rwh">
      <PageHero img={p.contact.img} alt={p.contact.alt} eyebrow={p.contact.eyebrow} title={p.contact.title} lead={p.contact.lead} credit={p.credit} />
      <section className="rwh-section">
        <div className="rw-wrap">
          <div className="rwct-grid">
            <a className="rwct-card" href={`mailto:${RUWQ_PUBLIC_EMAIL}`}>
              <span className="rwct-card__icon" aria-hidden="true">✉</span>
              <h2>{c.email}</h2>
              <strong dir="ltr">{RUWQ_PUBLIC_EMAIL}</strong>
              <span>{p.contact.emailHint}</span>
            </a>
            <a className="rwct-card" href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer">
              <span className="rwct-card__icon" aria-hidden="true">✆</span>
              <h2>{c.whatsapp}</h2>
              <strong dir="ltr">{RUWQ_SUPPORT_WHATSAPP_E164}</strong>
              <span>{p.contact.whatsappHint}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
