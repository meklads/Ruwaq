import { NewProposalForm } from "@/modules/proposal/components/new-proposal-form";
import { getLeadProposalPrefill } from "@/modules/marketplace/server/lead-prefill.actions";

type Props = {
  searchParams: { matchId?: string };
};

export default async function NewProposalPage({ searchParams }: Props) {
  const prefill = searchParams.matchId
    ? await getLeadProposalPrefill(searchParams.matchId)
    : null;

  return <NewProposalForm variant="page" prefill={prefill} />;
}
