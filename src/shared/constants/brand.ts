/** Public Ruwaq contact — footer and export defaults when company profile is empty. */
export const RUWQ_PUBLIC_HOST = "ruwaq.co";
export const RUWQ_PUBLIC_EMAIL = `hello@${RUWQ_PUBLIC_HOST}`;
export const RUWQ_PUBLIC_URL = `https://${RUWQ_PUBLIC_HOST}`;

/** Ecosystem brands — Ruwaq acts as a lead funnel alongside Turriva and Graphics House. */
export const GRAPHICS_HOUSE_URL = "https://3dgraphicshouse.com";
export const TURRIVA_URL = "https://turriva.co";

export function graphicsHouseReferralUrl(campaign: string): string {
  const url = new URL(GRAPHICS_HOUSE_URL);
  url.searchParams.set("utm_source", "ruwaq");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function turrivaReferralUrl(campaign: string): string {
  const url = new URL(TURRIVA_URL);
  url.searchParams.set("utm_source", "ruwaq");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}
