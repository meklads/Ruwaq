import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { buildProposalExportHtmlForId } from "@/modules/proposal/server/proposal-export-data";
import { hasProposalEditAccess } from "@/modules/proposal/server/proposal-edit-access";

export const dynamic = "force-dynamic";

/** Legacy print HTML export (browser Print → Save as PDF). */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
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
}
