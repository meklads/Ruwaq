import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { FaqPageContent } from "@/modules/marketing/components/faq-page-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.pages.faq.title,
    description: t.pages.faq.intro,
  };
}

export default async function FaqPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return <FaqPageContent copy={t.pages.faq} locale={locale} />;
}
