import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getSiteCopy(await getLocale()).about;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/about` },
  };
}

export default async function AboutPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getSiteCopy(locale).about;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <p className="rw-eyebrow">{c.eyebrow}</p>
          <h1 className="rw-display">{c.title}</h1>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap rw-split rw-split--even" style={{ alignItems: "center" }}>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {c.paragraphs.map((p) => (
              <p key={p} style={{ fontSize: "1.125rem", lineHeight: 2, color: "var(--rw-ink-soft)" }}>
                {p}
              </p>
            ))}
          </div>
          <Image
            src="/images/marketing/family-living-room.jpg"
            alt={locale === "ar" ? "أسرة في منزلها" : "A family at home"}
            width={1920}
            height={1280}
            sizes="(min-width: 960px) 50vw, 100vw"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </div>
      </section>

      <section className="rw-section rw-section--stone">
        <div className="rw-wrap">
          <h2 className="rw-h2">{c.principlesTitle}</h2>
          <dl className="rw-rows">
            {c.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-wrap">
          <h2 className="rw-h2">{c.groupTitle}</h2>
          <dl className="rw-rows">
            {c.group.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
