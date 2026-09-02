"use client";

import { useCallback, useEffect, useState } from "react";
import { ProposalShareView } from "@/modules/proposal/components/proposal-share-view";
import type { ShareProposalView } from "@/modules/proposal/server/share.service";
import type { Messages } from "@/shared/i18n/messages/types";
import type { LiveRoomSectionKey } from "@/shared/types/trust-layer.types";

type LiveRoomLabels = Messages["share"]["liveRoom"];

type Props = {
  data: ShareProposalView;
  labels: Messages["share"];
  reviewLabels: Messages["review"];
  exportLabels: Messages["export"];
  liveRoomLabels: LiveRoomLabels;
  dir: "rtl" | "ltr";
  initialApproved: boolean;
};

type Panel = "actions" | "approve" | "amend";

const AMEND_SECTIONS: LiveRoomSectionKey[] = [
  "scope",
  "commercial",
  "boq",
  "timeline",
  "clauses",
];

export function ProposalShareLiveRoom({
  data,
  labels,
  reviewLabels,
  exportLabels,
  liveRoomLabels,
  dir,
  initialApproved,
}: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [approved, setApproved] = useState(initialApproved);
  const [panel, setPanel] = useState<Panel>("actions");
  const [clientName, setClientName] = useState(data.clientName);
  const [amendNote, setAmendNote] = useState("");
  const [amendSection, setAmendSection] = useState<LiveRoomSectionKey>("scope");
  const [approvedScope, setApprovedScope] = useState(false);
  const [approvedCommercial, setApprovedCommercial] = useState(false);
  const [approvedTimeline, setApprovedTimeline] = useState(false);
  const [ackEstimate, setAckEstimate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`/api/share/${data.token}/session`, { method: "POST" });
        if (!res.ok) return;
        const json = (await res.json()) as {
          sessionId: string;
          alreadyApproved: boolean;
        };
        if (cancelled) return;
        setSessionId(json.sessionId);
        if (json.alreadyApproved) setApproved(true);
      } catch {
        // read-only view still works without session
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [data.token]);

  const postAction = useCallback(
    async (body: Record<string, unknown>) => {
      const res = await fetch(`/api/share/${data.token}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "REQUEST_FAILED");
      }
    },
    [data.token]
  );

  const onPdfDownload = useCallback(() => {
    if (!sessionId) return;
    void postAction({ type: "download_pdf", sessionId }).catch(() => undefined);
  }, [postAction, sessionId]);

  const submitApprove = async () => {
    if (!sessionId || !clientName.trim()) {
      setError(liveRoomLabels.nameRequired);
      return;
    }
    if (!approvedScope || !approvedCommercial) {
      setError(liveRoomLabels.checkboxesRequired);
      return;
    }
    if (data.commercialMode === "estimate_only" && !ackEstimate) {
      setError(liveRoomLabels.estimateAckRequired);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await postAction({
        type: "soft_approve",
        sessionId,
        payload: {
          clientName: clientName.trim(),
          approvedScope: true,
          approvedCommercial: true,
          approvedTimeline,
          commercialMode: data.commercialMode,
          acknowledgedEstimateDisclaimer:
            data.commercialMode === "estimate_only" ? true : undefined,
          estimateVariancePercent:
            data.commercialMode === "estimate_only"
              ? data.estimateVariancePercent
              : undefined,
          submittedAt: new Date().toISOString(),
        },
      });
      setApproved(true);
      setPanel("actions");
      setMessage(liveRoomLabels.approveSuccess);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setError(
        code === "ALREADY_APPROVED"
          ? liveRoomLabels.alreadyApproved
          : liveRoomLabels.approveError
      );
    } finally {
      setSubmitting(false);
    }
  };

  const submitAmend = async () => {
    if (!sessionId || !clientName.trim() || !amendNote.trim()) {
      setError(liveRoomLabels.amendFieldsRequired);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await postAction({
        type: "request_amendment",
        sessionId,
        clientName: clientName.trim(),
        sectionKey: amendSection,
        note: amendNote.trim(),
      });
      setAmendNote("");
      setPanel("actions");
      setMessage(liveRoomLabels.amendSuccess);
    } catch {
      setError(liveRoomLabels.amendError);
    } finally {
      setSubmitting(false);
    }
  };

  const sectionLabel = (key: LiveRoomSectionKey) =>
    liveRoomLabels.sections[key] ?? key;

  return (
    <div className="ruwaq-share-live-root" dir={dir}>
      <ProposalShareView
        data={data}
        labels={labels}
        reviewLabels={reviewLabels}
        exportLabels={exportLabels}
        dir={dir}
        onPdfDownload={onPdfDownload}
      />

      <div className="ruwaq-share-live-footer">
        <div className="ruwaq-share-live-footer-inner">
          {message ? (
            <p className="ruwaq-share-live-message ruwaq-share-live-message--success">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="ruwaq-share-live-message ruwaq-share-live-message--error">
              {error}
            </p>
          ) : null}

          {approved ? (
            <p className="ruwaq-share-live-approved">{liveRoomLabels.approvedBanner}</p>
          ) : panel === "actions" ? (
            <div className="ruwaq-share-live-actions">
              <button
                type="button"
                className="btn-ruwaq-primary"
                onClick={() => {
                  setError(null);
                  setPanel("approve");
                }}
              >
                {liveRoomLabels.approveCta}
              </button>
              <button
                type="button"
                className="btn-ruwaq-secondary"
                onClick={() => {
                  setError(null);
                  setPanel("amend");
                }}
              >
                {liveRoomLabels.amendCta}
              </button>
            </div>
          ) : panel === "approve" ? (
            <div className="ruwaq-share-live-panel">
              <h2 className="ruwaq-share-live-panel-title">{liveRoomLabels.approveTitle}</h2>
              <label className="ruwaq-share-live-field">
                <span>{liveRoomLabels.nameLabel}</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="ruwaq-field"
                />
              </label>
              <div className="ruwaq-share-live-checks">
                <label>
                  <input
                    type="checkbox"
                    checked={approvedScope}
                    onChange={(e) => setApprovedScope(e.target.checked)}
                  />
                  <span>{liveRoomLabels.approveScope}</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={approvedCommercial}
                    onChange={(e) => setApprovedCommercial(e.target.checked)}
                  />
                  <span>{liveRoomLabels.approveCommercial}</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={approvedTimeline}
                    onChange={(e) => setApprovedTimeline(e.target.checked)}
                  />
                  <span>{liveRoomLabels.approveTimeline}</span>
                </label>
                {data.commercialMode === "estimate_only" ? (
                  <label>
                    <input
                      type="checkbox"
                      checked={ackEstimate}
                      onChange={(e) => setAckEstimate(e.target.checked)}
                    />
                    <span>
                      {liveRoomLabels.estimateAck(data.estimateVariancePercent)}
                    </span>
                  </label>
                ) : null}
              </div>
              <div className="ruwaq-share-live-actions">
                <button
                  type="button"
                  className="btn-ruwaq-primary"
                  disabled={submitting}
                  onClick={() => void submitApprove()}
                >
                  {liveRoomLabels.submitApprove}
                </button>
                <button
                  type="button"
                  className="btn-ruwaq-secondary"
                  onClick={() => setPanel("actions")}
                >
                  {liveRoomLabels.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div className="ruwaq-share-live-panel">
              <h2 className="ruwaq-share-live-panel-title">{liveRoomLabels.amendTitle}</h2>
              <label className="ruwaq-share-live-field">
                <span>{liveRoomLabels.nameLabel}</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="ruwaq-field"
                />
              </label>
              <label className="ruwaq-share-live-field">
                <span>{liveRoomLabels.amendSectionLabel}</span>
                <select
                  value={amendSection}
                  onChange={(e) =>
                    setAmendSection(e.target.value as LiveRoomSectionKey)
                  }
                  className="ruwaq-field"
                >
                  {AMEND_SECTIONS.map((key) => (
                    <option key={key} value={key}>
                      {sectionLabel(key)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="ruwaq-share-live-field">
                <span>{liveRoomLabels.amendNoteLabel}</span>
                <textarea
                  value={amendNote}
                  onChange={(e) => setAmendNote(e.target.value)}
                  rows={4}
                  className="ruwaq-field"
                />
              </label>
              <div className="ruwaq-share-live-actions">
                <button
                  type="button"
                  className="btn-ruwaq-primary"
                  disabled={submitting}
                  onClick={() => void submitAmend()}
                >
                  {liveRoomLabels.submitAmend}
                </button>
                <button
                  type="button"
                  className="btn-ruwaq-secondary"
                  onClick={() => setPanel("actions")}
                >
                  {liveRoomLabels.cancel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
