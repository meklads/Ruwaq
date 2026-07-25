import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { buildProposalExportHtmlForId } from "@/modules/proposal/server/proposal-export-data";
import { hasProposalEditAccess } from "@/modules/proposal/server/proposal-edit-access";
import { logServerError } from "@/shared/lib/usage-events";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allowed = await hasProposalEditAccess(params.id);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logServerError("pdf export", error, { proposalId: params.id });
    return NextResponse.json(
      { error: "Failed to generate PDF", detail: message },
      { status: 500 }
    );
  }
}
