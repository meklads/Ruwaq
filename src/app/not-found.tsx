import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-bold text-ruwaq-ink">{t.errors.notFoundTitle}</h1>
      <p className="mt-2 text-sm text-ruwaq-ink-soft">{t.errors.notFoundMessage}</p>
      <Link
        href="/proposals/new"
        className="mt-6 btn-ruwaq-primary px-4 py-2"
      >
        {t.errors.home}
      </Link>
    </div>
  );
}
