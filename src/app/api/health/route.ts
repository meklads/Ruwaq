import { NextResponse } from "next/server";
import { db } from "@/shared/lib/db";
import { isGoogleAuthConfigured } from "@/shared/lib/env";

export const dynamic = "force-dynamic";

function envSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function buildIntegrations() {
  return {
    googleAuth: isGoogleAuthConfigured(),
    authSecret: envSet("AUTH_SECRET"),
    authUrl: envSet("AUTH_URL"),
    resend: envSet("RESEND_API_KEY") && envSet("RESEND_FROM"),
    ruwaqLeadEmail: envSet("RUWQ_LEAD_EMAIL"),
    turrivaLeadEmail: envSet("TURRIVA_LEAD_EMAIL"),
    graphicsHouseLeadEmail: envSet("GRAPHICS_HOUSE_LEAD_EMAIL"),
    supportWhatsApp:
      envSet("RUWQ_SUPPORT_WHATSAPP") || envSet("NEXT_PUBLIC_RUWQ_SUPPORT_WHATSAPP"),
    ga4: envSet("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  };
}

/** Liveness probe — always 200 so Coolify does not 502 when DB is misconfigured */
export async function GET() {
  const integrations = buildIntegrations();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      ok: true,
      app: true,
      db: false,
      tables: false,
      schemaReady: false,
      integrations,
      error: "DATABASE_URL is not set",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    await db.$queryRaw`SELECT 1`;
    const tables = await db.$queryRawUnsafe<{ table_name: string }[]>(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_name = 'Proposal'`
    );
    const hasProposalTable = tables.length > 0;

    const columns = await db.$queryRawUnsafe<{ column_name: string }[]>(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'public'
         AND (
           (table_name = 'Proposal' AND column_name = 'editToken')
           OR (table_name = 'CompanyProfile' AND column_name = 'exportTemplateId')
           OR (table_name = 'DirectoryApplication' AND column_name = 'listingId')
         )`
    );
    const columnNames = new Set(columns.map((c) => c.column_name));
    const schemaReady =
      columnNames.has("editToken") &&
      columnNames.has("exportTemplateId") &&
      columnNames.has("listingId");

    return NextResponse.json({
      ok: true,
      app: true,
      db: true,
      tables: hasProposalTable,
      schemaReady,
      integrations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    console.error("[health] DB check failed:", message);
    return NextResponse.json({
      ok: true,
      app: true,
      db: false,
      tables: false,
      schemaReady: false,
      integrations,
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
}
