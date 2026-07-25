export {
  matchAndPersistClausesForProposal,
  matchAndRenderClauses,
  matchClausesForProposal,
  persistClauseSelections,
  loadClausePackBySlug,
  shouldAutoTriggerClause,
  inferProjectArchetype,
  packSlugForArchetype,
} from "./clause-matcher.service";

export {
  renderClauseTemplate,
  mergePlaceholderValues,
  fillTemplateText,
  normalizePlaceholderDefs,
} from "./clause-renderer.service";

export { requestClauseAiSelection } from "./clause-ai.service";

export type {
  ClauseAiSelection,
  ClauseMatchInput,
  ClauseMatchResult,
  ClausePackRecord,
  ClauseTemplateRecord,
  RenderedClause,
} from "./clause.types";

export {
  PRICE_ESCALATION_KEY_SUFFIX,
  ESCALATION_AUTO_TRIGGER_DAYS,
  isPriceEscalationClause,
  clauseAiSelectionSchema,
} from "./clause.types";
