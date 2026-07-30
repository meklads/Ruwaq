import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { LegalDocumentPage } from "@/shared/components/legal-document-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.pages.terms.title,
    description: t.pages.terms.intro,
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.pages.terms;

  return (
    <LegalDocumentPage
      title={copy.title}
      updated={copy.updated}
      intro={copy.intro}
      sections={copy.sections}
      contactLabel={copy.contact}
    />
  );
}
