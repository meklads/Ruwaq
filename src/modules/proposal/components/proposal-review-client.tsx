"use client";

import { useState, useCallback, useMemo } from "react";
import type { Proposal, ProposalBoqLineView, ReviewGateKey, ReviewGates } from "@/shared/types";
import {
  updateFieldAction,
  addItemAction,
  removeItemAction,
  markReviewedAction,
  confirmReviewGateAction,
  exportPdfAction,
  generateWithAI,
  regenerateSectionAction,
} from "@/modules/proposal/server/proposal.actions";
import Link from "next/link";
import { ProposalPdfPreviewDialog } from "@/modules/proposal/components/proposal-pdf-preview-dialog";
import { useLocale, useT } from "@/shared/i18n/context";
import { validateLocaleText } from "@/shared/i18n/locale";
import { formatDate, formatSar } from "@/shared/lib/format";
import {
  canPublishFromGates,
  countRequiredGateProgress,
  resolveReviewGates,
} from "@/shared/lib/review-gates.utils";
import { ClaimProposal } from "@/modules/proposal/components/claim-proposal";
import { SmartBoqPanel } from "@/modules/proposal/components/smart-boq-panel";
import { ClausePackPanel } from "@/modules/proposal/components/clause-pack-panel";
import { buildWhatsAppMessage } from "@/modules/proposal/lib/whatsapp";
import { applyProposalFieldUpdate } from "@/shared/lib/json-path";

interface Props {
  proposal: Proposal;
  companyName?: string | null;
  profileThin?: boolean;
  isGuest?: boolean;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string" ? item : String((item as { text?: string })?.text ?? item ?? "")
  );
}

function asDeliverables(value: unknown): Proposal["deliverables"] {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      id: String(row.id ?? `d-${index}`),
      name: String(row.name ?? ""),
      description: String(row.description ?? ""),
    };
  });
}

function normalizeProposal(proposal: Proposal): Proposal {
  return {
    ...proposal,
    scopeItems: Array.isArray(proposal.scopeItems) ? proposal.scopeItems : [],
    deliverables: asDeliverables(proposal.deliverables),
    assumptions: asStringList(proposal.assumptions),
    exclusions: asStringList(proposal.exclusions),
  };
}

