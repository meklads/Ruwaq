import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["contractorSection"];
  locale: Locale;
};

export function ContractorToolIntro({ copy, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";
  return (
    <section className="border-y border-ruwaq-stone/50 bg-white px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ruwaq-ink">{copy.title}</h2>
          <p className="mt-2 max-w-xl text-ruwaq-ink-soft">{copy.subtitle}</p>
        </div>
        <Link href="#create-proposal" className="btn-ruwaq-primary shrink-0 px-8 py-3.5">
          {copy.cta} {arrow}
        </Link>
      </div>
    </section>
  );
}
