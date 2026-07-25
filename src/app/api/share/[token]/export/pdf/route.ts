import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { buildProposalExportHtmlForId } from "@/modules/proposal/server/proposal-export-data";
import { getProposalIdByShareToken } from "@/modules/proposal/server/proposal.service";

export const dynamic = "force-dynamic";

async function buildExportResponse(proposalId: string) {
  return buildProposalExportHtmlForId(proposalId, { watermarked: true });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const proposalId = await getProposalIdByShareToken(params.token);
    if (!proposalId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const result = await buildExportResponse(proposalId);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(result.html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Share export error:", error);
    return NextResponse.json({ error: "Failed to load proposal" }, { status: 500 });
  }
}
