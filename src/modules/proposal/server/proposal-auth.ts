import { db } from "@/shared/lib/db";
import { hasProposalEditAccess } from "./proposal-edit-access";

export class ProposalAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProposalAccessError";
  }
}

/** Owned proposals require the owner; guests need a valid edit cookie (from ?key=). */
export async function assertCanMutateProposal(proposalId: string) {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { id: true, userId: true },
  });
  if (!proposal) {
    throw new ProposalAccessError("Proposal not found");
  }

  const allowed = await hasProposalEditAccess(proposalId);
  if (!allowed) {
    throw new ProposalAccessError("Unauthorized");
  }

  return proposal;
}

export async function assertCanClaimProposal(
  proposalId: string,
  userId: string
) {
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    select: { userId: true },
  });
  if (!proposal) {
    throw new ProposalAccessError("Proposal not found");
  }
  if (proposal.userId && proposal.userId !== userId) {
    throw new ProposalAccessError("This proposal belongs to another account");
  }
  if (!proposal.userId) {
    const allowed = await hasProposalEditAccess(proposalId);
    if (!allowed) {
      throw new ProposalAccessError("Unauthorized");
    }
  }
  return proposal;
}
