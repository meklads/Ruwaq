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
    <div className="mx-auto flex max-w-5xl flex-col gap-4 border-b border-ruwaq-stone/50 px-4 pb-10 pt-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
      <div>
        <p className="ruwaq-eyebrow">{copy.title}</p>
        <h2 id="home-tool-title" className="ruwaq-section-title mt-2 text-start text-2xl sm:text-[1.75rem]">
          {locale === "ar" ? (
            <>
              أنشئ <span className="ruwaq-section-title-accent">عرضاً</span> احترافياً
            </>
          ) : (
            <>
              Build a <span className="ruwaq-section-title-accent">pro</span> proposal
            </>
          )}
        </h2>
        <p className="mt-2 max-w-xl text-ruwaq-ink-soft">{copy.subtitle}</p>
      </div>
      <Link href="#create-proposal" className="btn-ruwaq-primary shrink-0 px-8 py-3.5">
        {copy.cta} {arrow}
      </Link>
    </div>
  );
}
