import Link from "next/link";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { MARKETPLACE_CATEGORIES } from "@/shared/constants/marketplace-taxonomy";
import { JEDDAH_INTENT_LANDINGS } from "@/content/jeddah-landings/data";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? "جدة — مطابقة مشاريع ودليل PRO | رواق"
      : "Jeddah — project matching & PRO directory | Ruwaq";
  const description =
    locale === "ar"
      ? "اكتب مشروعك مرة — نوصّلك بـ 3 مقاولين معتمدين في جدة. 8 قطاعات، جولات، وأدلة عملية."
      : "Describe your project once — we match 3 verified contractors in Jeddah. 8 sectors, tours, and practical guides.";
  return { title, description };
}

export default async function JeddahHubPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const isAr = locale === "ar";

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content py-12 lg:py-16">
        <header className="ruwaq-ad-section-header max-w-3xl">
          <p className="ruwaq-ad-eyebrow">{isAr ? "رواق · جدة" : "Ruwaq · Jeddah"}</p>
          <h1 className="ruwaq-ad-section-title">
            {isAr ? "جدة — مطابقة مشاريع ودليل معتمد" : "Jeddah — project matching & verified directory"}
          </h1>
          <p className="ruwaq-ad-section-lead">
            {isAr
              ? "اكتب مشروعك مرة واحدة. فريق رواق يراجع الطلب ويرشّح أفضل 3 مقاولين في القطاع المناسب — مجاناً خلال 24 ساعة."
              : "Describe your project once. Ruwaq reviews it and shortlists the best 3 contractors in your sector — free within 24 hours."}
          </p>
        </header>

        <section className="mt-12">
          <h2 className="ruwaq-ad-section-title text-xl">
            {isAr ? "ابدأ حسب نوع مشروعك" : "Start by project type"}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {JEDDAH_INTENT_LANDINGS.map((intent) => (
              <li key={intent.intentSlug}>
                <Link
                  href={`/hubs/jeddah/${intent.intentSlug}`}
                  className="block border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-950"
                >
                  <p className="font-semibold text-neutral-900">
                    {isAr ? intent.heroTitleAr : intent.heroTitleEn}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                    {isAr ? intent.heroLeadAr : intent.heroLeadEn}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="ruwaq-ad-section-title text-xl">
            {isAr ? "8 قطاعات في جدة" : "8 sectors in Jeddah"}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETPLACE_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/jeddah/${cat.slug}`}
                  className="flex items-center gap-3 border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold transition-colors hover:border-neutral-950"
                >
                  <span aria-hidden>{cat.icon}</span>
                  {isAr ? cat.nameAr : cat.nameEn}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link href="/request-quote?city=jeddah" className="ruwaq-pro-btn-solid px-6 py-3">
            {t.nav.requestQuote}
          </Link>
          <Link href="/how-it-works" className="ruwaq-pro-btn-outline px-6 py-3">
            {t.site.header.howItWorks}
          </Link>
          <Link href="/tours" className="ruwaq-pro-btn-outline px-6 py-3">
            {t.site.header.tours}
          </Link>
          <Link href="/guides" className="ruwaq-pro-btn-outline px-6 py-3">
            {t.site.header.guides}
          </Link>
        </section>
      </div>
    </div>
  );
}
