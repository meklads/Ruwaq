export const SERVICE_KEYS = ["project_file", "aman"] as const;
export const SERVICE_CITY_KEYS = ["jeddah", "makkah", "madinah", "other"] as const;
export const SERVICE_PROJECT_KEYS = ["villa_fitout", "apartment_fitout", "renovation", "construction"] as const;
export const SERVICE_STAGE_KEYS = ["planning", "has_quotes", "chose_contractor", "in_progress"] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
export type ServiceCityKey = (typeof SERVICE_CITY_KEYS)[number];
export type ServiceProjectKey = (typeof SERVICE_PROJECT_KEYS)[number];
export type ServiceStageKey = (typeof SERVICE_STAGE_KEYS)[number];
