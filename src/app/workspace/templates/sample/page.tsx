import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { TemplateSampleGallery } from "@/modules/marketing/components/template-sample-gallery";

export const dynamic = "force-dynamic";

export default async function TemplateSamplePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="nasaq-landing">
      <p className="ruwaq-eyebrow">{t.nav.previewSample}</p>
      <h1 className="nasaq-landing-title mt-3 max-w-2xl">{t.templates.title}</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">{t.templates.subtitle}</p>

      <div className="nasaq-landing-studio mt-6 min-h-[min(78vh,820px)]">
        <TemplateSampleGallery
          locale={locale}
          items={t.templates.gallery}
          labels={{
            openSample: t.templates.openSample,
            openSampleHint: t.templates.openSampleHint,
            note: t.templates.note,
            previewLabel: t.templates.previewLabel,
            paletteTitle: t.templates.paletteTitle,
            paletteHint: t.templates.paletteHint,
            customColors: t.templates.customColors,
            primaryColor: t.templates.primaryColor,
            accentColor: t.templates.accentColor,
            surfaceColor: t.templates.surfaceColor,
            previewCta: t.templates.previewCta,
            closePreview: t.templates.closePreview,
            startWithLook: t.templates.startWithLook,
            subscribeHint: t.templates.subscribeHint,
            frameTitle: t.templates.frameTitle,
            frameHint: t.templates.frameHint,
            watermarkToggle: t.templates.watermarkToggle,
          }}
          startCta={t.site.nav.startProposal}
          studio
        />
      </div>
    </div>
  );
}
