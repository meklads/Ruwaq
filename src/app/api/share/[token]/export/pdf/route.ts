import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { getProposalIdByShareToken } from "@/modules/proposal/server/proposal.service";
import { buildProposalQuotePdfBuffer } from "@/modules/proposal/pdf/build-proposal-quote-pdf";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const proposalId = await getProposalIdByShareToken(params.token);
    if (!proposalId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const result = await buildProposalQuotePdfBuffer(proposalId, { watermarked: true });
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fileBase = asciiFilename(result.projectName, "proposal");
    const inline = req.nextUrl.searchParams.get("inline") !== "0";
    const filename = `${fileBase}_Quote.pdf`;

    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Share export error:", error);
    return NextResponse.json({ error: "Failed to load proposal" }, { status: 500 });
  }
}
