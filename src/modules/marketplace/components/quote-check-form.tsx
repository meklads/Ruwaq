"use client";

import { useState } from "react";
import {
  QUOTE_CHECK_CITY_KEYS,
  QUOTE_CHECK_LEVEL_KEYS,
  QUOTE_CHECK_PACKAGE_KEYS,
  QUOTE_CHECK_PROJECT_KEYS,
  QUOTE_CHECK_SIGNED_KEYS,
  type QuoteCheckCityKey,
  type QuoteCheckLevelKey,
  type QuoteCheckPackageKey,
  type QuoteCheckProjectKey,
  type QuoteCheckSignedKey,
} from "@/modules/marketplace/lib/quote-check";
import { getQuoteCheckCopy } from "@/modules/marketplace/lib/quote-check-copy";
import { submitQuoteCheck } from "@/modules/marketplace/server/quote-check.actions";
import { trackEvent } from "@/shared/lib/analytics";

type Props = { locale: "ar" | "en" };

export function QuoteCheckForm({ locale }: Props) {
  const copy = getQuoteCheckCopy(locale);
  const f = copy.form;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [city, setCity] = useState<QuoteCheckCityKey>("jeddah");
  const [projectType, setProjectType] = useState<QuoteCheckProjectKey>("villa_fitout");
  const [areaSqm, setAreaSqm] = useState("");
  const [level, setLevel] = useState<QuoteCheckLevelKey>("standard");
  const [quotesCount, setQuotesCount] = useState(1);
  const [signed, setSigned] = useState<QuoteCheckSignedKey>("no");
  const [packageKey, setPackageKey] = useState<QuoteCheckPackageKey>("free");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ referenceCode: string; whatsAppUrl: string | null } | null>(
    null
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const area = areaSqm.trim() ? Number(areaSqm.replace(/[^\d]/g, "")) : undefined;
    const result = await submitQuoteCheck({
      clientName,
      clientPhone,
      city,
      projectType,
      areaSqm: area && area > 0 ? area : undefined,
      level,
      quotesCount,
      signed,
      packageKey,
      notes: notes.trim() || undefined,
      locale,
    });
    setPending(false);
    if (!result.success) {
      setError(f.errors[result.error]);
      return;
    }
    trackEvent("quote_check_submit", { package: packageKey, projectType, city, locale });
    setSuccess({ referenceCode: result.referenceCode, whatsAppUrl: result.whatsAppUrl });
  }

  if (success) {
    return (
      <div className="ruwaq-qc-success" role="status">
        <h2 className="text-xl font-semibold text-neutral-950">{copy.success.title}</h2>
        <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500">{copy.success.refLabel}</p>
        <p className="mt-1 font-mono text-2xl font-bold text-neutral-950" dir="ltr">
          {success.referenceCode}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-neutral-700">{copy.success.body}</p>
        {success.whatsAppUrl ? (
          <a
            href={success.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("quote_check_whatsapp_click", { locale })}
            className="ruwaq-pro-btn-solid mt-6 inline-flex w-full justify-center px-8 py-3.5"
          >
            {copy.success.whatsAppCta}
          </a>
        ) : (
          <p className="mt-6 text-sm text-neutral-700">{copy.success.noWhatsApp}</p>
        )}
        <p className="mt-4 text-xs text-neutral-500">{copy.success.sla}</p>
      </div>
    );
  }

  const label = "ruwaq-ad-field-label";
  const field = "ruwaq-ad-field";

  return (
    <form onSubmit={onSubmit} className="ruwaq-join-editorial-fields" id="check-form">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">{f.title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{f.lead}</p>
      </div>

      {error ? <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

      <div>
        <label className={label} htmlFor="qc-name">{f.fields.name}</label>
        <input
          id="qc-name"
          className={field}
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          minLength={2}
          autoComplete="name"
          dir={dir}
        />
      </div>

      <div>
        <label className={label} htmlFor="qc-phone">{f.fields.phone}</label>
        <input
          id="qc-phone"
          className={field}
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder={f.fields.phonePlaceholder}
          dir="ltr"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="qc-city">{f.fields.city}</label>
          <select id="qc-city" className={field} value={city} onChange={(e) => setCity(e.target.value as QuoteCheckCityKey)}>
            {QUOTE_CHECK_CITY_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.city[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="qc-type">{f.fields.projectType}</label>
          <select
            id="qc-type"
            className={field}
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as QuoteCheckProjectKey)}
          >
            {QUOTE_CHECK_PROJECT_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.projectType[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="qc-area">{f.fields.area}</label>
          <input
            id="qc-area"
            className={field}
            value={areaSqm}
            onChange={(e) => setAreaSqm(e.target.value)}
            inputMode="numeric"
            placeholder="300"
            dir="ltr"
          />
        </div>
        <div>
          <label className={label} htmlFor="qc-level">{f.fields.level}</label>
          <select id="qc-level" className={field} value={level} onChange={(e) => setLevel(e.target.value as QuoteCheckLevelKey)}>
            {QUOTE_CHECK_LEVEL_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.level[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="qc-count">{f.fields.quotesCount}</label>
          <select
            id="qc-count"
            className={field}
            value={quotesCount}
            onChange={(e) => setQuotesCount(Number(e.target.value))}
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>{f.options.quotes[n]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="qc-signed">{f.fields.signed}</label>
          <select
            id="qc-signed"
            className={field}
            value={signed}
            onChange={(e) => setSigned(e.target.value as QuoteCheckSignedKey)}
          >
            {QUOTE_CHECK_SIGNED_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.signed[k]}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={label}>{f.fields.package}</legend>
        <div className="ruwaq-qc-packages">
          {QUOTE_CHECK_PACKAGE_KEYS.map((k) => (
            <label key={k} className={`ruwaq-qc-package ${packageKey === k ? "ruwaq-qc-package--active" : ""}`}>
              <input
                type="radio"
                name="qc-package"
                value={k}
                checked={packageKey === k}
                onChange={() => setPackageKey(k)}
                className="sr-only"
              />
              {f.options.package[k]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={label} htmlFor="qc-notes">{f.fields.notes}</label>
        <textarea
          id="qc-notes"
          className={field}
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={f.fields.notesPlaceholder}
          maxLength={2000}
          dir={dir}
        />
      </div>

      <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full px-8 py-3.5 disabled:opacity-50">
        {pending ? f.submitting : f.submit}
      </button>
      <p className="ruwaq-quote-privacy">{f.privacy}</p>
    </form>
  );
}
