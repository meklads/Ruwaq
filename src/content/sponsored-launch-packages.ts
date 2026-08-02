export type SponsoredLaunchTier = "spotlight" | "featured" | "premier";

export type SponsoredLaunchPackage = {
  tier: SponsoredLaunchTier;
  nameAr: string;
  nameEn: string;
  priceNoteAr: string;
  priceNoteEn: string;
  summaryAr: string;
  summaryEn: string;
  includesAr: string[];
  includesEn: string[];
  highlighted?: boolean;
};

/** Developer launch sponsorship tiers — sold as editorial + lead-gen bundles. */
export const SPONSORED_LAUNCH_PACKAGES: SponsoredLaunchPackage[] = [
  {
    tier: "spotlight",
    nameAr: "Spotlight",
    nameEn: "Spotlight",
    priceNoteAr: "من 15,000 ر.س / شهر",
    priceNoteEn: "From SAR 15,000 / month",
    summaryAr: "شارة «برعاية» على صفحة الإطلاق + ترتيب في شبكة الرياض.",
    summaryEn: "Sponsored ribbon on launch page + priority in Riyadh hub grid.",
    includesAr: [
      "شارة برعاية على /tours/[slug]",
      "ظهور في Today's Stories (أسبوع)",
      "تقرير leads شهري",
    ],
    includesEn: [
      "Sponsored ribbon on /tours/[slug]",
      "Today's Stories feature (1 week)",
      "Monthly lead report",
    ],
  },
  {
    tier: "featured",
    nameAr: "Featured Launch",
    nameEn: "Featured Launch",
    priceNoteAr: "من 35,000 ر.س / إطلاق",
    priceNoteEn: "From SAR 35,000 / launch",
    summaryAr: "جولة PF كاملة + CGI حصري + lead form مدمج.",
    summaryEn: "Full PF tour page + exclusive CGI + embedded lead form.",
    highlighted: true,
    includesAr: [
      "كل مزايا Spotlight",
      "Hero فيديو YouTube + معرض 12+ صورة",
      "brochure PDF + lead capture",
      "إدراج في /hubs/riyadh أعلى القائمة",
    ],
    includesEn: [
      "Everything in Spotlight",
      "YouTube hero + 12+ image gallery",
      "Brochure PDF + lead capture",
      "Top placement on /hubs/riyadh",
    ],
  },
  {
    tier: "premier",
    nameAr: "Premier Tour",
    nameEn: "Premier Tour",
    priceNoteAr: "حسب المشروع — تواصل",
    priceNoteEn: "Project-based — enquire",
    summaryAr: "Home Tour سينمائي مكتمل + Shop the Tour + حملة Ruwaq PRO.",
    summaryEn: "Cinematic completed Home Tour + Shop the Tour + Ruwaq PRO campaign.",
    includesAr: [
      "كل مزايا Featured",
      "جولة editorial مكتملة (AD-style)",
      "Shop the Tour — ربط موردين PRO",
      "حملة WhatsApp + email للمشترين المؤهلين",
    ],
    includesEn: [
      "Everything in Featured",
      "Completed editorial Home Tour (AD-style)",
      "Shop the Tour — PRO supplier links",
      "WhatsApp + email campaign to qualified buyers",
    ],
  },
];

export function getSponsoredLaunchPackage(
  tier: SponsoredLaunchTier
): SponsoredLaunchPackage | undefined {
  return SPONSORED_LAUNCH_PACKAGES.find((p) => p.tier === tier);
}
