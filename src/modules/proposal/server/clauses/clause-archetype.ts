import type { ProjectArchetype } from "@/shared/types";

const ARCHETYPE_PACK_SLUG: Record<ProjectArchetype, string> = {
  fit_out: "fit_out_v1",
  supervision: "supervision_v1",
  maintenance: "maintenance_v1",
  other: "fit_out_v1",
};

/** Keyword classifier — deterministic; AI does not choose pack in Phase 1 */
export function inferProjectArchetype(input: {
  description: string;
  propertyType?: string | null;
  specifications?: string | null;
}): ProjectArchetype {
  const blob = [
    input.description,
    input.propertyType ?? "",
    input.specifications ?? "",
  ]
    .join(" ")
    .toLowerCase();

  if (/supervis|إشراف|استشاري|engineering|مشرف|rfi|ncr/i.test(blob)) {
    return "supervision";
  }
  if (/maintenance|صيان|sla|annual|سنوي|عقد صيان/i.test(blob)) {
    return "maintenance";
  }
  if (/fit.?out|تشطيب|interior|ديكور|ترميم|finishing/i.test(blob)) {
    return "fit_out";
  }

  return "fit_out";
}

export function packSlugForArchetype(archetype: ProjectArchetype): string {
  return ARCHETYPE_PACK_SLUG[archetype];
}

/** Default alternative when AI omits a group — contractor-protective picks */
export const DEFAULT_ALTERNATIVE_BY_GROUP: Record<string, string> = {
  fit_out_materials_supply: "SA-FITOUT-MAT-SUPPLY-CONTRACTOR",
  fit_out_delay_penalty: "SA-FITOUT-DELAY-PENALTY-NONE",
};

export function parseAutoTriggerRules(
  raw: unknown
): { minDurationDays?: number } | null {
  if (!raw || typeof raw !== "object") return null;
  const minDurationDays = (raw as { minDurationDays?: unknown }).minDurationDays;
  if (typeof minDurationDays === "number" && minDurationDays > 0) {
    return { minDurationDays };
  }
  return null;
}
