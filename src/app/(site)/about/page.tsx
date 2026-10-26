import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import Link from "next/link";
import { CardIcon, PRINCIPLE_ICONS } from "@/modules/ruwaq/icons";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).about;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/about` } };
}

export default async function AboutPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).about;
  const t = getTrustCopy(locale);

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "48rem" }}>
            {c.title}
          </h1>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--even">
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {c.paragraphs.map((p) => (
              <p key={p} className="rw-lead" style={{ maxWidth: "none" }}>
                {p}
              </p>
            ))}
          </div>
          <Image
            src="/images/marketing/family-living-room.jpg"
            alt={locale === "ar" ? "أسرة في منزلها" : "A family at home"}
            width={1920}
            height={1280}
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ width: "100%", height: "auto", borderRadius: 14 }}
          />
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <div className="rw-head">
            <h2 className="rw-h2">{c.principlesTitle}</h2>
          </div>
          <div className="rw-grid rw-grid--4">
            {c.principles.map((p, i) => (
              <article key={p.title} className="rw-card">
                <CardIcon icon={PRINCIPLE_ICONS[i]} />
                <h3 className="rw-h3">{p.title}</h3>
                <p className="rw-body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rw-section rw-section--flush-top">
        <div className="rw-wrap">
          <div className="rw-head-row" style={{ marginBlockEnd: 0 }}>
            <div className="rw-head">
              <h2 className="rw-h2">{t.charter.title}</h2>
              <p className="rw-body">{t.charter.lead}</p>
            </div>
            <Link href="/charter" className="rw-btn rw-btn--primary">
              {t.nav.charter}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
