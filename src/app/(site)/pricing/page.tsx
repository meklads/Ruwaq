import Link from "next/link";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { TIERS, TIER_ORDER } from "@/modules/billing/lib/tiers";
import { ContractorPromoBanner } from "@/modules/marketplace/components/contractor-promo-banner";

export default async function PricingPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="ruwaq-pro-directory">
      <header className="ruwaq-pro-directory-header text-center">
        <p className="ruwaq-pro-directory-label">RUWAQ PRO, PLANS</p>
        <h1 className="ruwaq-pro-directory-title">
          {locale === "ar" ? "باقات رواق للمقاولين" : "Ruwaq contractor plans"}
        </h1>
        <p className="ruwaq-pro-directory-meta mt-4 normal-case tracking-normal">
          {locale === "ar"
            ? "مرحلة الإطلاق: المحتوى والدليل مجانيان. أداة العروض — 3 شهرياً بعد إكمال ملف الشركة (شعار + إيميل) مع شعار Ruwaq. الدفع الإلكتروني لاحقاً."
            : "Launch phase: editorial & directory are free. Proposal tool — 3/month after company profile (logo + email) with Ruwaq branding. Online billing later."}
        </p>
      </header>

      <div className="ruwaq-ad-content mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {TIER_ORDER.map((tierId) => {
          const tier = TIERS[tierId];
          const highlighted = tierId === "VERIFIED";
          return (
            <article
              key={tierId}
              className={`flex flex-col border bg-white p-8 ${
                highlighted ? "border-neutral-950 ring-1 ring-neutral-950" : "border-neutral-200"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {tierId}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-neutral-950">
                {locale === "ar" ? tier.nameAr : tier.nameEn}
              </h2>
              <p className="mt-4 font-serif text-3xl text-neutral-950">
                {tier.priceSar === 0 ? (
                  locale === "ar" ? "مجاني" : "Free"
                ) : (
                  <>
                    {tier.priceSar}{" "}
                    <span className="text-sm font-sans text-neutral-500">
                      {locale === "ar" ? "ر.س/شهر" : "SAR/mo"}
                    </span>
                  </>
                )}
              </p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {(locale === "ar" ? tier.featuresAr : tier.featuresEn).map((feature) => (
                  <li key={feature} className="border-s border-neutral-300 ps-3">
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tierId === "STARTER" ? "/proposals/new" : "/join"}
                className={`mt-8 block py-3 text-center text-xs font-semibold uppercase tracking-widest ${
                  highlighted
                    ? "ruwaq-pro-btn-solid"
                    : "ruwaq-pro-btn-outline"
                }`}
              >
                {tierId === "STARTER"
                  ? locale === "ar"
                    ? "ابدأ مجاناً"
                    : "Start free"
                  : locale === "ar"
                    ? "ترقية الحساب"
                    : "Upgrade"}
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-neutral-500">
        {locale === "ar"
          ? "الترقية إلى Verified أو PRO عبر /join — بدون دفع إلكتروني حالياً. بوابة Moyasar عند النمو."
          : "Upgrade to Verified or PRO via /join — no online checkout yet. Moyasar when we scale."}
      </p>
      <p className="mt-6 text-center">
        <Link href="/proposals" className="ruwaq-pro-btn-outline px-8 py-3">
          {t.nav.contractorHub}
        </Link>
      </p>

      <div className="mt-16">
        <ContractorPromoBanner locale={locale} />
      </div>
    </div>
  );
}
