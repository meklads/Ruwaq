import Link from "next/link";
import type { SponsoredLaunchTier } from "@/content/sponsored-launch-packages";
import { getSponsoredLaunchPackage } from "@/content/sponsored-launch-packages";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  label: string;
  cta: string;
};

type Props = {
  tier: SponsoredLaunchTier;
  locale: Locale;
  copy: Copy;
};

export function SponsoredLaunchRibbon({ tier, locale, copy }: Props) {
  const pkg = getSponsoredLaunchPackage(tier);
  if (!pkg) return null;
  const isAr = locale === "ar";

  return (
    <aside className="ruwaq-sponsored-launch-ribbon" aria-label={copy.label}>
      <div className="ruwaq-sponsored-launch-ribbon__inner">
        <p className="ruwaq-sponsored-launch-ribbon__badge">{copy.label}</p>
        <p className="ruwaq-sponsored-launch-ribbon__tier">
          {isAr ? pkg.nameAr : pkg.nameEn}
        </p>
        <Link href="/developers" className="ruwaq-sponsored-launch-ribbon__link">
          {copy.cta}
        </Link>
      </div>
    </aside>
  );
}
