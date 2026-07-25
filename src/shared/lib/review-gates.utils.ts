import type {
  ReviewGateKey,
  ReviewGateState,
  ReviewGates,
} from "@/shared/types/trust-layer.types";

export const ALL_REVIEW_GATE_KEYS: ReviewGateKey[] = [
  "projectUnderstanding",
  "scope",
  "deliverables",
  "commercialTerms",
  "boqBreakdown",
  "clausePack",
  "timeline",
  "legalDisclaimer",
];

const BASE_REQUIRED_PUBLISH_GATES: ReviewGateKey[] = [
  "projectUnderstanding",
  "scope",
  "commercialTerms",
  "boqBreakdown",
  "clausePack",
  "legalDisclaimer",
];

function emptyGateState(): ReviewGateState {
  return { confirmed: false, at: null };
}

export function getRequiredPublishGateKeys(options: {
  hasDeliverables: boolean;
}): ReviewGateKey[] {
  const keys = [...BASE_REQUIRED_PUBLISH_GATES];
  if (options.hasDeliverables) {
    keys.splice(2, 0, "deliverables");
  }
  return keys;
}

export function initializeReviewGates(): ReviewGates {
  return ALL_REVIEW_GATE_KEYS.reduce((acc, key) => {
    acc[key] = emptyGateState();
    return acc;
  }, {} as ReviewGates);
}

export function parseReviewGates(raw: unknown): ReviewGates {
  const base = initializeReviewGates();

  if (!raw || typeof raw !== "object") {
    return base;
  }

  for (const key of ALL_REVIEW_GATE_KEYS) {
    const entry = (raw as Record<string, unknown>)[key];
    if (!entry || typeof entry !== "object") continue;

    const confirmed = (entry as ReviewGateState).confirmed === true;
    const at = (entry as ReviewGateState).at;
    base[key] = {
      confirmed,
      at: typeof at === "string" ? at : confirmed ? new Date().toISOString() : null,
    };
  }

  return base;
}

export function migrateLegacyReviewSections(
  reviewedSections: string[] | null | undefined,
  gates: ReviewGates
): ReviewGates {
  const next = { ...gates };
  const now = new Date().toISOString();
  const legacyMap: Record<string, ReviewGateKey> = {
    commercialTerms: "commercialTerms",
    assumptions: "clausePack",
    exclusions: "clausePack",
    scopeItems: "scope",
    deliverables: "deliverables",
    timeline: "timeline",
    boqBreakdown: "boqBreakdown",
    clausePack: "clausePack",
    legalDisclaimer: "legalDisclaimer",
    projectUnderstanding: "projectUnderstanding",
  };

  for (const section of reviewedSections ?? []) {
    const gateKey = legacyMap[section];
    if (gateKey && !next[gateKey].confirmed) {
      next[gateKey] = { confirmed: true, at: now };
    }
  }

  return next;
}

export function resolveReviewGates(proposal: {
  reviewGates: unknown;
  reviewedSections: unknown;
}): ReviewGates {
  const parsed = parseReviewGates(proposal.reviewGates);
  if (proposal.reviewGates) return parsed;

  return migrateLegacyReviewSections(
    proposal.reviewedSections as string[] | undefined,
    parsed
  );
}

export function getPendingPublishGates(
  gates: ReviewGates,
  options: { hasDeliverables: boolean }
): ReviewGateKey[] {
  const required = getRequiredPublishGateKeys(options);
  return required.filter((key) => !gates[key]?.confirmed);
}

export function canPublishFromGates(
  gates: ReviewGates,
  hasDeliverables: boolean
): boolean {
  return getPendingPublishGates(gates, { hasDeliverables }).length === 0;
}

export function countRequiredGateProgress(
  gates: ReviewGates,
  hasDeliverables: boolean
): { confirmed: number; total: number } {
  const required = getRequiredPublishGateKeys({ hasDeliverables });
  const confirmed = required.filter((k) => gates[k]?.confirmed).length;
  return { confirmed, total: required.length };
}
