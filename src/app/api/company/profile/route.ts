import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/lib/db";
import { getSession } from "@/modules/auth/server/session";
import {
  hasPremiumExportAccess,
} from "@/modules/billing/lib/product-access";
import {
  parseExportTemplateId,
  resolveEntitledExportTemplateId,
} from "@/modules/company/lib/export-template-ids";
import { resolveEntitledHeaderFooterStyleId } from "@/modules/proposal/export/header-footer-styles";
import {
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
} from "@/modules/company/lib/field-validators";

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

// The logo upload route falls back to a local-disk relative path
// (/uploads/logos/...) when cloud storage isn't configured — that's a
// trusted value from our own endpoint, not free text, so it's allowed
// alongside real http(s) URLs.
function isValidLogoUrl(value: string): boolean {
  return value.startsWith("/uploads/") || isValidHttpUrl(value);
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.companyProfile.findUnique({
      where: { userId: session.user.id },
      select: { isPaid: true, tier: true, planId: true },
    });
    const isPaid = hasPremiumExportAccess(existing);

    const body = await req.json();
    const requestedTemplateId = parseExportTemplateId(body.exportTemplateId);
    const entitledTemplateId = resolveEntitledExportTemplateId(
      requestedTemplateId,
      isPaid
    );
    const entitledStyleId = resolveEntitledHeaderFooterStyleId(
      body.headerFooterStyleId,
      isPaid
    );

    const logoUrl = str(body.logoUrl);
    const phone = str(body.phone);
    const email = str(body.email);
    const website = str(body.website);
    const portfolioUrl = str(body.portfolioUrl);
    const catalogUrl = str(body.catalogUrl);

    // Never trust the client — the form does the same checks for instant
    // feedback, but a request can always bypass JS. Empty/omitted values
    // are fine (all these fields are optional); only a garbage non-empty
    // value is rejected.
    const fieldErrors: Record<string, string> = {};
    if (logoUrl && !isValidLogoUrl(logoUrl)) fieldErrors.logoUrl = "invalid_url";
    if (phone && !isValidPhone(phone)) fieldErrors.phone = "invalid_phone";
    if (email && !isValidEmail(email)) fieldErrors.email = "invalid_email";
    if (website && !isValidHttpUrl(website)) fieldErrors.website = "invalid_url";
    if (portfolioUrl && !isValidHttpUrl(portfolioUrl)) fieldErrors.portfolioUrl = "invalid_url";
    if (catalogUrl && !isValidHttpUrl(catalogUrl)) fieldErrors.catalogUrl = "invalid_url";

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { error: "validation_failed", fieldErrors },
        { status: 400 }
      );
    }

    const data = {
      companyName: typeof body.companyName === "string" ? body.companyName : "",
      logoUrl,
      address: str(body.address),
      about: str(body.about),
      crNumber: str(body.crNumber),
      vatNumber: str(body.vatNumber),
      phone,
      email,
      website,
      portfolioUrl,
      catalogUrl,
      exportTemplateId: entitledTemplateId,
      headerFooterStyleId: entitledStyleId,
    };

    const profile = await db.companyProfile.upsert({
      where: { userId: session.user.id },
      update: data,
      create: { userId: session.user.id, ...data },
    });

    return NextResponse.json({
      success: true,
      profile,
      downgraded: entitledTemplateId !== requestedTemplateId,
    });
  } catch (error) {
    console.error("Company profile error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
