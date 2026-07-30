import Link from "next/link";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

type Props = {
  copy: Messages["marketplace"]["proposalsPreview"];
  closeLabel?: string;
  locale?: Locale;
};

export function ProposalsSamplePreviewBanner({ copy }: Props) {
  return (
    <div className="mb-8 border border-neutral-200 bg-[var(--ruwaq-pro-offwhite)] p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{copy.title}</h2>
      <p className="mt-2 text-sm text-neutral-600">{copy.subtitle}</p>
      <Link
        href="/workspace/templates/sample"
        className="ruwaq-pro-btn-solid mt-4 inline-flex px-5 py-2.5"
      >
        {copy.button}
      </Link>
    </div>
  );
}
