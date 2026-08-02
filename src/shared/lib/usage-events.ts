import { Prisma } from "@prisma/client";
import { db } from "@/shared/lib/db";

/**
 * In-house, zero-dependency usage tracking — no Sentry/PostHog account
 * needed to start seeing real traffic numbers. Every call is fire-and-forget
 * and swallows its own errors: a logging failure must never break the
 * actual user-facing action it's attached to.
 */
export type UsageEventType =
  | "proposal_created"
  | "proposal_generated"
  | "pdf_exported"
  | "guest_claimed"
  | "server_error"
  | "quota_blocked"
  | "marketplace_lead_submitted"
  | "off_plan_brochure_lead"
  | "visualization_lead_submitted"
  | "pro_apply_click"
  | "tour_shop_click"
  | "developer_inquiry";

export function logUsageEvent(
  type: UsageEventType,
  data: {
    userId?: string | null;
    proposalId?: string | null;
    metadata?: Record<string, unknown>;
  } = {}
): void {
  // Intentionally not awaited by callers — never delay the real response
  // waiting on an analytics write.
  db.usageEvent
    .create({
      data: {
        type,
        userId: data.userId ?? null,
        proposalId: data.proposalId ?? null,
        metadata: (data.metadata as Prisma.InputJsonValue | undefined) ?? undefined,
      },
    })
    .catch((error) => {
      console.warn(`[usage-events] failed to log "${type}":`, error);
    });
}

/**
 * In-house error tracking — no Sentry account needed. Logs a "server_error"
 * UsageEvent (visible in /admin/metrics) AND still prints to console so
 * platform logs (Coolify) keep the full stack trace. Fire-and-forget, same
 * as logUsageEvent: a logging failure must never break the real response.
 */
export function logServerError(
  context: string,
  error: unknown,
  data: { userId?: string | null; proposalId?: string | null } = {}
): void {
  console.error(`[error] ${context}:`, error);
  const message = error instanceof Error ? error.message : String(error);
  logUsageEvent("server_error", {
    userId: data.userId,
    proposalId: data.proposalId,
    metadata: { context, message: message.slice(0, 500) },
  });
}
