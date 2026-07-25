import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CompanySettingsForm } from "@/modules/company/components/company-settings-form";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { isBillingEnabled } from "@/shared/lib/env";
import {
  HEADER_FOOTER_PREF_COOKIE,
  HEADER_FOOTER_STYLES,
  type HeaderFooterStyleId,
} from "@/modules/proposal/export/header-footer-styles";

export const dynamic = "force-dynamic";

export default async function CompanySettingsPage() {
  const session = await getSession();
  // callbackUrl matters here specifically: a visitor who picked a style on
  // the public showcase needs to land back on Settings after signing in,
  // not on the generic /proposals list, or their pick would feel lost.
  if (!session?.user?.id) redirect("/login?callbackUrl=/settings/company");

  const locale = await getLocale();
  const t = getMessages(locale);

  const profile = await db.companyProfile.findUnique({
    where: { userId: session.user.id },
  });

  // A style picked on the public showcase (before sign-up) travels here via
  // cookie and pre-fills the picker — but only for a brand-new profile.
  // Once a real profile exists, their saved choice always wins.
  let preferredStyleId: HeaderFooterStyleId | undefined;
  if (!profile) {
    const cookieValue = (await cookies()).get(HEADER_FOOTER_PREF_COOKIE)?.value;
    if (cookieValue && Object.prototype.hasOwnProperty.call(HEADER_FOOTER_STYLES, cookieValue)) {
      preferredStyleId = cookieValue as HeaderFooterStyleId;
    }
  }

  return (
    <>
      <AppPageHero
        eyebrow={t.nav.settings}
        title={t.company.title}
        subtitle={t.company.subtitle}
      />
      <div className="app-content-area max-w-2xl">
        <div className="ruwaq-form-card">
          <CompanySettingsForm
            initial={profile}
            billingEnabled={isBillingEnabled()}
            preferredStyleId={preferredStyleId}
          />
        </div>
      </div>
    </>
  );
}
