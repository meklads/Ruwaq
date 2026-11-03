import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLocale } from "@/shared/i18n/server";
import { getRadarAppUrl } from "@/modules/site/radar-link";
import { RUWQ_PUBLIC_EMAIL } from "@/shared/constants/brand";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ar" ? "دخول المشتركين | رواق" : "Subscriber sign-in | Ruwaq", robots: { index: false, follow: false } };
}

const COPY = {
  ar: {
    eyebrow: "دخول المشتركين",
    title: "الدخول إلى الرادار",
    body: "الرادار مغلق حاليًا على جرافيكس هاوس، ولا يوجد تسجيل عام. هذا الدخول غير مفعّل بعد في هذا الموقع، ويُفعَّل عند ربطه بتطبيق الرادار.",
    contact: "للاستفسار تواصل معنا",
    about: "عن الرادار",
  },
  en: {
    eyebrow: "Subscriber sign-in",
    title: "Sign in to Radar",
    body: "Radar is currently closed and used only at Graphics House; there is no public registration. This sign-in is not yet active on this site and is turned on when it is connected to the Radar app.",
    contact: "Get in touch",
    about: "About Radar",
  },
} as const;

/**
 * Entry for subscribers. When the Radar app address is configured the visitor goes straight to its
 * sign-in page. Until then this page says plainly that the sign-in is not connected; it never pretends.
 */
export default async function SubscribersPage() {
  const radar = getRadarAppUrl();
  if (radar) redirect(`${radar.replace(/\/$/, "")}/sign-in`);

  const locale = await getLocale();
  const c = COPY[locale === "ar" ? "ar" : "en"];
  return (
    <div className="rw">
      <section className="rw-page-hero">
        <div className="rw-wrap rw-narrow">
          <span className="rw-eyebrow">{c.eyebrow}</span>
          <h1 className="rw-display">{c.title}</h1>
          <p className="rw-lead">{c.body}</p>
          <div className="rw-actions">
            <a className="rw-btn rw-btn--primary" href={`mailto:${RUWQ_PUBLIC_EMAIL}`} dir="ltr">{c.contact}</a>
            <Link className="rw-btn rw-btn--outline" href="/radar">{c.about}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
