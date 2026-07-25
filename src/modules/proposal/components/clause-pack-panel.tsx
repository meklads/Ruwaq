"use client";

import { useState } from "react";
import type { ProposalClauseSelectionView, ReviewGateKey } from "@/shared/types";
import { useT } from "@/shared/i18n/context";

type Props = {
  contentLocale: "ar" | "en";
  canEdit: boolean;
  packNameAr: string | null;
  packNameEn: string | null;
  packVersion: string | null;
  selections: ProposalClauseSelectionView[];
  clauseGateConfirmed: boolean;
  legalGateConfirmed: boolean;
  onConfirmGate: (gateKey: ReviewGateKey) => Promise<void>;
};

export function ClausePackPanel({
  contentLocale,
  canEdit,
  packNameAr,
  packNameEn,
  packVersion,
  selections,
  clauseGateConfirmed,
  legalGateConfirmed,
  onConfirmGate,
}: Props) {
  const t = useT();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const packName =
    contentLocale === "ar"
      ? packNameAr ?? t.review.clauses.defaultPackName
      : packNameEn ?? t.review.clauses.defaultPackName;

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (selections.length === 0) {
    return (
      <section className="section-card border-ruwaq-cream">
        <p className="ruwaq-eyebrow mb-2">{t.review.clauses.title}</p>
        <p className="text-sm text-ruwaq-navy-soft">{t.review.clauses.empty}</p>
      </section>
    );
  }

  return (
    <section className="section-card border-ruwaq-cream shadow-ruwaq">
      <header className="mb-5 border-b border-ruwaq-cream pb-4">
        <p className="ruwaq-eyebrow mb-1.5">{t.review.clauses.title}</p>
        <h2 className="text-base font-bold text-ruwaq-navy">{packName}</h2>
        <p className="ruwaq-trust-panel-meta">
          {packVersion ? `v${packVersion} · ` : ""}
          {t.review.clauses.approvedCount(selections.length)}
        </p>
      </header>

      <div className="space-y-2.5">
        {selections.map((clause, index) => {
          const text =
            contentLocale === "ar" ? clause.renderedTextAr : clause.renderedTextEn;
          const isOpen = expanded[clause.id] ?? clause.isMandatory;

          return (
            <div
              key={clause.id}
              className={`ruwaq-clause-card ${
                clause.isMandatory ? "ruwaq-clause-card--mandatory" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(clause.id)}
                className="ruwaq-clause-card-toggle"
                aria-expanded={isOpen}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ruwaq-navy text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="ruwaq-clause-category">
                    {categoryLabel(clause.category, t)}
                  </span>
                  {clause.isMandatory ? (
                    <span className="ruwaq-badge-mandatory">
                      {t.review.clauses.mandatory}
                    </span>
                  ) : (
                    <span className="ruwaq-badge-recommended">
                      {t.review.clauses.recommended}
                    </span>
                  )}
                </div>
                <span
                  className="shrink-0 text-xs font-medium text-ruwaq-gold"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && text && (
                <div className="ruwaq-clause-body">
                  <p className="ruwaq-clause-text">{text}</p>
                  {clause.sourceRef && (
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-ruwaq-navy-soft/70">
                      {t.review.clauses.source}: {clause.sourceRef}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ruwaq-clause-gates">
        <GateCheckbox
          checked={clauseGateConfirmed}
          disabled={!canEdit || clauseGateConfirmed}
          onConfirm={() => onConfirmGate("clausePack")}
          label={t.review.clauses.confirmClauses}
        />
        <GateCheckbox
          checked={legalGateConfirmed}
          disabled={!canEdit || legalGateConfirmed}
          onConfirm={() => onConfirmGate("legalDisclaimer")}
          label={t.review.clauses.legalDisclaimer}
        />
      </div>
    </section>
  );
}

function GateCheckbox({
  checked,
  disabled,
  onConfirm,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onConfirm: () => void;
  label: string;
}) {
  return (
    <label
      className={`ruwaq-gate-checkbox ${checked ? "ruwaq-gate-checkbox--confirmed" : ""} ${
        disabled && !checked ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {
          if (!checked && !disabled) onConfirm();
        }}
        className="mt-0.5 h-4 w-4 rounded border-ruwaq-cream text-ruwaq-gold focus:ring-ruwaq-gold/30"
      />
      <span className="leading-relaxed">{label}</span>
    </label>
  );
}

function categoryLabel(category: string, t: ReturnType<typeof useT>): string {
  const map = t.review.clauses.categories as Record<string, string>;
  return map[category] ?? category;
}
