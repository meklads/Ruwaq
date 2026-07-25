/**
 * Approved placeholder defaults — single source of truth for seed + clause renderer.
 */
export const PLACEHOLDER_DEFAULTS = {
  escalation_threshold_percent: "10",
  escalation_notice_days: "7",
  debris_fee_days: "7",
  vat_rate_percent: "15",
  variance_percent: "15",
  vat_inclusion_text: "لا تشمل",
  vat_inclusion_text_en: "exclusive of",
  retention_percent: "10",
  retention_months: "12",
  warranty_months: "12",
  quote_validity_days: "30",
  project_duration_days: "90",
  delay_penalty_percent: "1",
  delay_penalty_weeks: "2",
  delay_penalty_cap_percent: "10",
  site_visit_frequency: "أسبوعياً",
  rfi_response_days: "5",
  sla_response_hours: "4",
  sla_routine_days: "3",
  sla_hours: "8:00–17:00",
  sla_geo_km: "50",
  spare_parts_cap_sar: "5000",
  spare_parts_markup_percent: "15",
  excluded_age_years: "10",
  renewal_notice_days: "30",
  renewal_increase_cap_percent: "10",
} as const satisfies Record<string, string>;

export type PlaceholderKey = keyof typeof PLACEHOLDER_DEFAULTS;

export function getPlaceholderDefault(key: string): string {
  return PLACEHOLDER_DEFAULTS[key as PlaceholderKey] ?? "";
}
