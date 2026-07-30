import Link from "next/link";
import { RUWQ_PUBLIC_EMAIL } from "@/shared/constants/brand";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["pages"]["contact"];
  locale: Locale;
};

export function ContactPageContent({ copy, locale }: Props) {
  const arrow = locale === "ar" ? "←" : "→";
  const whatsapp = process.env.NEXT_PUBLIC_RUWQ_SUPPORT_WHATSAPP?.trim() || "";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-page-inner">
        <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
        <h1 className="ruwaq-ad-section-title">{copy.title}</h1>
        <p className="ruwaq-ad-section-lead mt-6">{copy.intro}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="border border-neutral-200 p-6">
            <p className="text-xs uppercase tracking-widest text-neutral-500">{copy.emailLabel}</p>
            <a
              href={`mailto:${RUWQ_PUBLIC_EMAIL}`}
              className="mt-3 block text-lg font-medium text-neutral-950 underline underline-offset-4"
            >
              {RUWQ_PUBLIC_EMAIL}
            </a>
          </div>
          {whatsapp ? (
            <div className="border border-neutral-200 p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500">{copy.whatsappLabel}</p>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-lg font-medium text-neutral-950 underline underline-offset-4"
              >
                {whatsapp}
              </a>
            </div>
          ) : null}
        </div>

        <section className="mt-12 border-t border-neutral-200 pt-12">
          <h2 className="ruwaq-ad-card-title text-xl">{copy.responseTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{copy.responseBody}</p>
          <ul className="mt-8 space-y-4">
            {copy.channels.map((channel) => (
              <li key={channel.title} className="border border-neutral-200 p-5">
                <h3 className="font-semibold text-neutral-950">{channel.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{channel.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/request-quote" className="ruwaq-pro-btn-solid px-8 py-3">
            {copy.ctaQuote} {arrow}
          </Link>
          <Link href="/proposals" className="ruwaq-pro-btn-outline px-8 py-3">
            {copy.ctaProposal}
          </Link>
          <Link href="/faq" className="ruwaq-pro-btn-outline px-8 py-3">
            {copy.ctaFaq}
          </Link>
        </div>
      </div>
    </div>
  );
}
