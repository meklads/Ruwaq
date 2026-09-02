"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  setMarketplaceLeadMatches,
  type AdminLeadMatchResult,
} from "@/modules/marketplace/server/admin-leads.actions";

export type LeadMatchCandidate = {
  id: string;
  label: string;
};

export type LeadMatchSelection = {
  rank: number;
  listingId: string;
  label: string;
};

export type LeadMatchSuggestion = {
  rank: number;
  listingId: string;
  label: string;
  score: number;
  reasons: string[];
};

type Props = {
  leadId: string;
  citySlug: string;
  categorySlug: string;
  candidates: LeadMatchCandidate[];
  initialMatches: LeadMatchSelection[];
  suggestedMatches?: LeadMatchSuggestion[];
};

const ERROR_LABELS: Record<string, string> = {
  unauthorized: "Sign in as admin.",
  not_found: "Lead not found.",
  validation: "Invalid selection — same city & category only.",
  duplicate: "Each contractor can only be picked once.",
  server: "Save failed.",
};

export function AdminLeadMatcher({
  leadId,
  citySlug,
  categorySlug,
  candidates,
  initialMatches,
  suggestedMatches = [],
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const defaultByRank = useMemo(() => {
    const map: Record<number, string> = { 1: "", 2: "", 3: "" };
    const source = initialMatches.length > 0 ? initialMatches : suggestedMatches;
    for (const m of source) {
      if (m.rank >= 1 && m.rank <= 3) map[m.rank] = m.listingId;
    }
    return map;
  }, [initialMatches, suggestedMatches]);

  const [rank1, setRank1] = useState(defaultByRank[1] ?? "");
  const [rank2, setRank2] = useState(defaultByRank[2] ?? "");
  const [rank3, setRank3] = useState(defaultByRank[3] ?? "");

  const applySuggestions = () => {
    const byRank: Record<number, string> = { 1: "", 2: "", 3: "" };
    for (const s of suggestedMatches) {
      if (s.rank >= 1 && s.rank <= 3) byRank[s.rank] = s.listingId;
    }
    setRank1(byRank[1] ?? "");
    setRank2(byRank[2] ?? "");
    setRank3(byRank[3] ?? "");
  };

  const onSave = () => {
    setError(null);
    setSaved(false);
    const slots = [
      { rank: 1, listingId: rank1 },
      { rank: 2, listingId: rank2 },
      { rank: 3, listingId: rank3 },
    ].filter((s): s is { rank: number; listingId: string } => Boolean(s.listingId));

    startTransition(async () => {
      const result: AdminLeadMatchResult = await setMarketplaceLeadMatches({
        leadId,
        matches: slots,
      });
      if (!result.success) {
        setError(ERROR_LABELS[result.error] ?? "Save failed.");
        return;
      }
      setSaved(true);
      router.refresh();
    });
  };

  const renderSelect = (rank: number, value: string, onChange: (v: string) => void) => (
    <label className="flex flex-col gap-1 text-xs">
      <span className="font-semibold text-ruwaq-ink-muted">#{rank}</span>
      <select
        className="rounded border border-ruwaq-stone bg-white px-2 py-1.5 text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={pending}
      >
        <option value="">— Pick contractor —</option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="mt-4 rounded border border-dashed border-ruwaq-stone bg-ruwaq-paper/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-ruwaq-ink-muted">
        Top 3 match · {citySlug} / {categorySlug}
      </p>

      {suggestedMatches.length > 0 && initialMatches.length === 0 ? (
        <div className="mt-3 rounded border border-sky-200 bg-sky-50/80 p-3">
          <p className="text-xs font-semibold text-sky-950">Auto-score suggestions</p>
          <ul className="mt-2 space-y-1 text-xs text-sky-900">
            {suggestedMatches.map((s) => (
              <li key={s.rank}>
                #{s.rank} {s.label}{" "}
                <span className="text-sky-700">
                  ({s.score} pts — {s.reasons.slice(0, 2).join(", ")})
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={applySuggestions}
            className="mt-3 rounded border border-sky-300 bg-white px-3 py-1 text-xs font-semibold text-sky-950"
          >
            Apply suggestions
          </button>
        </div>
      ) : null}

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {renderSelect(1, rank1, setRank1)}
        {renderSelect(2, rank2, setRank2)}
        {renderSelect(3, rank3, setRank3)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save matches"}
        </button>
        {saved ? <span className="text-xs text-emerald-700">Saved</span> : null}
        {error ? <span className="text-xs text-red-700">{error}</span> : null}
      </div>
      {initialMatches.length > 0 ? (
        <ul className="mt-3 space-y-1 text-xs text-ruwaq-ink-soft">
          {initialMatches.map((m) => (
            <li key={m.rank}>
              #{m.rank} {m.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
