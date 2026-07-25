import { NextRequest, NextResponse } from "next/server";
import { bindProposalEditKey } from "@/modules/proposal/server/proposal-edit-access";
import { redirectUrl } from "@/shared/lib/request-url";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) {
    return NextResponse.redirect(redirectUrl(req, "/proposals/new"));
  }

  const bound = await bindProposalEditKey(params.id, key);
  if (!bound) {
    return NextResponse.redirect(redirectUrl(req, "/proposals/new"));
  }

  return NextResponse.redirect(redirectUrl(req, `/proposals/${params.id}`));
}
