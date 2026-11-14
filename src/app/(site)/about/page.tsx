import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { getSiteCopy } from "@/modules/site/copy";
import { PageHero } from "@/modules/site/home/page-hero";
import { getPagesCopy } from "@/modules/site/pages/copy";
import "@/modules/site/home/home.css";

export default async function AboutPage() {
  const locale = await getLocale();
  const a = getSiteCopy(locale).about;
  const p = getPagesCopy(locale);
  const n = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="rw rwh">
      <PageHero
        img={p.about.img}
        alt={p.about.alt}
        eyebrow={p.about.eyebrow}
        title={p.about.title}
        lead={p.about.lead}
        credit={p.credit}
        actions={
          <>
            <Link href="/glossary" className="rwh-btn rwh-btn--gold">{getPagesCopy(locale).soon.cards.glossary.title}</Link>
            <Link href="/atlas" className="rwh-btn rwh-btn--ghost">{getPagesCopy(locale).soon.cards.atlas.title}</Link>
          </>
        }
      />
      <section className="rwh-section rwh-method">
        <div className="rw-wrap">
          <span className="rwh-eyebrow">{a.eyebrow}</span>
          <h2 className="rwh-title">{p.about.principles}</h2>
          <div className="rwa-list">
            {a.sections.map((s, i) => (
              <div key={s.title} className="rwa-item">
                <span className="rwa-item__n">{n(i)}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
