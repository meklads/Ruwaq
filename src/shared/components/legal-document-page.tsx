import Link from "next/link";
import { RUWQ_PUBLIC_EMAIL } from "@/shared/constants/brand";

type LegalSection = {
  title: string;
  body: string;
};

type Props = {
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
  contactLabel: string;
};

export function LegalDocumentPage({ title, updated, intro, sections, contactLabel }: Props) {
  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <p className="ruwaq-ad-eyebrow">{updated}</p>
        <h1 className="ruwaq-ad-section-title mt-3">{title}</h1>
        <p className="ruwaq-ad-section-lead mt-6">{intro}</p>

        <div className="mt-12 space-y-10 border-t border-neutral-200 pt-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="ruwaq-ad-card-title text-xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 text-sm text-neutral-600">
          {contactLabel}{" "}
          <Link href={`mailto:${RUWQ_PUBLIC_EMAIL}`} className="text-neutral-950 underline underline-offset-2">
            {RUWQ_PUBLIC_EMAIL}
          </Link>
        </p>
      </div>
    </div>
  );
}
