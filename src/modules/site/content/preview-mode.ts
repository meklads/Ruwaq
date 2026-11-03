import { isFullSiteGate, isGateEnabled } from "@/shared/lib/app-gate";

/**
 * Private preview = a build made with RUWAQ_PRIVATE_PREVIEW=1 AND running behind the full-site
 * password gate. If either part is missing, drafts are not loaded at all (fail closed).
 */
export function gateActive(): boolean {
  return isGateEnabled() && isFullSiteGate();
}

export function privatePreviewActive(): boolean {
  return process.env.RUWAQ_PRIVATE_PREVIEW === "1" && gateActive();
}
