import { db } from "@/shared/lib/db";
import { randomBytes } from "crypto";
import { asciiFilename } from "./proposal-export-html";
import { assertCanMutateProposal } from "./proposal-auth";
import { assertCanPublishProposal } from "./review-gates.service";
import { logUsageEvent } from "@/shared/lib/usage-events";

function appBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.AUTH_URL ??
    "https://turriva.co"
  ).replace(/\/$/, "");
}

export async function exportProposalAsPdf(proposalId: string) {
  await assertCanMutateProposal(proposalId);

  const proposal = await db.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) throw new Error("Proposal not found");

  await assertCanPublishProposal(proposalId);

  const proposalNumber =
    proposal.proposalNumber ??
    `PROP-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

  const shareToken = randomBytes(12).toString("hex");

  try {
    await db.generatedDocument.create({
      data: {
        proposalId,
        type: "pdf",
        fileUrl: null,
        shareToken,
      },
    });
  } catch (error) {
    console.warn("Could not save GeneratedDocument record:", error);
  }

  await db.proposal.update({
    where: { id: proposalId },
    data: {
      status: "exported",
      exportedAt: new Date(),
      proposalNumber,
    },
  });

  const fileBase = asciiFilename(proposal.projectName, "proposal");
  const base = appBaseUrl();

  logUsageEvent("pdf_exported", {
    userId: proposal.userId,
    proposalId,
    metadata: { commercialMode: proposal.commercialMode },
  });

  return {
    url: `/api/proposals/${proposalId}/export/pdf`,
    filename: `${fileBase}_Proposal.html`,
    proposalNumber,
    shareUrl: `${base}/share/${shareToken}`,
  };
}

export async function getShareUrlForProposal(
  proposalId: string
): Promise<string | null> {
  const doc = await db.generatedDocument.findFirst({
    where: { proposalId, shareToken: { not: null } },
    orderBy: { createdAt: "desc" },
    select: { shareToken: true },
  });
  if (!doc?.shareToken) return null;
  return `${appBaseUrl()}/share/${doc.shareToken}`;
}
