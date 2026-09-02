/** Public Ruwaq contact — footer and export defaults when company profile is empty. */
export const RUWQ_PUBLIC_HOST = "ruwaq.co";
export const RUWQ_PUBLIC_EMAIL = `hello@${RUWQ_PUBLIC_HOST}`;
export const RUWQ_PUBLIC_URL = `https://${RUWQ_PUBLIC_HOST}`;

/** Ruwaq / Turriva support WhatsApp (E.164) — quote follow-up & contact page. */
export const RUWQ_SUPPORT_WHATSAPP_E164 = "+966502786513";

/** Ecosystem brands — Ruwaq acts as a lead funnel alongside Turriva and Graphics House. */
export const TASAMI_GROUP_URL = "https://www.tasamify.com/";
export const GRAPHICS_HOUSE_URL = "https://3dgraphicshouse.com";
export const GRAPHICS_HOUSE_PROJECT_LAUNCH_URL =
  "https://3dgraphicshouse.com/solutions/project-launch.html";
export const TURRIVA_URL = "https://turriva.com";
export const BEESMOTION_URL = "https://beesmotion.com";

export function graphicsHouseReferralUrl(campaign: string, path = "/"): string {
  const url = new URL(path, GRAPHICS_HOUSE_URL);
  url.searchParams.set("utm_source", "ruwaq");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function graphicsHouseProjectLaunchReferralUrl(campaign: string): string {
  return graphicsHouseReferralUrl(campaign, "/solutions/project-launch.html");
}

export function turrivaReferralUrl(campaign: string): string {
  const url = new URL(TURRIVA_URL);
  url.searchParams.set("utm_source", "ruwaq");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function beesmotionReferralUrl(campaign: string): string {
  const url = new URL(BEESMOTION_URL);
  url.searchParams.set("utm_source", "ruwaq");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}
