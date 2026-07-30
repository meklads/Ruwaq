import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { VisualizationLeadForm } from "@/modules/marketplace/components/visualization-lead-form";
import { GraphicsHouseLogo } from "@/shared/components/graphics-house-logo";
import { graphicsHouseReferralUrl } from "@/shared/constants/brand";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.visualization;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function VisualizationPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.visualization;
  const ghUrl = graphicsHouseReferralUrl("visualization_page");

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-join-editorial">
        <aside className="ruwaq-join-editorial-aside">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.subtitle}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {copy.services.map((service) => (
              <li
                key={service}
                className="border border-neutral-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-800"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="ruwaq-ad-card-title text-base">{copy.trustTitle}</h2>
            <ul className="mt-4 space-y-3">
              {copy.trustItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-neutral-600">
                  <span className="text-neutral-950" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <GraphicsHouseLogo href={ghUrl} variant="light" className="h-8 w-auto" />
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">{copy.partnerNote}</p>
          </div>
        </aside>

        <div className="ruwaq-join-editorial-form">
          <p className="ruwaq-join-step-label">{copy.formLabel}</p>
          <VisualizationLeadForm copy={copy} locale={locale} />
        </div>
      </div>
    </div>
  );
}
