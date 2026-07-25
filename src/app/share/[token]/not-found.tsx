import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export default async function ShareNotFound() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold text-ruwaq-gold">Turriva Real Estate</p>
      <h1 className="mt-4 text-2xl font-bold text-ruwaq-navy">
        {t.share.notFoundTitle}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ruwaq-navy-soft">
        {t.share.notFoundMessage}
      </p>
      <Link href="/" className="btn-ruwaq-primary mt-8">
        {t.share.goHome}
      </Link>
    </div>
  );
}
