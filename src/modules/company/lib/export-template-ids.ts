export const EXPORT_TEMPLATE_IDS = [
  "ruwaq",
  "ruwaq_executive",
  "graphics_house",
] as const;

export type ExportTemplateId = (typeof EXPORT_TEMPLATE_IDS)[number];

/** Free forever — the site's "no account, no card" promise depends on this. */
export const FREE_EXPORT_TEMPLATE_ID: ExportTemplateId = "ruwaq";

/** Premium — unlocked by a one-time payment (see modules/billing). */
export const PREMIUM_EXPORT_TEMPLATE_IDS: readonly ExportTemplateId[] = [
  "ruwaq_executive",
  "graphics_house",
];

export function isPremiumExportTemplate(id: ExportTemplateId): boolean {
  return (PREMIUM_EXPORT_TEMPLATE_IDS as readonly string[]).includes(id);
}

export function parseExportTemplateId(value: unknown): ExportTemplateId {
  if (
    typeof value === "string" &&
    (EXPORT_TEMPLATE_IDS as readonly string[]).includes(value)
  ) {
    return value as ExportTemplateId;
  }
  return FREE_EXPORT_TEMPLATE_ID;
}

/** Resolves the template a user is actually entitled to export with. */
export function resolveEntitledExportTemplateId(
  requestedId: unknown,
  isPaid: boolean
): ExportTemplateId {
  const requested = parseExportTemplateId(requestedId);
  if (!isPaid && isPremiumExportTemplate(requested)) {
    return FREE_EXPORT_TEMPLATE_ID;
  }
  return requested;
}
