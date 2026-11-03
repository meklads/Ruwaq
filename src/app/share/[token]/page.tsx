import { notFound } from "next/navigation";
import { getShareViewByToken } from "@/modules/proposal/server/share.service";
import { hasShareSoftApproval } from "@/modules/proposal/server/live-room.service";
import { ProposalShareLiveRoom } from "@/modules/proposal/components/proposal-share-live-room";
import { getMessages } from "@/shared/i18n";
import { localeDir } from "@/shared/i18n/locale";

export const dynamic = "force-dynamic";

type Props = {
  params: { token: string };
};

export default async function ShareProposalPage({ params }: Props) {
  const data = await getShareViewByToken(params.token);
  if (!data) notFound();

  const initialApproved = await hasShareSoftApproval(params.token);
  const t = getMessages(data.locale);
  const dir = localeDir(data.locale);

  // Client components cannot receive functions: strip them, and pre-render the one label that
  // needs a value (the share page used to fail with a 500 because of this).
  const plain = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

  return (
    <ProposalShareLiveRoom
      data={data}
      labels={plain(t.share)}
      reviewLabels={
        {
          ...plain(t.review),
          boq: {
            ...plain(t.review.boq),
            estimateDisclaimerTop: t.review.boq.estimateDisclaimerTop(data.estimateVariancePercent ?? 15),
            estimateDisclaimerBottom: t.review.boq.estimateDisclaimerBottom(data.estimateVariancePercent ?? 15),
          },
          clauses: {
            ...plain(t.review.clauses),
            approvedCount: t.review.clauses.approvedCount(data.clauseItems?.length ?? 0),
          },
        } as unknown as typeof t.review
      }
      exportLabels={plain(t.export)}
      liveRoomLabels={{
        ...plain(t.share.liveRoom),
        estimateAckText: t.share.liveRoom.estimateAck(data.estimateVariancePercent),
      }}
      dir={dir}
      initialApproved={initialApproved}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  const data = await getShareViewByToken(params.token);
  if (!data) {
    return { title: "رواق — نَسَق" };
  }
  return {
    title:
      data.locale === "ar"
        ? `${data.projectName} · عرض سعر`
        : `${data.projectName} · Proposal`,
  };
}
