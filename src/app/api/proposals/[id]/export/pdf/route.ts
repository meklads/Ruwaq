import { NextRequest, NextResponse } from "next/server";
import { asciiFilename } from "@/modules/proposal/server/proposal-export-html";
import { hasProposalEditAccess } from "@/modules/proposal/server/proposal-edit-access";
import { logServerError } from "@/shared/lib/usage-events";
import { buildProposalQuotePdfBuffer } from "@/modules/proposal/pdf/build-proposal-quote-pdf";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allowed = await hasProposalEditAccess(params.id);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const result = await buildProposalQuotePdfBuffer(params.id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fileBase = asciiFilename(result.projectName, "proposal");
    const inline = req.nextUrl.searchParams.get("inline") === "1";
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
    const message = error instanceof Error ? error.message : "Unknown error";
    logServerError("pdf export", error, { proposalId: params.id });
    return NextResponse.json(
      { error: "Failed to generate PDF", detail: message },
      { status: 500 }
    );
  }
}
