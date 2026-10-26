import type { Metadata } from "next";
import { getLocale } from "@/shared/i18n/server";
import { env } from "@/shared/lib/env";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { ChecklistUnlock } from "@/modules/ruwaq/checklist-unlock";

export async function generateMetadata(): Promise<Metadata> {
  const c = getTrustCopy(await getLocale()).checklist;
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `${env.NEXT_PUBLIC_APP_URL}/checklist` } };
}

export default async function ChecklistPage() {
  const locale = (await getLocale()) === "en" ? "en" : "ar";
  const c = getTrustCopy(locale).checklist;

  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display" style={{ maxWidth: "44rem" }}>
            {c.title}
          </h1>
          <p className="rw-lead">{c.lead}</p>
        </div>
      </section>
      <section className="rw-section">
        <div className="rw-wrap">
          <ChecklistUnlock locale={locale} />
        </div>
      </section>
    </div>
  );
}
