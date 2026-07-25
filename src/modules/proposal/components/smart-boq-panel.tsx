"use client";

import { useMemo, useState } from "react";
import type { ProposalBoqLineView, ReviewGateKey, ReviewGates } from "@/shared/types";
import { useT } from "@/shared/i18n/context";
import { formatSar } from "@/shared/lib/format";
import { updateBoqLineAction } from "@/modules/proposal/server/proposal.actions";

function sumBoqAmounts(lines: ReadonlyArray<{ amount: number }>): number {
  return Math.round(lines.reduce((acc, line) => acc + line.amount, 0) * 100) / 100;
}

type Props = {
  proposalId: string;
  budget: number;
  commercialMode: "fixed_price" | "estimate_only";
  variancePercent: number;
  lines: ProposalBoqLineView[];
  contentLocale: "ar" | "en";
  canEdit: boolean;
  commercialGateConfirmed: boolean;
  boqGateConfirmed: boolean;
  onLinesUpdated: (lines: ProposalBoqLineView[], reviewGates: ReviewGates | null) => void;
  onConfirmGate: (gateKey: ReviewGateKey) => Promise<void>;
};

export function SmartBoqPanel({
  proposalId,
  budget,
  commercialMode,
  variancePercent,
  lines: initialLines,
  contentLocale,
  canEdit,
  commercialGateConfirmed,
  boqGateConfirmed,
  onLinesUpdated,
  onConfirmGate,
}: Props) {
  const t = useT();
  const isEstimateOnly = commercialMode === "estimate_only";
  const [lines, setLines] = useState(initialLines);
  const [savingLineId, setSavingLineId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const sum = useMemo(() => sumBoqAmounts(lines), [lines]);
  const sumValid = Math.abs(sum - budget) < 0.02;

  const handleAmountBlur = async (lineId: string, raw: string) => {
    if (!canEdit) return;
    const parsed = parseFloat(raw.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(parsed)) return;

    setSavingLineId(lineId);
    const result = await updateBoqLineAction(proposalId, lineId, parsed);
    setSavingLineId(null);

    if (result.success) {
      setLines(result.lines);
      if (result.reviewGates) {
        onLinesUpdated(result.lines, result.reviewGates);
      }
      setToast(t.review.boq.redistributeToast);
      setTimeout(() => setToast(null), 2500);
    } else {
      alert(result.error ?? t.form.errors.generic);
    }
  };

  if (lines.length === 0) {
    return <p className="text-sm text-ruwaq-navy-soft">{t.review.boq.empty}</p>;
  }

  return (
    <div className="ruwaq-trust-panel">
      {toast && <p className="ruwaq-trust-toast">{toast}</p>}

      {isEstimateOnly && (
        <div className="ruwaq-estimate-callout">
          {t.review.boq.estimateDisclaimerTop(variancePercent)}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="ruwaq-trust-panel-title">{t.review.boq.title}</h3>
        <span
          className={
            sumValid ? "ruwaq-badge-budget-match" : "ruwaq-badge-budget-mismatch"
          }
        >
          {sumValid ? (
            <>
              <span aria-hidden className="text-emerald-600">
                ✓
              </span>
              {t.review.boq.budgetLockMatch}
            </>
          ) : (
            t.review.boq.budgetLockMismatch
          )}
        </span>
      </div>

      <div className="ruwaq-trust-table-wrap">
        <table className="ruwaq-trust-table">
          <thead>
            <tr>
              <th className="text-start">{t.review.boq.lineItem}</th>
              <th className="text-end">{t.review.amount}</th>
              <th className="text-center">{t.review.percentage}</th>
              {isEstimateOnly && (
                <th className="text-center">{t.review.boq.estimateBadge}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const label = contentLocale === "ar" ? line.labelAr : line.labelEn;
              return (
                <tr key={line.id}>
                  <td className="pe-3 font-medium">{label}</td>
                  <td className="text-end tabular-nums">
                    <input
                      type="text"
                      defaultValue={String(Math.round(line.amount))}
                      readOnly={!canEdit}
                      disabled={savingLineId === line.id}
                      onBlur={(e) => handleAmountBlur(line.id, e.target.value)}
                      className="ruwaq-trust-input"
                    />
                  </td>
                  <td className="text-center tabular-nums text-ruwaq-navy-soft">
                    {Number(line.percent ?? 0).toFixed(1)}%
                  </td>
                  {isEstimateOnly && (
                    <td className="text-center">
                      {(line.isEstimated || isEstimateOnly) && (
                        <span className="ruwaq-badge-estimate">
                          {t.review.boq.estimateBadge}
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>{t.review.total}</td>
              <td className="text-end tabular-nums">
                {formatSar(sum, contentLocale)} {t.review.currency}
              </td>
              <td className="text-center tabular-nums">100%</td>
              {isEstimateOnly && <td />}
            </tr>
          </tfoot>
        </table>
      </div>

      {isEstimateOnly && (
        <p className="ruwaq-estimate-footnote">
          {t.review.boq.estimateDisclaimerBottom(variancePercent)}
        </p>
      )}

      <div className="ruwaq-gate-panel">
        <GateCheckbox
          id="gate-commercial"
          label={t.review.boq.confirmCommercial}
          checked={commercialGateConfirmed}
          disabled={!canEdit || commercialGateConfirmed}
          onConfirm={() => onConfirmGate("commercialTerms")}
        />
        <GateCheckbox
          id="gate-boq"
          label={t.review.boq.confirmBoq}
          checked={boqGateConfirmed}
          disabled={!canEdit || !sumValid || boqGateConfirmed}
          onConfirm={() => onConfirmGate("boqBreakdown")}
        />
      </div>
    </div>
  );
}

function GateCheckbox({
  id,
  label,
  checked,
  disabled,
  onConfirm,
}: {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onConfirm: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`ruwaq-gate-checkbox ${checked ? "ruwaq-gate-checkbox--confirmed" : ""} ${
        disabled && !checked ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {
          if (!checked && !disabled) onConfirm();
        }}
        className="mt-0.5 h-4 w-4 rounded border-ruwaq-cream text-ruwaq-gold focus:ring-ruwaq-gold/30"
      />
      <span>{label}</span>
    </label>
  );
}
