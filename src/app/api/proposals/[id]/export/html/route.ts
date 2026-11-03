import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { buildProposalExportHtmlForId } from "@/modules/proposal/server/proposal-export-data";
import { hasProposalEditAccess } from "@/modules/proposal/server/proposal-edit-access";
import { canPublishProposal } from "@/modules/proposal/server/review-gates.service";
import { db } from "@/shared/lib/db";

export const dynamic = "force-dynamic";

/** Themed print export: the template, palette and header chosen for the proposal; the browser prints it or saves it as PDF. */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const allowed = await hasProposalEditAccess(params.id);
  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Same trust-layer rule as the PDF export: the review gates must be confirmed first.
  // (Status "exported" is allowed so a proposal can be printed again after it was exported.)
  const gateState = await db.proposal.findUnique({
    where: { id: params.id },
    select: { status: true, reviewGates: true, reviewedSections: true, deliverables: true },
  });
  const reviewed = gateState && ["review", "reviewed", "exported"].includes(gateState.status);
  if (!gateState || !reviewed || !canPublishProposal(gateState).allowed) {
    return new NextResponse(
      "<!doctype html><meta charset=utf-8><title>Review required</title><p dir=rtl style=\"font-family:sans-serif;padding:2rem\">أكمل بوابات المراجعة في المحرّر قبل التصدير.<br>Complete the review gates in the editor before exporting.</p>",
      { status: 409, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
    );
  }

  const result = await buildProposalExportHtmlForId(params.id);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fileBase = asciiFilename(result.projectName, "proposal");

  return new NextResponse(result.html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${fileBase}_Proposal.html"`,
      "Cache-Control": "no-store",
    },
  });
}
