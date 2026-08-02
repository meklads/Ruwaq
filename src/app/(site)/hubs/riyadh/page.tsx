import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { OFF_PLAN_PROJECTS } from "@/content/off-plan-projects";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "ar"
      ? "الرياض — مشاريع ودليل | Ruwaq"
      : "Riyadh — projects & directory | Ruwaq";
  const description =
    locale === "ar"
      ? "استكشف إطلاقات الرياض، جولات المشاريع، واطلب عرض سعر من شركات Ruwaq PRO."
      : "Explore Riyadh launches, project tours, and request quotes from Ruwaq PRO firms.";
  return { title, description };
}

export default async function RiyadhHubPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const isAr = locale === "ar";
  const riyadhLaunches = OFF_PLAN_PROJECTS.filter((p) => p.citySlug === "riyadh")
    .sort((a, b) => {
      const tierOrder = { premier: 0, featured: 1, spotlight: 2 } as const;
      const aScore = a.sponsoredTier ? tierOrder[a.sponsoredTier] : 3;
      const bScore = b.sponsoredTier ? tierOrder[b.sponsoredTier] : 3;
      return aScore - bScore;
    })
    .slice(0, 6);

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-ad-content py-12 lg:py-16">
        <header className="ruwaq-ad-section-header max-w-3xl">
          <p className="ruwaq-ad-eyebrow">{isAr ? "رواق · الرياض" : "Ruwaq · Riyadh"}</p>
          <h1 className="ruwaq-ad-section-title">
            {isAr ? "الرياض — مشاريع وإلهام" : "Riyadh — projects & inspiration"}
          </h1>
          <p className="ruwaq-ad-section-lead">
            {isAr
              ? "إطلاقات off-plan، جولات سينمائية، وطلبات عروض — Ruwaq PRO يوسّع للرياض."
              : "Off-plan launches, cinematic tours, and quote requests — Ruwaq PRO expanding in Riyadh."}
          </p>
        </header>

        {riyadhLaunches.length > 0 ? (
          <section className="mt-12">
            <h2 className="ruwaq-ad-section-title text-xl">
              {isAr ? "إطلاقات الرياض" : "Riyadh launches"}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {riyadhLaunches.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/tours/${project.slug}`}
                    className="group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-colors hover:border-neutral-950"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={project.images.main}
                        alt={isAr ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="ruwaq-ad-eyebrow">{isAr ? "Off-Plan" : "Off-Plan"}</p>
                      <h3 className="ruwaq-ad-card-title mt-1">
                        {isAr ? project.titleAr : project.titleEn}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 flex flex-wrap gap-3">
          <Link href="/tours" className="ruwaq-pro-btn-solid px-6 py-3">
            {isAr ? "كل الجولات" : "All tours"}
          </Link>
          <Link href="/request-quote" className="ruwaq-pro-btn-outline px-6 py-3">
            {t.nav.requestQuote}
          </Link>
          <Link href="/jeddah/fit-out" className="ruwaq-pro-btn-outline px-6 py-3">
            {isAr ? "دليل جدة (متاح الآن)" : "Jeddah directory (live)"}
          </Link>
        </section>
      </div>
    </div>
  );
}
