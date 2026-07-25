import { NextResponse } from "next/server";
import { db } from "@/shared/lib/db";
import { isGoogleAuthConfigured } from "@/shared/lib/env";

export const dynamic = "force-dynamic";

/** Liveness probe — always 200 so Coolify does not 502 when DB is misconfigured */
export async function GET() {
  const googleAuth = isGoogleAuthConfigured();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      ok: true,
      app: true,
      db: false,
      tables: false,
      googleAuth,
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
         )`
    );
    const columnNames = new Set(columns.map((c) => c.column_name));
    const schemaReady =
      columnNames.has("editToken") && columnNames.has("exportTemplateId");

    return NextResponse.json({
      ok: true,
      app: true,
      db: true,
      tables: hasProposalTable,
      schemaReady,
      googleAuth,
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
      googleAuth,
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
}
