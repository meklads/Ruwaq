/** Client-side GA4 helpers — no-op when measurement ID is unset. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "quote_submit"
  | "visualization_lead"
  | "proposal_start"
  | "budget_estimate"
  | "pro_apply_click"
  | "tour_shop_click"
  | "developer_inquiry"
  | "off_plan_brochure";

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", name, {
    send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    ...params,
  });
}
