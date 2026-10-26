import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { RUWQ_GUIDES } from "@/content/guides";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).guides;
  return { title: c.metaTitle, description: c.lead, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/guides` } };
}

export default async function GuidesIndexPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).guides;
  const ar = locale === "ar";
  const num = (n: number) => n.toLocaleString(ar ? "ar-SA" : "en-US");

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          <div className="rw-grid rw-grid--3" style={{ rowGap: "3rem" }}>
            {RUWQ_GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="rw-guide">
                <Image src={g.heroImage} alt="" width={900} height={600} sizes="(min-width: 1024px) 33vw, 100vw" />
                <h2 className="rw-h3" style={{ marginBlockStart: "1rem" }}>{ar ? g.titleAr : g.titleEn}</h2>
                <p>{ar ? g.excerptAr : g.excerptEn}</p>
                <p className="rw-fineprint" style={{ marginBlockStart: "0.5rem" }}>
                  {num(g.readMinutes)} {c.minRead}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
