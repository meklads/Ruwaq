import { getProposal, listUserProposals } from "./proposal.service";
import { getSession } from "@/modules/auth/server/session";
import { hasProposalEditAccess } from "./proposal-edit-access";

export async function getProposalQuery(id: string) {
  const proposal = await getProposal(id);
  if (!proposal) return null;

  if (!proposal.userId) {
    const allowed = await hasProposalEditAccess(id);
    if (!allowed) return null;
  }

  return proposal;
}

export async function listProposalsQuery() {
  const session = await getSession();
  if (!session?.user?.id) return [];
  return listUserProposals(session.user.id);
}
