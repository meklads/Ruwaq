/**
 * PUBLISHED knowledge content. Terms live in ./terms.ts after the owner approves them.
 * Styles stay empty until a style passes the owner's review and an architect's review.
 * See src/modules/site/knowledge/schema.ts for the required fields.
 */
import { APPROVED_TERMS } from "./terms";
import { APPROVED_TERMS_BATCH2 } from "./terms-batch2";

export const TERMS: unknown[] = [...APPROVED_TERMS, ...APPROVED_TERMS_BATCH2];
export const STYLES: unknown[] = [];
