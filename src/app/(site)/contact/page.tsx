import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { RUWQ_PUBLIC_EMAIL, RUWQ_SUPPORT_WHATSAPP_E164 } from "@/shared/constants/brand";
import { getSiteCopy } from "@/modules/site/copy";

export default async function ContactPage() {
  const locale = await getLocale();
  const c = getSiteCopy(locale).contact;
  const waDigits = RUWQ_SUPPORT_WHATSAPP_E164.replace(/\D/g, "");

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <dl className="rw-rows">
            <div>
              <dt className="rw-h3">{c.email}</dt>
              <dd>
                <a className="rw-link" href={`mailto:${RUWQ_PUBLIC_EMAIL}`} dir="ltr">
                  {RUWQ_PUBLIC_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="rw-h3">{c.whatsapp}</dt>
              <dd>
                <a className="rw-link" href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" dir="ltr">
                  {RUWQ_SUPPORT_WHATSAPP_E164}
                </a>
              </dd>
            </div>
          </dl>
          <p className="rw-fineprint" style={{ marginBlockStart: "1.25rem" }}>
            {c.fine}
          </p>
          <div className="rw-actions">
            <Link href="/radar" className="rw-btn rw-btn--outline">
              {c.radar}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
