import { getProposalQuery } from "@/modules/proposal/server/proposal.queries";
import { ProposalReviewClient } from "@/modules/proposal/components/proposal-review-client";
import { ProposalGenerateRunner } from "@/modules/proposal/components/proposal-generate-runner";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { notFound, redirect } from "next/navigation";
import { isCompanyProfileThin } from "@/modules/company/lib/profile-completeness";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export default async function ProposalReviewPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { key?: string; claim?: string };
}) {
  const editKey = searchParams?.key;

  if (editKey) {
    redirect(
      `/api/proposals/${params.id}/edit-key?key=${encodeURIComponent(editKey)}`
    );
  }

  const proposal = await getProposalQuery(params.id);
  if (!proposal) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const isGenerating =
    proposal.status === "draft" || proposal.status === "generating";

  return (
    <>
      <AppPageHero
        eyebrow={t.review.draftBadge}
        title={proposal.projectName || t.list.untitled}
        subtitle={
          isGenerating ? t.form.generatingWrite : t.review.pageSubtitle
        }
      />
      {isGenerating ? (
        <ProposalGenerateRunner proposalId={proposal.id} editKey={editKey} />
      ) : (
        <ProposalReviewContent proposalId={proposal.id} />
      )}
    </>
  );
}

async function ProposalReviewContent({ proposalId }: { proposalId: string }) {
  const proposal = await getProposalQuery(proposalId);
  if (!proposal) notFound();

  const session = await getSession();
  let companyName: string | null = null;
  let profileThin = false;
  if (session?.user?.id) {
    const profile = await db.companyProfile.findUnique({
      where: { userId: session.user.id },
      select: { companyName: true, crNumber: true, about: true },
    });
    companyName = profile?.companyName || session.user.name || null;
    profileThin = isCompanyProfileThin(profile);
  }

  return (
    <div className="app-content-area max-w-3xl">
      <ProposalReviewClient
        proposal={proposal}
        companyName={companyName}
        profileThin={profileThin}
        isGuest={!proposal.userId}
      />
    </div>
  );
}
