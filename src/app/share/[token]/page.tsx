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

  return (
    <ProposalShareLiveRoom
      data={data}
      labels={t.share}
      reviewLabels={t.review}
      exportLabels={t.export}
      liveRoomLabels={t.share.liveRoom}
      dir={dir}
      initialApproved={initialApproved}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  const data = await getShareViewByToken(params.token);
  if (!data) {
    return { title: "Turriva Real Estate" };
  }
  return {
    title:
      data.locale === "ar"
        ? `${data.projectName} · عرض سعر`
        : `${data.projectName} · Proposal`,
  };
}
