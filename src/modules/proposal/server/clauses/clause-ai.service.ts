/**
 * AI selects clause keys and placeholder overrides ONLY — never legal prose.
 */

import OpenAI from "openai";
import type { Locale } from "@/shared/i18n/locale";
import { realEstateSystemRole } from "../proposal-ai.prompts";
import type { ClauseAiSelection, ClauseTemplateRecord } from "./clause.types";
import { clauseAiSelectionSchema } from "./clause.types";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export type ClauseAiInput = {
  locale: Locale;
  projectContext: string;
  templates: ClauseTemplateRecord[];
};

function buildClauseCatalog(templates: ClauseTemplateRecord[]): string {
  const optional = templates.filter(
    (t) => !t.isMandatory && !t.alternativeGroup
  );
  const groups = new Map<string, ClauseTemplateRecord[]>();

  for (const t of templates) {
    if (t.alternativeGroup) {
      const list = groups.get(t.alternativeGroup) ?? [];
      list.push(t);
      groups.set(t.alternativeGroup, list);
    }
  }

  const lines: string[] = [
    "OPTIONAL clauses (you may include clauseKey in optionalClauseKeys):",
    ...optional.map(
      (t) =>
        `- ${t.clauseKey} [${t.category}]${t.sourceRef ? ` ref=${t.sourceRef}` : ""}`
    ),
    "",
    "ALTERNATIVE groups (pick exactly one clauseKey per group in alternativeChoices):",
  ];

  for (const [group, members] of groups) {
    lines.push(`  Group "${group}":`);
    for (const m of members) {
      lines.push(`    - ${m.clauseKey}`);
    }
  }

  lines.push(
    "",
    "FORBIDDEN: Do NOT write legal text, clauses, or assumptions. Return JSON only."
  );

  return lines.join("\n");
}

function mockClauseSelection(templates: ClauseTemplateRecord[]): ClauseAiSelection {
  const optionalClauseKeys = templates
    .filter(
      (t) =>
        !t.isMandatory &&
        !t.alternativeGroup &&
        (t.category === "permits" || t.category === "soil")
    )
    .map((t) => t.clauseKey);

  const alternativeChoices: Record<string, string> = {};
  const groups = new Set(
    templates.map((t) => t.alternativeGroup).filter(Boolean) as string[]
  );

  for (const group of groups) {
    const members = templates.filter((t) => t.alternativeGroup === group);
    const contractorPick =
      members.find((m) => m.riskSide === "protects_contractor") ?? members[0];
    if (contractorPick) {
      alternativeChoices[group] = contractorPick.clauseKey;
    }
  }

  return clauseAiSelectionSchema.parse({
    optionalClauseKeys,
    alternativeChoices,
    placeholderOverrides: {},
    selectionReasons: {},
  });
}

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function requestClauseAiSelection(
  input: ClauseAiInput
): Promise<ClauseAiSelection> {
  const catalog = buildClauseCatalog(input.templates);

  if (!openai) {
    return mockClauseSelection(input.templates);
  }

  const lang =
    input.locale === "ar"
      ? "Write selectionReasons in Arabic. JSON keys stay English."
      : "Write selectionReasons in English. JSON keys stay English.";

  const prompt = `${input.projectContext}

${catalog}

${lang}

Respond in JSON:
{
  "optionalClauseKeys": ["clauseKey", ...],
  "alternativeChoices": { "groupName": "chosenClauseKey" },
  "placeholderOverrides": { "placeholder_key": "value" },
  "selectionReasons": { "clauseKey": "short reason for UX tooltip" }
}

Rules:
- optionalClauseKeys must be from OPTIONAL list only
- alternativeChoices must pick one key per group
- placeholderOverrides only for keys that exist on chosen clauses
- NEVER include legal prose or full clause text`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: realEstateSystemRole(
            input.locale,
            "You are a Saudi construction clause selector. You ONLY return clauseKey references and placeholder values. You NEVER draft legal text."
          ),
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content ?? "{}";
    const parsed = parseJson(content, {});
    return clauseAiSelectionSchema.parse(parsed);
  } catch {
    return mockClauseSelection(input.templates);
  }
}
