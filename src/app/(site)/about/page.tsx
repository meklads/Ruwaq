import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";

export default async function AboutPage() {
  const locale = await getLocale();
  const a = getSiteCopy(locale).about;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <span className="rw-eyebrow">{a.eyebrow}</span>
          <h1 className="rw-display">{a.title}</h1>
          <p className="rw-lead">{a.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap rw-narrow">
          <dl className="rw-rows">
            {a.sections.map((s) => (
              <div key={s.title}>
                <dt className="rw-h3">{s.title}</dt>
                <dd>{s.body}</dd>
              </div>
            ))}
          </dl>
          <div className="rw-actions">
            <Link href="/#sections" className="rw-btn rw-btn--primary">
              {a.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
