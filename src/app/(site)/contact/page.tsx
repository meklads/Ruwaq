import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { ContactPageContent } from "@/modules/marketing/components/contact-page-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.pages.contact.title,
    description: t.pages.contact.intro,
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return <ContactPageContent copy={t.pages.contact} locale={locale} />;
}
