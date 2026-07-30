import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { LegalDocumentPage } from "@/shared/components/legal-document-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.pages.privacy.title,
    description: t.pages.privacy.intro,
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.pages.privacy;

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
