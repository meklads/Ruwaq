import { notFound } from "next/navigation";
import { getShareViewByToken } from "@/modules/proposal/server/share.service";
import { ProposalShareView } from "@/modules/proposal/components/proposal-share-view";
import { getMessages } from "@/shared/i18n";
import { localeDir } from "@/shared/i18n/locale";

export const dynamic = "force-dynamic";

type Props = {
  params: { token: string };
};

export default async function ShareProposalPage({ params }: Props) {
  const data = await getShareViewByToken(params.token);
  if (!data) notFound();

  const t = getMessages(data.locale);
  const dir = localeDir(data.locale);

  return (
    <ProposalShareView
      data={data}
      labels={t.share}
      reviewLabels={t.review}
      exportLabels={t.export}
      dir={dir}
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
