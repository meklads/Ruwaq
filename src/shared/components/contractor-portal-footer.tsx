import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export async function ContractorPortalFooter() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <footer className="border-t border-ruwaq-stone/40 bg-ruwaq-linen/40 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-ruwaq-ink-muted sm:flex-row sm:px-6">
        <p>{t.site.footer.copyright}</p>
        <Link href="/" className="font-semibold text-ruwaq-gold hover:underline">
          {t.nav.backToDirectory}
        </Link>
      </div>
    </footer>
  );
}
