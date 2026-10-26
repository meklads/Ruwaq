"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/shared/lib/analytics";
import { getTrustCopy } from "@/modules/ruwaq/trust-copy";
import { submitChecklistLead } from "@/modules/ruwaq/checklist.actions";
import { PrintButton } from "@/modules/ruwaq/print-button";

const STORAGE_KEY = "ruwaq-checklist-unlocked";

export function ChecklistUnlock({ locale }: { locale: "ar" | "en" }) {
  const c = getTrustCopy(locale).checklist;
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage unavailable — stays locked until submitted */
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await submitChecklistLead({ clientName: name, clientPhone: phone, locale });
    setPending(false);
    if (!res.success) {
      setError(c.errors[res.error]);
      return;
    }
    trackEvent("checklist_submit", { locale });
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
  }


  return (
    <div className="rw-cl">

      <div className="rw-form-card rw-no-print rw-cl__aside">
        {unlocked ? (
          <div className="rw-form">
            <h2 className="rw-h2" style={{ fontSize: "1.5rem" }}>
              {c.unlocked}
            </h2>
            <PrintButton label={c.print} />
            <div className="rw-note-box" style={{ marginBlockStart: "0.5rem" }}>
              <h3 className="rw-h3">{c.ctaTitle}</h3>
              <div style={{ marginBlockStart: "0.85rem" }}>
                <a href="/check" className="rw-btn rw-btn--primary rw-btn--sm">
                  {c.cta}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <form className="rw-form" onSubmit={onSubmit}>
            <div>
              <h2 className="rw-h2" style={{ fontSize: "1.5rem" }}>
                {c.unlockTitle}
              </h2>
              <p className="rw-body" style={{ marginBlockStart: "0.5rem", fontSize: 15 }}>
                {c.unlockLead}
              </p>
            </div>
            {error ? (
              <div className="rw-error" role="alert">
                {error}
              </div>
            ) : null}
            <div>
              <label className="rw-label" htmlFor="cl-name">
                {c.name}
              </label>
              <input id="cl-name" className="rw-field" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" />
            </div>
            <div>
              <label className="rw-label" htmlFor="cl-phone">
                {c.phone}
              </label>
              <input
                id="cl-phone"
                className="rw-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="05xxxxxxxx"
                dir="ltr"
              />
            </div>
            <button type="submit" disabled={pending} className="rw-btn rw-btn--primary rw-btn--block disabled:opacity-50">
              {pending ? c.unlocking : c.unlock}
            </button>
            <p className="rw-fineprint">{c.privacy}</p>
          </form>
        )}
      </div>
      <ol className={`rw-check-list rw-cl__list ${unlocked ? "" : "rw-locked"}`}>
        {c.items.map((item) => (
          <li key={item.q}>
            <div>
              <h2 className="rw-h3">{item.q}</h2>
              <dl aria-hidden={unlocked ? undefined : true}>
                <div>
                  <dt>{c.whyLabel}</dt>
                  <dd>{item.why}</dd>
                </div>
                <div>
                  <dt>{c.goodLabel}</dt>
                  <dd>{item.good}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
