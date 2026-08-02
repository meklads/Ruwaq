import Link from "next/link";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? "الدمام والشرقية — قريباً | Ruwaq"
      : "Dammam & Eastern Province — coming soon | Ruwaq";
  const description =
    locale === "ar"
      ? "Ruwaq PRO يوسّع للمنطقة الشرقية — سجّل اهتمامك أو اطلب عرضاً من شركائنا في المنطقة الغربية."
      : "Ruwaq PRO expanding to the Eastern Province — register interest or request a quote from Western Region partners.";
  return { title, description };
}

export default async function DammamHubPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const isAr = locale === "ar";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content py-12 lg:py-16">
        <header className="ruwaq-ad-section-header max-w-3xl">
          <p className="ruwaq-ad-eyebrow">{isAr ? "رواق · الشرقية" : "Ruwaq · Eastern Province"}</p>
          <h1 className="ruwaq-ad-section-title">
            {isAr ? "الدمام والخبر — قريباً" : "Dammam & Khobar — coming soon"}
          </h1>
          <p className="ruwaq-ad-section-lead">
            {isAr
              ? "نبني دليل Ruwaq PRO للمنطقة الشرقية — مقاولون، تشطيب، وتكييف معتمدون. إلى ذلك الحين، اطلب عرضاً وسنوجّهك لشريك مناسب."
              : "We are building the Ruwaq PRO directory for the Eastern Province — verified fit-out, contracting, and HVAC. Until then, request a quote and we will route you to the right partner."}
          </p>
        </header>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link href="/request-quote" className="ruwaq-pro-btn-solid px-6 py-3">
            {t.nav.requestQuote}
          </Link>
          <Link href="/join" className="ruwaq-pro-btn-outline px-6 py-3">
            {t.site.header.applyNow}
          </Link>
          <Link href="/hubs/riyadh" className="ruwaq-pro-btn-outline px-6 py-3">
            {isAr ? "مشاريع الرياض" : "Riyadh projects"}
          </Link>
        </section>
      </div>
    </div>
  );
}
