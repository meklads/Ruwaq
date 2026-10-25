"use client";

import { useState } from "react";
import {
  SERVICE_CITY_KEYS,
  SERVICE_PROJECT_KEYS,
  SERVICE_STAGE_KEYS,
  type ServiceCityKey,
  type ServiceKey,
  type ServiceProjectKey,
  type ServiceStageKey,
} from "@/modules/ruwaq/service-request";
import { getSiteCopy } from "@/modules/ruwaq/site-copy";
import { submitServiceRequest } from "@/modules/ruwaq/service-request.actions";
import { trackEvent } from "@/shared/lib/analytics";

type Props = {
  locale: "ar" | "en";
  service: ServiceKey;
  title: string;
  defaultStage?: ServiceStageKey;
};

export function ServiceRequestForm({ locale, service, title, defaultStage = "planning" }: Props) {
  const f = getSiteCopy(locale).serviceForm;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [city, setCity] = useState<ServiceCityKey>("jeddah");
  const [projectType, setProjectType] = useState<ServiceProjectKey>("villa_fitout");
  const [stage, setStage] = useState<ServiceStageKey>(defaultStage);
  const [areaSqm, setAreaSqm] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ referenceCode: string; whatsAppUrl: string | null } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const area = areaSqm.trim() ? Number(areaSqm.replace(/[^\d]/g, "")) : undefined;
    const result = await submitServiceRequest({
      service,
      clientName,
      clientPhone,
      city,
      projectType,
      stage,
      areaSqm: area && area > 0 ? area : undefined,
      budget: budget.trim() || undefined,
      notes: notes.trim() || undefined,
      locale,
    });
    setPending(false);
    if (!result.success) {
      setError(f.errors[result.error]);
      return;
    }
    trackEvent("service_request_submit", { service, stage, city, locale });
    setSuccess({ referenceCode: result.referenceCode, whatsAppUrl: result.whatsAppUrl });
  }

  if (success) {
    return (
      <div className="ruwaq-qc-success" role="status">
        <h2 className="text-xl font-semibold text-neutral-950">{f.successTitle}</h2>
        <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500">{f.refLabel}</p>
        <p className="mt-1 font-mono text-2xl font-bold text-neutral-950" dir="ltr">
          {success.referenceCode}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-neutral-700">{f.successBody}</p>
        {success.whatsAppUrl ? (
          <a
            href={success.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ruwaq-pro-btn-solid mt-6 inline-flex w-full justify-center px-8 py-3.5"
          >
            {f.whatsAppCta}
          </a>
        ) : null}
      </div>
    );
  }

  const label = "ruwaq-ad-field-label";
  const field = "ruwaq-ad-field";

  return (
    <form onSubmit={onSubmit} className="ruwaq-join-editorial-fields" id="request-form">
      <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
      {error ? <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

      <div>
        <label className={label} htmlFor="sr-name">{f.name}</label>
        <input id="sr-name" className={field} value={clientName} onChange={(e) => setClientName(e.target.value)} required minLength={2} autoComplete="name" dir={dir} />
      </div>
      <div>
        <label className={label} htmlFor="sr-phone">{f.phone}</label>
        <input id="sr-phone" className={field} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required inputMode="tel" autoComplete="tel" placeholder="05xxxxxxxx" dir="ltr" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="sr-city">{f.city}</label>
          <select id="sr-city" className={field} value={city} onChange={(e) => setCity(e.target.value as ServiceCityKey)}>
            {SERVICE_CITY_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.city[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="sr-type">{f.projectType}</label>
          <select id="sr-type" className={field} value={projectType} onChange={(e) => setProjectType(e.target.value as ServiceProjectKey)}>
            {SERVICE_PROJECT_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.projectType[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="sr-stage">{f.stage}</label>
          <select id="sr-stage" className={field} value={stage} onChange={(e) => setStage(e.target.value as ServiceStageKey)}>
            {SERVICE_STAGE_KEYS.map((k) => (
              <option key={k} value={k}>{f.options.stage[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="sr-area">{f.area}</label>
          <input id="sr-area" className={field} value={areaSqm} onChange={(e) => setAreaSqm(e.target.value)} inputMode="numeric" placeholder="300" dir="ltr" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="sr-budget">{f.budget}</label>
        <input id="sr-budget" className={field} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder={f.budgetPlaceholder} maxLength={80} dir={dir} />
      </div>
      <div>
        <label className={label} htmlFor="sr-notes">{f.notes}</label>
        <textarea id="sr-notes" className={field} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={f.notesPlaceholder} maxLength={2000} dir={dir} />
      </div>

      <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full px-8 py-3.5 disabled:opacity-50">
        {pending ? f.submitting : f.submit}
      </button>
      <p className="ruwaq-quote-privacy">{f.privacy}</p>
    </form>
  );
}
