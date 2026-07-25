import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { TemplateSampleGallery } from "@/modules/marketing/components/template-sample-gallery";
import { HeaderFooterShowcase } from "@/modules/marketing/components/header-footer-showcase";

export const dynamic = "force-dynamic";

export default async function TemplateSamplePage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="ruwaq-eyebrow">{t.nav.previewSample}</p>
      <h1 className="ruwaq-section-title mx-auto mt-4 max-w-3xl text-center">{t.templates.title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-ruwaq-ink-soft sm:text-base">
        {t.templates.subtitle}
      </p>

      <div className="mt-10">
        <TemplateSampleGallery
          locale={locale}
          items={t.templates.gallery}
          labels={{
            openSample: t.templates.openSample,
            openSampleHint: t.templates.openSampleHint,
            note: t.templates.note,
            previewLabel: t.templates.previewLabel,
          }}
          startCta={t.site.nav.startProposal}
        />
      </div>

      <HeaderFooterShowcase
        locale={locale}
        title={t.templates.headerFooterShowcase.title}
        subtitle={t.templates.headerFooterShowcase.subtitle}
        selectCta={t.templates.headerFooterShowcase.selectCta}
        premiumBadge={t.templates.headerFooterShowcase.premiumBadge}
        premiumNote={t.templates.headerFooterShowcase.premiumNote}
        openInNewTab={t.templates.headerFooterShowcase.openInNewTab}
      />
    </div>
  );
}