export function ProposalReviewClient({
  proposal: initial,
  companyName,
  profileThin,
  isGuest,
}: Props) {
  const t = useT();
  const uiLocale = useLocale();
  const contentLocale = initial.locale ?? "ar";
  const canEdit = uiLocale === contentLocale;

  const [proposal, setProposal] = useState(() => normalizeProposal(initial));
  const [boqLines, setBoqLines] = useState<ProposalBoqLineView[]>(
    initial.boqLines ?? []
  );
  const [reviewGates, setReviewGates] = useState<ReviewGates>(() =>
    resolveReviewGates({
      reviewGates: initial.reviewGates,
      reviewedSections: initial.reviewedSections,
    })
  );
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(!!initial.exportedAt);
  const [regenerating, setRegenerating] = useState(false);
  const [sectionRegenerating, setSectionRegenerating] = useState<string | null>(
    null
  );
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const hasDeliverables = (proposal.deliverables ?? []).length > 0;
  const gateProgress = useMemo(
    () => countRequiredGateProgress(reviewGates, hasDeliverables),
    [reviewGates, hasDeliverables]
  );
  const gatesComplete = canPublishFromGates(reviewGates, hasDeliverables);
  const confidence = proposal.confidence as unknown as Record<string, string> | null;
  const isEstimateOnly = proposal.commercialMode === "estimate_only";

  const handleConfirmGate = useCallback(
    async (gateKey: ReviewGateKey) => {
      const result = await confirmReviewGateAction(proposal.id, gateKey);
      if (!result.success) {
        alert(result.error ?? t.form.errors.generic);
        return;
      }
      const nextGates = resolveReviewGates({
        reviewGates: result.reviewGates,
        reviewedSections: proposal.reviewedSections,
      });
      setReviewGates(nextGates);
      if (canPublishFromGates(nextGates, hasDeliverables)) {
        setProposal((prev) => ({ ...prev, status: "reviewed" }));
      }
    },
    [proposal.id, proposal.reviewedSections, hasDeliverables, t.form.errors.generic]
  );

  const handleBoqLinesUpdated = useCallback(
    (lines: ProposalBoqLineView[], gates: ReviewGates | null) => {
      setBoqLines(lines);
      if (gates) setReviewGates(gates);
    },
    []
  );

  const handleEdit = useCallback(
    async (field: string, value: unknown) => {
      if (!canEdit) return;
      if (typeof value === "string") {
        const localeError = validateLocaleText(value, contentLocale);
        if (localeError) {
          alert(t.form.errors[localeError]);
          return;
        }
      }
      setProposal((prev) =>
        applyProposalFieldUpdate(
          prev as unknown as Record<string, unknown>,
          field,
          value
        ) as unknown as Proposal
      );
      await updateFieldAction(proposal.id, field, value);
    },
    [proposal.id, canEdit, contentLocale, t.form.errors]
  );

  const handleAddItem = async (section: string) => {
    if (!canEdit) return;
    const item: any = { id: crypto.randomUUID(), title: "", description: "" };
    const result = await addItemAction(proposal.id, section, item);
    if (!result.success) {
      alert(result.error ?? t.form.errors.generic);
      return;
    }
    setProposal((prev) => ({
      ...prev,
      [section as keyof typeof prev]: [
        ...(prev[section as keyof typeof prev] as any[]),
        { ...item, id: result.id },
      ],
    }));
  };

  const handleRemoveItem = async (section: string, itemId: string) => {
    await removeItemAction(proposal.id, section, itemId);
    setProposal((prev) => ({
      ...prev,
      [section as keyof typeof prev]: (
        prev[section as keyof typeof prev] as any[]
      ).filter((i: any) => i.id !== itemId),
    }));
  };

  const handleMarkReviewed = async (section: string) => {
    const result = await markReviewedAction(proposal.id, section);
    if (!result.success) {
      alert(result.error ?? t.form.errors.generic);
      return;
    }
    const gateMap: Record<string, ReviewGateKey> = {
      scopeItems: "scope",
      deliverables: "deliverables",
    };
    const gateKey = gateMap[section];
    if (gateKey) {
      await handleConfirmGate(gateKey);
    }
    setProposal((prev) => ({
      ...prev,
      reviewedSections: result.reviewedSections,
    }));
  };

  const handleExport = async () => {
    if (!gatesComplete) {
      alert(t.review.exportBlocked);
      return;
    }
    setExporting(true);
    try {
      const result = await exportPdfAction(proposal.id);
      if (!result.success) {
        alert(result.error ?? t.form.errors.generic);
        return;
      }
      setExported(true);
      if (result.shareUrl) setShareUrl(result.shareUrl);

      const pdfRes = await fetch(
        `/api/proposals/${proposal.id}/export/pdf`,
        { credentials: "include" }
      );
      if (!pdfRes.ok) {
        alert(t.form.errors.generic);
        return;
      }
      const blob = await pdfRes.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = result.filename ?? "Ruwaq_Quote.pdf";
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      alert(t.form.errors.generic);
    } finally {
      setExporting(false);
    }
  };

  const handlePreviewPdf = () => {
    if (!gatesComplete) {
      alert(t.review.exportBlocked);
      return;
    }
    setPreviewOpen(true);
  };

  const handleRegenerate = async () => {
    if (!canEdit || !confirm(t.review.regenerateConfirm)) return;
    setRegenerating(true);
    const result = await generateWithAI(proposal.id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error ?? t.review.regenerateFailed);
      setRegenerating(false);
    }
  };

  const handleSectionRegenerate = async (section: string) => {
    if (!canEdit || !confirm(t.review.regenerateConfirm)) return;
    setSectionRegenerating(section);
    const result = await regenerateSectionAction(proposal.id, section);
    if (result.success && result.proposal) {
      setProposal(normalizeProposal(result.proposal));
    } else if (!result.success) {
      alert(result.error ?? t.review.regenerateFailed);
    }
    setSectionRegenerating(null);
  };

  const handleCopyWhatsApp = async () => {
    const url =
      shareUrl ??
      `${window.location.origin}/api/proposals/${proposal.id}/export/pdf`;
    const text = buildWhatsAppMessage(contentLocale, {
      projectName: proposal.projectName,
      clientName: proposal.clientName,
      budget: proposal.budget,
      shareUrl: url,
    });
    await navigator.clipboard.writeText(text);
    setToast(t.review.whatsAppCopied);
    setTimeout(() => setToast(null), 3000);
  };

  const statusLabel = exported
    ? t.review.exported
    : gatesComplete
      ? t.review.allReviewed
      : t.review.gatesProgress(gateProgress.confirmed, gateProgress.total);

  return (
    <div className="ruwaq-review-shell">
      {toast && <div className="ruwaq-toast">{toast}</div>}
      {!canEdit && (
        <div className="ruwaq-notice-warn">{t.review.localeMismatch}</div>
      )}
      <ClaimProposal proposalId={proposal.id} isGuest={!!isGuest} />
      {profileThin && !isGuest && (
        <div className="ruwaq-notice-info">
          {t.review.profileIncomplete}{" "}
          <Link
            href="/settings/company"
            className="font-semibold underline"
          >
            {t.review.profileIncompleteLink}
          </Link>
        </div>
      )}
      {exported && isGuest && (
        <div className="ruwaq-notice-success">
          {t.review.postExportGuest}{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/proposals/${proposal.id}?claim=1`)}`}
            className="font-semibold underline"
          >
            {t.review.guestLink}
          </Link>
        </div>
      )}
      {exported && (
        <div className="ruwaq-upsell-card flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ruwaq-ink">
              {t.graphicsHouseUpsell.title}
            </p>
            <p className="mt-1 text-xs text-ruwaq-ink-muted">
              {t.graphicsHouseUpsell.body}
            </p>
          </div>
          <Link href="/services" className="btn-ruwaq-secondary shrink-0 px-4 py-2 text-sm">
            {t.graphicsHouseUpsell.cta}
          </Link>
        </div>
      )}

      {/* Top bar */}
      <div className="ruwaq-review-toolbar">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/proposals/new"
              className="text-sm text-ruwaq-ink-muted transition-colors hover:text-ruwaq-ink"
            >
              {t.review.backToNew}
            </Link>
            <span className="ruwaq-gate-progress-pending">
              {t.review.draftBadge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyWhatsApp}
              className="btn-ruwaq-soft"
            >
              {t.review.copyWhatsApp}
            </button>
            <button
              onClick={handleRegenerate}
              disabled={regenerating || !canEdit}
              className="btn-ruwaq-soft disabled:opacity-50"
            >
              {regenerating ? t.review.regenerating : t.review.regenerate}
            </button>
            <button
              onClick={handlePreviewPdf}
              disabled={!gatesComplete}
              className="btn-ruwaq-soft disabled:opacity-50"
            >
              {t.review.previewPdf}
            </button>
            <button
              onClick={handleExport}
              disabled={exporting || !gatesComplete}
              title={!gatesComplete ? t.review.exportBlocked : undefined}
              className="btn-ruwaq-primary px-4 py-2 disabled:opacity-50"
            >
              {exporting ? t.review.exporting : t.review.downloadPdf}
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-ruwaq-ink-muted">{statusLabel}</p>
        {!gatesComplete && (
          <p className="mt-1 text-xs text-amber-700">{t.review.reviewGatesHint}</p>
        )}
        <p className="mt-1 text-xs text-ruwaq-ink-muted">{t.review.printHint}</p>
      </div>

      <div className="ruwaq-review-trust-band text-sm text-ruwaq-ink">
        <p className="font-medium">{t.review.reviewGatesTitle}</p>
        <p className="mt-1 text-ruwaq-ink-soft">{t.review.trustBanner}</p>
        <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-ruwaq-ink-soft">
          <input
            type="checkbox"
            checked={reviewGates.projectUnderstanding?.confirmed ?? false}
            disabled={!canEdit || reviewGates.projectUnderstanding?.confirmed}
            onChange={() => {
              if (!reviewGates.projectUnderstanding?.confirmed) {
                void handleConfirmGate("projectUnderstanding");
              }
            }}
            className="mt-0.5 h-4 w-4 rounded border-ruwaq-stone text-ruwaq-champagne focus:ring-ruwaq-champagne/30"
          />
          <span>{t.review.confirmUnderstanding}</span>
        </label>
      </div>

      {/* Title */}
      <div className="ruwaq-review-title-card">
        <h1
          className="text-2xl font-bold text-ruwaq-ink outline-none"
          contentEditable={canEdit}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit("projectName", e.currentTarget.textContent)}
        >
          {proposal.projectName}
        </h1>
        <p className="mt-2 text-sm text-ruwaq-ink-muted">
          {t.review.preparedFor}{" "}
          <span
            className="font-medium text-ruwaq-ink-soft outline-none"
            contentEditable={canEdit}
            suppressContentEditableWarning
            onBlur={(e) => handleEdit("clientName", e.currentTarget.textContent)}
          >
            {proposal.clientName}
          </span>
        </p>
        {proposal.introduction && (
          <div className="mt-4 border-t border-ruwaq-stone/50 pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ruwaq-ink-muted">
              {t.review.introduction}
            </p>
            <p
              className="text-sm leading-relaxed text-ruwaq-ink-soft outline-none"
              contentEditable={canEdit}
              suppressContentEditableWarning
              onBlur={(e) =>
                handleEdit("introduction", e.currentTarget.textContent)
              }
            >
              {proposal.introduction}
            </p>
          </div>
        )}
        {companyName && (
          <p className="mt-1 text-sm text-ruwaq-ink-muted">
            {t.review.preparedBy}{" "}
            <span className="font-medium text-ruwaq-ink-soft">{companyName}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-ruwaq-ink-muted/80">
          {t.review.date} {formatDate(proposal.createdAt, contentLocale)}
        </p>
      </div>

      <div className="space-y-6">
        {/* Scope */}
        <SectionWrapper
          label={t.review.sections.scopeItems}
          confidence={confidence?.scopeItems}
          reviewed={reviewGates.scope?.confirmed ?? false}
          onMarkReviewed={() => handleMarkReviewed("scopeItems")}
          canEdit={canEdit}
          sectionId="scopeItems"
          onSectionRegenerate={handleSectionRegenerate}
          sectionRegenerating={sectionRegenerating === "scopeItems"}
        >
          {(proposal.scopeItems ?? []).map((item: any, i: number) => (
            <ScopeItemCard
              key={item.id}
              index={i}
              item={item}
              canEdit={canEdit}
              onUpdate={(field, value) =>
                handleEdit(`scopeItems[${i}].${field}`, value)
              }
              onRemove={() => handleRemoveItem("scopeItems", item.id)}
            />
          ))}
          {canEdit && (
          <button
            onClick={() => handleAddItem("scopeItems")}
            className="ruwaq-link-action mt-2"
          >
            {t.review.addItem}
          </button>
          )}
        </SectionWrapper>

        {/* Commercial */}
        <SectionWrapper
          label={t.review.sections.commercialTerms}
          confidence={confidence?.commercialTerms}
          reviewed={reviewGates.commercialTerms?.confirmed ?? false}
          onMarkReviewed={() => handleConfirmGate("commercialTerms")}
          hideReview
          canEdit={canEdit}
          sectionId="commercialTerms"
          onSectionRegenerate={handleSectionRegenerate}
          sectionRegenerating={sectionRegenerating === "commercialTerms"}
        >
          {proposal.commercialTerms && (
            <div className="space-y-4">
              {isEstimateOnly && (
                <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
                  {t.review.estimateOnlyBadge}
                </span>
              )}
              <div className="text-lg font-semibold tabular-nums">
                {t.review.total}{" "}
                <span
                  contentEditable={canEdit}
                  suppressContentEditableWarning
                  className="break-all outline-none"
                  onBlur={(e) => {
                    if (!canEdit) return;
                    const val = parseInt(
                      e.currentTarget.textContent?.replace(/[^\d]/g, "") ?? "0",
                      10
                    );
                    handleEdit("budget", val);
                  }}
                >
                  {formatSar(proposal.budget, contentLocale)} {t.review.currency}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[280px] text-sm">
                  <thead>
                    <tr className="border-b border-ruwaq-stone/40 text-ruwaq-ink-muted">
                      <th className="pb-2 text-start font-medium">
                        {t.review.milestone}
                      </th>
                      <th className="pb-2 text-center font-medium">
                        {t.review.percentage}
                      </th>
                      <th className="pb-2 text-end font-medium">
                        {t.review.amount}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(proposal.commercialTerms as any)?.paymentSchedule?.map(
                      (m: any, i: number) => (
                        <tr key={i} className="border-b border-ruwaq-stone/30">
                          <td className="py-2">
                            <span
                              contentEditable={canEdit}
                              suppressContentEditableWarning
                              className="inline-edit-input"
                              onBlur={(e) => {
                                if (!canEdit) return;
                                handleEdit(
                                  `commercialTerms.paymentSchedule[${i}].label`,
                                  e.currentTarget.textContent
                                );
                              }}
                            >
                              {m.label}
                            </span>
                          </td>
                          <td className="py-2 text-center tabular-nums">
                            <span
                              contentEditable={canEdit}
                              suppressContentEditableWarning
                              className="inline-block w-10 text-center outline-none focus:bg-ruwaq-linen"
                              onBlur={(e) => {
                                if (!canEdit) return;
                                handleEdit(
                                  `commercialTerms.paymentSchedule[${i}].percentage`,
                                  parseInt(e.currentTarget.textContent ?? "0", 10)
                                );
                              }}
                            >
                              {m.percentage}
                            </span>
                            %
                          </td>
                          <td className="py-2 text-end tabular-nums text-ruwaq-ink-soft">
                            {formatSar(m.amount, contentLocale)} {t.review.currency}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <SmartBoqPanel
                proposalId={proposal.id}
                budget={proposal.budget}
                commercialMode={proposal.commercialMode}
                variancePercent={proposal.estimateVariancePercent ?? 15}
                lines={boqLines}
                contentLocale={contentLocale}
                canEdit={canEdit}
                commercialGateConfirmed={reviewGates.commercialTerms?.confirmed ?? false}
                boqGateConfirmed={reviewGates.boqBreakdown?.confirmed ?? false}
                onLinesUpdated={handleBoqLinesUpdated}
                onConfirmGate={handleConfirmGate}
              />
            </div>
          )}
        </SectionWrapper>

        <ClausePackPanel
          contentLocale={contentLocale}
          canEdit={canEdit}
          packNameAr={proposal.clausePackNameAr}
          packNameEn={proposal.clausePackNameEn}
          packVersion={proposal.clausePackVersion}
          selections={proposal.clauseSelections ?? []}
          clauseGateConfirmed={reviewGates.clausePack?.confirmed ?? false}
          legalGateConfirmed={reviewGates.legalDisclaimer?.confirmed ?? false}
          onConfirmGate={handleConfirmGate}
        />

        {/* Timeline */}
        {proposal.timeline && (
          <SectionWrapper
            label={t.review.sections.timeline}
            confidence={confidence?.timeline}
            reviewed={false}
            onMarkReviewed={() => {}}
            hideReview
            canEdit={canEdit}
          >
            <p className="text-sm text-ruwaq-ink-soft">
              {t.review.duration}{" "}
              <span
                contentEditable={canEdit}
                suppressContentEditableWarning
                className="inline-edit-input font-medium"
                onBlur={(e) => {
                  if (!canEdit) return;
                  handleEdit("timeline.duration", e.currentTarget.textContent);
                }}
              >
                {proposal.timeline.duration}
              </span>
            </p>
            {(proposal.timeline.milestones ?? []).length > 0 && (
              <ul className="mt-3 space-y-2">
                {(proposal.timeline.milestones ?? []).map((m, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-ruwaq-ink-muted/70">•</span>
                    <span
                      contentEditable={canEdit}
                      suppressContentEditableWarning
                      className="inline-edit-input flex-1"
                      onBlur={(e) => {
                        if (!canEdit) return;
                        handleEdit(
                          `timeline.milestones[${i}].name`,
                          e.currentTarget.textContent
                        );
                      }}
                    >
                      {m.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </SectionWrapper>
        )}

        {/* Deliverables */}
        {(proposal.deliverables ?? []).length > 0 && (
          <SectionWrapper
            label={t.review.sections.deliverables}
            confidence={confidence?.deliverables}
            reviewed={reviewGates.deliverables?.confirmed ?? false}
            onMarkReviewed={() => handleConfirmGate("deliverables")}
            hideReview
            canEdit={canEdit}
          >
            <ul className="space-y-2.5">
              {(proposal.deliverables ?? []).map((item, i) => (
                <li
                  key={item.id}
                  className="group flex gap-3 rounded-xl border border-ruwaq-cream bg-ruwaq-cream-bg/40 px-4 py-3 transition-colors hover:bg-white"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ruwaq-gold" />
                  <div className="min-w-0 flex-1">
                    <input
                      defaultValue={item.name}
                      onBlur={(e) =>
                        handleEdit(`deliverables[${i}].name`, e.target.value)
                      }
                      readOnly={!canEdit}
                      className="inline-edit-input text-sm font-semibold text-ruwaq-navy"
                    />
                    <input
                      defaultValue={item.description}
                      onBlur={(e) =>
                        handleEdit(
                          `deliverables[${i}].description`,
                          e.target.value
                        )
                      }
                      readOnly={!canEdit}
                      className="inline-edit-input mt-1 text-xs text-ruwaq-navy-soft"
                    />
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => handleRemoveItem("deliverables", item.id)}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={t.review.removeItem}
                    >
                      <span className="text-xs text-ruwaq-navy-soft hover:text-red-500">
                        ✕
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className="ruwaq-gate-panel mt-5">
              <label
                className={`ruwaq-gate-checkbox ${
                  reviewGates.deliverables?.confirmed
                    ? "ruwaq-gate-checkbox--confirmed"
                    : ""
                } ${!canEdit && !reviewGates.deliverables?.confirmed ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={reviewGates.deliverables?.confirmed ?? false}
                  disabled={!canEdit || reviewGates.deliverables?.confirmed}
                  onChange={() => {
                    if (!reviewGates.deliverables?.confirmed) {
                      void handleConfirmGate("deliverables");
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-ruwaq-cream text-ruwaq-gold focus:ring-ruwaq-gold/30"
                />
                <span className="leading-relaxed">{t.review.confirmDeliverables}</span>
              </label>
            </div>
          </SectionWrapper>
        )}

        {/* Assumptions */}
        <SectionWrapper
          label={t.review.sections.assumptions}
          confidence={confidence?.assumptions}
          reviewed={reviewGates.clausePack?.confirmed ?? false}
          onMarkReviewed={() => handleConfirmGate("clausePack")}
          hideReview
          canEdit={canEdit}
          sectionId="assumptions"
          onSectionRegenerate={handleSectionRegenerate}
          sectionRegenerating={sectionRegenerating === "assumptions"}
        >
          <p className="mb-3 text-xs text-amber-700">{t.review.aiDraftHint}</p>
          {(proposal.assumptions ?? []).length > 0 ? (
            <ul className="space-y-2">
              {(proposal.assumptions ?? []).map((item: any, i: number) => (
                <EditableListItem
                  key={i}
                  canEdit={canEdit}
                  value={typeof item === "string" ? item : item.text}
                  onUpdate={(val) => {
                    const newArr = [...(proposal.assumptions ?? [])];
                    newArr[i] = val;
                    handleEdit("assumptions", newArr);
                  }}
                  onRemove={() => {
                    handleEdit(
                      "assumptions",
                      (proposal.assumptions ?? []).filter((_, idx) => idx !== i)
                    );
                  }}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ruwaq-ink-muted">{t.review.noAssumptions}</p>
          )}
          {canEdit && (
          <button
            onClick={() =>
              handleEdit("assumptions", [...(proposal.assumptions ?? []), ""])
            }
            className="ruwaq-link-action mt-2"
          >
            {t.review.addAssumption}
          </button>
          )}
        </SectionWrapper>

        {/* Exclusions */}
        <SectionWrapper
          label={t.review.sections.exclusions}
          confidence={confidence?.exclusions}
          reviewed={reviewGates.clausePack?.confirmed ?? false}
          onMarkReviewed={() => handleConfirmGate("clausePack")}
          hideReview
          canEdit={canEdit}
          sectionId="exclusions"
          onSectionRegenerate={handleSectionRegenerate}
          sectionRegenerating={sectionRegenerating === "exclusions"}
        >
          <p className="mb-3 text-xs text-amber-700">{t.review.aiDraftHint}</p>
          {(proposal.exclusions ?? []).length > 0 ? (
            <ul className="space-y-2">
              {(proposal.exclusions ?? []).map((item: any, i: number) => (
                <EditableListItem
                  key={i}
                  canEdit={canEdit}
                  value={typeof item === "string" ? item : item.text}
                  onUpdate={(val) => {
                    const newArr = [...(proposal.exclusions ?? [])];
                    newArr[i] = val;
                    handleEdit("exclusions", newArr);
                  }}
                  onRemove={() => {
                    handleEdit(
                      "exclusions",
                      (proposal.exclusions ?? []).filter((_, idx) => idx !== i)
                    );
                  }}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ruwaq-ink-muted">{t.review.noExclusions}</p>
          )}
          {canEdit && (
          <button
            onClick={() =>
              handleEdit("exclusions", [...(proposal.exclusions ?? []), ""])
            }
            className="ruwaq-link-action mt-2"
          >
            {t.review.addExclusion}
          </button>
          )}
        </SectionWrapper>
      </div>

      {/* Bottom bar */}
      <div className="ruwaq-review-bottom-bar">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ruwaq-ink-muted">
            {t.review.gatesProgress(gateProgress.confirmed, gateProgress.total)}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePreviewPdf}
              disabled={!gatesComplete}
              className="btn-ruwaq-secondary px-4 py-2.5 disabled:opacity-50"
            >
              {t.review.previewPdf}
            </button>
            <button
              onClick={handleExport}
              disabled={exporting || !gatesComplete}
              className="btn-ruwaq-primary px-6 py-2.5 disabled:opacity-50"
            >
              {exporting ? t.review.exporting : t.review.downloadPdf}
            </button>
          </div>
        </div>
      </div>

      <ProposalPdfPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        pdfUrl={`/api/proposals/${proposal.id}/export/pdf?inline=1`}
        title={t.review.previewPdf}
        closeLabel={t.review.closePreview}
      />
    </div>
  );
}

function SectionWrapper({
  label,
  confidence,
  reviewed,
  onMarkReviewed,
  hideReview,
  canEdit = true,
  sectionId,
  onSectionRegenerate,
  sectionRegenerating,
  children,
}: {
  label: string;
  confidence?: string;
  reviewed: boolean;
  onMarkReviewed: () => void;
  hideReview?: boolean;
  canEdit?: boolean;
  sectionId?: string;
  onSectionRegenerate?: (section: string) => void;
  sectionRegenerating?: boolean;
  children: React.ReactNode;
}) {
  const t = useT();

  return (
    <section
      className={`section-card ${reviewed ? "section-card-reviewed" : ""}`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-bold text-ruwaq-ink">{label}</h2>
          {(confidence === "always_warn" || confidence === "medium") &&
            !reviewed && (
              <span className="rounded-full bg-ruwaq-linen px-2 py-0.5 text-xs text-ruwaq-ink-muted">
                {t.review.badges.review}
              </span>
            )}
          {confidence === "low" && (
            <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs text-yellow-800">
              {t.review.badges.aiEstimated}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {sectionId && onSectionRegenerate && canEdit && (
            <button
              type="button"
              onClick={() => onSectionRegenerate(sectionId)}
              disabled={sectionRegenerating}
              className="btn-ruwaq-soft px-2 py-1 text-xs disabled:opacity-50"
            >
              {sectionRegenerating
                ? t.review.sectionRegenerating
                : t.review.regenerateSection}
            </button>
          )}
          {!hideReview &&
            canEdit &&
            (reviewed ? (
              <span className="text-xs font-medium text-green-700">
                {t.review.reviewed}
              </span>
            ) : (
              <button
                onClick={onMarkReviewed}
                className="btn-ruwaq-soft px-3 py-1 text-xs"
              >
                {t.review.markReviewed}
              </button>
            ))}
        </div>
      </div>
      {children}
    </section>
  );
}

function ScopeItemCard({
  index,
  item,
  onUpdate,
  onRemove,
  canEdit = true,
}: {
  index: number;
  item: any;
  onUpdate: (field: string, value: unknown) => void;
  onRemove: () => void;
  canEdit?: boolean;
}) {
  const t = useT();
  return (
    <div className="group ruwaq-scope-item">
      <div className="flex items-start gap-2">
        <span className="ruwaq-scope-index">{index + 1}</span>
        <div className="flex-1">
          <input
            defaultValue={item.title}
            onBlur={(e) => onUpdate("title", e.target.value)}
            readOnly={!canEdit}
            className="inline-edit-input mb-1 text-sm font-semibold"
            placeholder={t.review.placeholders.itemTitle}
          />
          <textarea
            defaultValue={item.description}
            onBlur={(e) => onUpdate("description", e.target.value)}
            readOnly={!canEdit}
            className="inline-edit-area text-xs text-ruwaq-ink-muted"
            placeholder={t.review.placeholders.itemDescription}
            rows={2}
          />
        </div>
        {canEdit && (
        <button
          onClick={onRemove}
          className="opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={t.review.removeItem}
        >
          <span className="text-xs text-ruwaq-ink-muted hover:text-red-500">✕</span>
        </button>
        )}
      </div>
    </div>
  );
}

function EditableListItem({
  value,
  onUpdate,
  onRemove,
  canEdit = true,
}: {
  value: string;
  onUpdate: (val: string) => void;
  onRemove: () => void;
  canEdit?: boolean;
}) {
  const t = useT();
  return (
    <li className="group flex items-start gap-2">
      <span className="mt-2 text-ruwaq-ink-muted/70">•</span>
      <input
        defaultValue={value}
        onBlur={(e) => onUpdate(e.target.value)}
        readOnly={!canEdit}
        className="inline-edit-input flex-1 text-sm"
      />
      {canEdit && (
      <button
        onClick={onRemove}
        className="opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={t.review.removeItem}
      >
        <span className="text-xs text-ruwaq-ink-muted hover:text-red-500">✕</span>
      </button>
      )}
    </li>
  );
}
