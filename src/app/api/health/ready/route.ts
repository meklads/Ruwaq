import { NextResponse } from "next/server";
import { db } from "@/shared/lib/db";
import { isGoogleAuthConfigured } from "@/shared/lib/env";

export const dynamic = "force-dynamic";

function envSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function authSecretReady(): boolean {
  const secret =
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();
  return Boolean(
    secret && secret.length >= 32 && secret !== "runtime-placeholder-change-me"
  );
}

/**
 * Readiness probe — 503 when DB/schema is not ready so Coolify can fail health.
 * Use /api/health for liveness (always 200).
 */
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { ok: false, ready: false, reason: "DATABASE_URL missing" },
      { status: 503 }
    );
  }
  if (!authSecretReady()) {
    return NextResponse.json(
      { ok: false, ready: false, reason: "AUTH_SECRET missing" },
      { status: 503 }
    );
  }
  if (!isGoogleAuthConfigured()) {
    // Google is recommended but not hard-required for readiness.
  }

  try {
    await db.$queryRaw`SELECT 1`;
    const columns = await db.$queryRawUnsafe<{ column_name: string }[]>(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'public'
         AND (
           (table_name = 'Proposal' AND column_name = 'editToken')
           OR (table_name = 'CompanyProfile' AND column_name IN ('exportTemplateId', 'letterheadFrameId', 'paletteId'))
           OR (table_name = 'DirectoryApplication' AND column_name = 'listingId')
           OR (table_name = 'MarketplaceLeadMatch' AND column_name = 'viewedAt')
           OR (table_name = 'MarketplaceLead' AND column_name = 'clientEmail')
         )`
    );
    const names = new Set(columns.map((c) => c.column_name));
    const schemaReady =
      names.has("editToken") &&
      names.has("exportTemplateId") &&
      names.has("listingId") &&
      names.has("viewedAt") &&
      names.has("clientEmail");

    if (!schemaReady) {
      return NextResponse.json(
        {
          ok: false,
          ready: false,
          schemaReady: false,
          storage: envSet("STORAGE_ACCESS_KEY") && envSet("STORAGE_BUCKET"),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      ready: true,
      schemaReady: true,
      letterheadColumns:
        names.has("letterheadFrameId") && names.has("paletteId"),
      storage: envSet("STORAGE_ACCESS_KEY") && envSet("STORAGE_BUCKET"),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "db_error";
    return NextResponse.json(
      { ok: false, ready: false, reason: message },
      { status: 503 }
    );
  }
}
