"use server";

import {
  logUsageEvent,
  type UsageEventType,
} from "@/shared/lib/usage-events";

const CLIENT_EVENTS = new Set<UsageEventType>([
  "pro_apply_click",
  "tour_shop_click",
  "developer_inquiry",
]);

/** Fire-and-forget product events from client interactions (allowlisted). */
export async function logClientProductEvent(
  type: UsageEventType,
  metadata?: Record<string, unknown>
): Promise<void> {
  if (!CLIENT_EVENTS.has(type)) return;
  logUsageEvent(type, { metadata });
}
