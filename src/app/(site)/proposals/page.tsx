import type { Metadata } from "next";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { getSession } from "@/modules/auth/server/session";
import { ProposalsLandingPage } from "@/modules/marketing/components/proposals-landing-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.pages.proposalsLanding;
  const nasaq = t.nasaq;
  return {
    title: `${nasaq.name} — ${nasaq.tagline}`,
    description: copy.intro,
  };
}

export default async function ProposalsMarketingPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const session = await getSession();

  return (
    <ProposalsLandingPage
      copy={t.pages.proposalsLanding}
      nasaq={t.nasaq}
      sales={t.sales}
      templates={t.templates}
      locale={locale}
      isSignedIn={Boolean(session?.user)}
      startProposalLabel={t.site.nav.startProposal}
    />
  );
}
