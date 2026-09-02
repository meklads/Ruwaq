import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";

type Props = {
  copy: Messages["marketplace"]["visualization"];
  locale: Locale;
  campaign: string;
};

export function ProjectLaunchBanner({ copy, locale, campaign }: Props) {
  const projectLaunchUrl = graphicsHouseProjectLaunchReferralUrl(campaign);
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className="border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm leading-relaxed text-neutral-700">
      <p className="font-semibold text-neutral-950">{copy.projectLaunchBanner}</p>
      <p className="mt-2 text-neutral-600">{copy.projectLaunchDescription}</p>
      <a
        href={projectLaunchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 font-semibold text-neutral-950 underline underline-offset-4 hover:text-neutral-600"
      >
        {copy.projectLaunchLearnMore} {arrow}
      </a>
    </div>
  );
}
