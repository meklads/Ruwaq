import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/shared/i18n/locale";
import { getOffPlanProject } from "@/content/off-plan-projects";
import { buildProjectBrochurePdfBuffer } from "@/modules/marketplace/pdf/build-project-brochure-pdf";

export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const project = getOffPlanProject(params.slug);
  if (!project) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const localeParam = req.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "ar";

  const buffer = await buildProjectBrochurePdfBuffer(project, locale);
  const filename = `${project.slug}-brochure-${locale}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
