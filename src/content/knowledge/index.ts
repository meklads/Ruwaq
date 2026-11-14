/**
 * PUBLISHED knowledge content. Terms live in ./terms.ts after the owner approves them.
 * Styles live in ./styles.ts once the owner (the reviewing architect) approves them.
 * See src/modules/site/knowledge/schema.ts for the required fields.
 */
import { APPROVED_TERMS } from "./terms";
import { APPROVED_TERMS_BATCH2 } from "./terms-batch2";
import { APPROVED_STYLES } from "./styles";

export const TERMS: unknown[] = [...APPROVED_TERMS, ...APPROVED_TERMS_BATCH2];
export const STYLES: unknown[] = APPROVED_STYLES;
