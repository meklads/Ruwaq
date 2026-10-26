"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/shared/lib/analytics";
import { ESTIMATE_LEVELS, getTrustCopy, type EstimateLevel } from "@/modules/ruwaq/trust-copy";

const LEVEL_KEYS = Object.keys(ESTIMATE_LEVELS) as EstimateLevel[];

function toNumber(raw: string): number {
  // Accept Arabic-Indic digits and thousands separators.
  const latin = raw.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[^\d.]/g, "");
  return latin ? Number(latin) : NaN;
}

export function CostEstimator({ locale }: { locale: "ar" | "en" }) {
  const c = getTrustCopy(locale).estimate;
  const fmt = (n: number) => Math.round(n).toLocaleString(locale === "ar" ? "ar-SA" : "en-US");
  const roundK = (n: number) => Math.round(n / 1000) * 1000;

  const [area, setArea] = useState("");
  const [level, setLevel] = useState<EstimateLevel>("standard");
  const [quote, setQuote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const tracked = useRef("");
  const resultRef = useRef<HTMLDivElement>(null);

  type Ok = {
    ok: true;
    area: number;
    low: number;
    high: number;
    perLow: number;
    perHigh: number;
    quotePerSqm: number | null;
    verdict: "below" | "within" | "above" | null;
  };
  type Err = { ok: false; error: string | null };

  const result = useMemo<Ok | Err>(() => {
    const a = toNumber(area);
    if (!Number.isFinite(a) || a < 20 || a > 50000) return { ok: false, error: area.trim() ? c.invalid : null };
    const r = ESTIMATE_LEVELS[level];
    const q = toNumber(quote);
    const quotePerSqm = Number.isFinite(q) && q > 0 ? q / a : null;
    const verdict: Ok["verdict"] = quotePerSqm === null ? null : quotePerSqm < r.low ? "below" : quotePerSqm > r.high ? "above" : "within";
    return { ok: true, area: a, low: r.low * a, high: r.high * a, perLow: r.low, perHigh: r.high, quotePerSqm, verdict };
  }, [area, level, quote, c.invalid]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (window.innerWidth < 1024) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
    }
    if (result.ok) {
      const key = `${result.area}|${level}|${result.verdict ?? "none"}`;
      if (tracked.current !== key) {
        tracked.current = key;
        trackEvent("estimate_calculated", { level, area: result.area, verdict: result.verdict ?? "none", locale });
      }
    }
  }

  // Scale for the visual (SAR per m²), wide enough to place most quotes.
  const scaleMin = 500;
  const scaleMax = 4000;
  const pos = (v: number) => `${Math.min(100, Math.max(0, ((v - scaleMin) / (scaleMax - scaleMin)) * 100))}%`;
  const side = locale === "ar" ? "right" : "left";

  const show = submitted && result.ok;

  return (
    <div className="rw-est">
      <form className="rw-form-card rw-form" onSubmit={onSubmit} noValidate>
        <div>
          <label className="rw-label" htmlFor="est-area">
            {c.area}
          </label>
          <input
            id="est-area"
            className="rw-field"
            inputMode="numeric"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="320"
            dir="ltr"
            aria-describedby="est-area-hint"
          />
          <p className="rw-hint" id="est-area-hint">
            {c.areaHint}
          </p>
        </div>

        <fieldset>
          <legend className="rw-label">{c.level}</legend>
          <div className="rw-levels">
            {LEVEL_KEYS.map((k) => (
              <label key={k} data-active={level === k ? "true" : "false"}>
                <input type="radio" name="est-level" value={k} checked={level === k} onChange={() => setLevel(k)} className="sr-only" />
                <strong>{c.levels[k].name}</strong>
                <span>
                  {c.levels[k].body}. {fmt(ESTIMATE_LEVELS[k].low)} {c.to} {fmt(ESTIMATE_LEVELS[k].high)} {c.perSqm}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="rw-label" htmlFor="est-quote">
            {c.quote}
          </label>
          <input
            id="est-quote"
            className="rw-field"
            inputMode="numeric"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="412000"
            dir="ltr"
            aria-describedby="est-quote-hint"
          />
          <p className="rw-hint" id="est-quote-hint">
            {c.quoteHint}
          </p>
        </div>

        {submitted && !result.ok && result.error ? (
          <div className="rw-error" role="alert">
            {result.error}
          </div>
        ) : null}

        <button type="submit" className="rw-btn rw-btn--primary rw-btn--block">
          {c.calculate}
        </button>
      </form>

      <div aria-live="polite" ref={resultRef} style={{ scrollMarginTop: "7.5rem" }}>
        {show && result.ok ? (
          <div className="rw-result">
            <p className="rw-result__label">{c.resultTitle}</p>
            <p className="rw-result__range">
              {fmt(roundK(result.low))} {c.to} {fmt(roundK(result.high))} {c.currency}
            </p>
            <p className="rw-result__per">
              {fmt(result.perLow)} {c.to} {fmt(result.perHigh)} {c.perSqm}{locale === "ar" ? "، " : ", "}{fmt(result.area)} {locale === "ar" ? "م²" : "m²"}
            </p>

            <div className="rw-scale" aria-hidden="true">
              <div className="rw-scale__track" />
              <div
                className="rw-scale__band"
                style={{ [side]: pos(result.perLow), width: `calc(${pos(result.perHigh)} - ${pos(result.perLow)})` }}
              />
              {result.quotePerSqm !== null ? <div className="rw-scale__pin" style={{ [side]: pos(result.quotePerSqm) }} /> : null}
            </div>
            <div className="rw-scale__ends" aria-hidden="true">
              <span>{fmt(scaleMin)}</span>
              <span>{fmt(scaleMax)}</span>
            </div>

            {result.verdict && result.quotePerSqm !== null ? (
              <div className="rw-result__verdict">
                <p style={{ marginBlockStart: 0, color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                  {c.yourQuote} {fmt(result.quotePerSqm)} {c.perSqm}
                </p>
                <strong style={{ marginBlockStart: "0.5rem" }}>{c.verdicts[result.verdict].title}</strong>
                <p>{c.verdicts[result.verdict].body}</p>
              </div>
            ) : null}

            <div className="rw-actions">
              {result.verdict ? (
                <Link
                  href="/check"
                  className="rw-btn rw-btn--gold"
                  onClick={() => trackEvent("estimate_to_check", { verdict: result.verdict ?? "none", locale })}
                >
                  {c.cta}
                </Link>
              ) : (
                <>
                  <Link href="/check" className="rw-btn rw-btn--gold" onClick={() => trackEvent("estimate_to_check", { verdict: "none", locale })}>
                    {c.cta}
                  </Link>
                  <Link href="/project-file" className="rw-btn rw-btn--outline-light" style={{ whiteSpace: "normal", textAlign: "center" }}>
                    {c.ctaNoQuote}
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="rw-result rw-result--empty">
            <p>{c.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
