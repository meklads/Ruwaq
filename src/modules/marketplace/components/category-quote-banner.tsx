import Link from "next/link";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  locale: Locale;
  cityName: string;
  categoryName: string;
  title: string;
  lead: string;
  cta: string;
  howMatchLabel: string;
  citySlug: string;
  categorySlug: string;
};

export function CategoryQuoteBanner({
  locale,
  cityName,
  categoryName,
  title,
  lead,
  cta,
  howMatchLabel,
  citySlug,
  categorySlug,
}: Props) {
  const quoteHref = `/request-quote?city=${citySlug}&category=${categorySlug}`;

  return (
    <aside className="mb-10 border border-neutral-950 bg-neutral-950 px-6 py-8 text-white sm:px-8 sm:py-10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b47a]">
        {locale === "ar" ? `${categoryName} · ${cityName}` : `${categoryName} · ${cityName}`}
      </p>
      <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{lead}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={quoteHref} className="ruwaq-pro-btn-solid inline-flex bg-[#c9a063] px-8 py-3 text-neutral-950 hover:bg-[#d4b47a]">
          {cta}
        </Link>
        <Link
          href="/how-we-match"
          className="inline-flex items-center border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
        >
          {howMatchLabel}
        </Link>
      </div>
    </aside>
  );
}
