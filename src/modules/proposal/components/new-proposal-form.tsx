"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProposalAction } from "@/modules/proposal/server/proposal.actions";
import type { CommercialMode, PaymentType, PropertyType } from "@/shared/types";
import { useLocale, useT } from "@/shared/i18n/context";
import {
  validateLocaleText,
  validateProposalFields,
  type ProposalTextField,
} from "@/shared/i18n/locale";
import {
  OptionalDetailsFields,
  type OptionalDetailsValues,
} from "@/modules/proposal/components/optional-details-fields";
import Link from "next/link";
import { AppPageHero } from "@/shared/components/app-page-hero";
import { trackEvent } from "@/shared/lib/analytics";
import type { LeadProposalPrefill } from "@/modules/marketplace/server/lead-prefill.actions";

type Step = "project" | "details" | "generating";

type Props = {
  /** Home: hero above + tool section. Page: compact app hero (legacy route). */
  variant?: "embedded" | "page";
  prefill?: LeadProposalPrefill | null;
};

const EMPTY_OPTIONAL: OptionalDetailsValues = {
  projectLocation: "",
  propertyType: "",
  areaSqm: 0,
  durationHint: "",
  specifications: "",
};

const INITIAL_FORM = {
  projectName: "",
  clientName: "",
  description: "",
  budget: 0,
  paymentType: "milestone_30_40_30" as PaymentType,
  commercialMode: "fixed_price" as CommercialMode,
  ...EMPTY_OPTIONAL,
};

const TOOL_SECTION_ID = "create-proposal";

function formFromPrefill(prefill: LeadProposalPrefill | null | undefined) {
  if (!prefill) return INITIAL_FORM;
  return {
    projectName: prefill.projectName,
    clientName: prefill.clientName,
    description: prefill.description,
    budget: prefill.budget,
    paymentType: "milestone_30_40_30" as PaymentType,
    commercialMode: prefill.commercialMode,
    projectLocation: prefill.projectLocation,
    propertyType: "" as PropertyType,
    areaSqm: 0,
    durationHint: "",
    specifications: "",
  };
}

function stepForField(field: ProposalTextField): Step {
  return field === "description" ? "details" : "project";
}

export function NewProposalForm({ variant = "embedded", prefill = null }: Props) {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("project");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [optionalOpen, setOptionalOpen] = useState(Boolean(prefill?.projectLocation));
  const [form, setForm] = useState(() => formFromPrefill(prefill));
  const prevLocale = useRef(locale);

  useEffect(() => {
    if (prevLocale.current === locale) return;
    prevLocale.current = locale;
    if (!prefill) {
      setForm(INITIAL_FORM);
      setStep("project");
      setOptionalOpen(false);
      setError(null);
    }
  }, [locale, prefill]);

  const forward = locale === "ar" ? "←" : "→";
  const backward = locale === "ar" ? "→" : "←";
  const stepSep = locale === "ar" ? "←" : "→";
  const commercialModeName =
    variant === "embedded" ? "commercialModeHome" : "commercialModePage";

  const updateField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const showLocaleError = (result: NonNullable<ReturnType<typeof validateProposalFields>>) => {
    setStep(stepForField(result.field));
    setError(t.form.errors[result.error]);
  };

  const validateForm = (): boolean => {
    if (!form.projectName.trim() || !form.clientName.trim()) {
      setStep("project");
      setError(t.form.errors.projectRequired);
      return false;
    }
    if (!form.description.trim()) {
      setStep("details");
      setError(t.form.errors.descriptionRequired);
      return false;
    }
    const localeError = validateProposalFields(
      {
        projectName: form.projectName,
        clientName: form.clientName,
        description: form.description,
      },
      locale
    );
    if (localeError) {
      showLocaleError(localeError);
      return false;
    }

    for (const [, value] of [
      ["projectLocation", form.projectLocation],
      ["durationHint", form.durationHint],
      ["specifications", form.specifications],
    ] as const) {
      const optError = validateLocaleText(value, locale);
      if (optError) {
        setStep("details");
        setOptionalOpen(true);
        setError(t.form.errors[optError]);
        return false;
      }
    }

    if (
      form.commercialMode === "fixed_price" &&
      (!form.budget || form.budget <= 0)
    ) {
      setStep("details");
      setError(t.form.errors.budgetRequired);
      return false;
    }
    return true;
  };

  const continueToDetails = () => {
    if (!form.projectName.trim() || !form.clientName.trim()) {
      setError(t.form.errors.projectRequired);
      return;
    }
    const localeError = validateProposalFields(
      {
        projectName: form.projectName,
        clientName: form.clientName,
        description: "",
      },
      locale
    );
    if (localeError) {
      showLocaleError(localeError);
      return;
    }
    setError(null);
    setStep("details");
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setStep("generating");
    setProgress(20);

    try {
      const created = await createProposalAction({
        projectName: form.projectName,
        clientName: form.clientName,
        description: form.description,
        budget: form.budget,
        paymentType: form.paymentType,
        commercialMode: form.commercialMode,
        projectLocation: form.projectLocation || undefined,
        propertyType: (form.propertyType || undefined) as PropertyType | undefined,
        areaSqm: form.areaSqm > 0 ? form.areaSqm : undefined,
        durationHint: form.durationHint || undefined,
        specifications: form.specifications || undefined,
      });

      if (!created.success) {
        throw new Error(created.error ?? t.form.errors.generic);
      }

      trackEvent("proposal_start", { locale, mode: form.commercialMode });

      setProgress(60);
      const keyQuery = created.editKey
        ? `?key=${encodeURIComponent(created.editKey)}`
        : "";
      router.push(`/proposals/${created.id}${keyQuery}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t.form.errors.generic;
      setError(message);
      setStep("details");
    }
  };

  const progressBlock = (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16">
      <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-ruwaq-cream">
        <div
          className="h-full rounded-full bg-ruwaq-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-ruwaq-navy-soft">
        {progress < 50 ? t.form.generatingAnalyze : t.form.generatingWrite}
      </p>
      <p className="mt-2 max-w-md text-center text-xs text-ruwaq-ink-muted">
        {t.form.generatingWaitHint}
      </p>
    </div>
  );

  if (step === "generating") {
    if (variant === "embedded") {
      return (
        <section
          id={TOOL_SECTION_ID}
          className="ruwaq-home-tool scroll-mt-[7.5rem]"
          aria-labelledby="home-tool-title"
        >
          <div className="ruwaq-home-tool-inner">
            <p className="ruwaq-eyebrow">{t.nav.newProposal}</p>
            <h2 id="home-tool-title" className="ruwaq-app-title">
              {t.form.title}
            </h2>
            <p className="mt-2 text-[1.0625rem] text-ruwaq-ink-muted">
              {t.form.generatingWrite}
            </p>
            {progressBlock}
          </div>
        </section>
      );
    }

    return (
      <>
        <AppPageHero
          eyebrow={t.nav.newProposal}
          title={t.form.title}
          subtitle={t.form.generatingWrite}
        />
        <div className="app-content-area">{progressBlock}</div>
      </>
    );
  }

  const formBody = (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {(["project", "details"] as const).map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            {i > 0 && <span className="text-ruwaq-cream">{stepSep}</span>}
            <span
              className={
                step === s ? "ruwaq-step-pill-active" : "ruwaq-step-pill-inactive"
              }
            >
              {t.form.steps[s]}
            </span>
          </span>
        ))}
      </div>

      <div className="ruwaq-form-card">
        {prefill ? (
          <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
            {t.form.leadPrefillNotice(prefill.referenceCode)}
          </div>
        ) : null}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {step === "project" && (
          <div className="space-y-6">
            <div>
              <label className="ruwaq-label">{t.form.projectName}</label>
              <input
                type="text"
                value={form.projectName}
                onChange={(e) => updateField("projectName", e.target.value)}
                placeholder={t.form.projectNamePlaceholder}
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="ruwaq-field"
                autoFocus
              />
            </div>
            <div>
              <label className="ruwaq-label">{t.form.clientName}</label>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder={t.form.clientNamePlaceholder}
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="ruwaq-field"
              />
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={continueToDetails}
                disabled={!form.projectName.trim() || !form.clientName.trim()}
                className="btn-ruwaq-primary disabled:opacity-50"
              >
                {t.form.continue} {forward}
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <div>
              <label className="ruwaq-label">{t.form.description}</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder={t.form.descriptionPlaceholder}
                dir={locale === "ar" ? "rtl" : "ltr"}
                rows={5}
                className="ruwaq-field"
                autoFocus
              />
              <p className="mt-2 text-xs text-ruwaq-navy-soft/70">
                {t.form.descriptionHint}
              </p>
            </div>

            <OptionalDetailsFields
              open={optionalOpen}
              onToggle={() => setOptionalOpen((v) => !v)}
              values={{
                projectLocation: form.projectLocation,
                propertyType: form.propertyType as PropertyType,
                areaSqm: form.areaSqm,
                durationHint: form.durationHint,
                specifications: form.specifications,
              }}
              onChange={updateField}
              locale={locale}
            />

            <div className="border-t border-ruwaq-cream pt-6">
              <p className="mb-4 font-semibold text-ruwaq-navy">
                {t.form.commercialSection}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="ruwaq-label">{t.form.commercialMode}</label>
                  <div className="mt-2 space-y-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ruwaq-cream p-3 transition hover:bg-ruwaq-cream-bg/50 has-[:checked]:border-ruwaq-gold has-[:checked]:bg-ruwaq-gold/5">
                      <input
                        type="radio"
                        name={commercialModeName}
                        value="fixed_price"
                        checked={form.commercialMode === "fixed_price"}
                        onChange={() => updateField("commercialMode", "fixed_price")}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-ruwaq-navy">
                        {t.form.commercialModeFixed}
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ruwaq-cream p-3 transition hover:bg-ruwaq-cream-bg/50 has-[:checked]:border-ruwaq-gold has-[:checked]:bg-ruwaq-gold/5">
                      <input
                        type="radio"
                        name={commercialModeName}
                        value="estimate_only"
                        checked={form.commercialMode === "estimate_only"}
                        onChange={() =>
                          updateField("commercialMode", "estimate_only")
                        }
                        className="mt-0.5"
                      />
                      <span className="text-sm text-ruwaq-navy">
                        {t.form.commercialModeEstimate}
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="ruwaq-label">{t.form.budget}</label>
                  <input
                    type="number"
                    value={form.budget || ""}
                    onChange={(e) => updateField("budget", Number(e.target.value))}
                    placeholder={t.form.budgetPlaceholder}
                    dir="ltr"
                    className="ruwaq-field"
                  />
                  {form.commercialMode === "estimate_only" && (
                    <p className="mt-2 text-xs text-ruwaq-navy-soft/70">
                      {t.form.budgetOptional}
                    </p>
                  )}
                </div>
                <div>
                  <label className="ruwaq-label">{t.form.paymentStructure}</label>
                  <select
                    value={form.paymentType}
                    onChange={(e) => updateField("paymentType", e.target.value)}
                    className="ruwaq-field"
                  >
                    <option value="milestone_30_40_30">
                      {t.form.paymentOptions.milestone_30_40_30}
                    </option>
                    <option value="monthly">{t.form.paymentOptions.monthly}</option>
                    <option value="fixed">{t.form.paymentOptions.fixed}</option>
                    <option value="custom">{t.form.paymentOptions.custom}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("project")}
                className="btn-ruwaq-secondary"
              >
                {backward} {t.form.back}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!form.description.trim()}
                className="btn-ruwaq-primary disabled:opacity-50"
              >
                {t.form.generate}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (variant === "embedded") {
    return (
      <section
        id={TOOL_SECTION_ID}
        className="ruwaq-home-tool scroll-mt-[7.5rem]"
        aria-labelledby="home-tool-title"
      >
        <div className="ruwaq-home-tool-inner">
          <div className="mx-auto max-w-xl">
            <Link
              href="/templates/sample"
              className="inline-flex text-sm font-semibold text-ruwaq-gold hover:underline"
            >
              {t.nav.previewSample} {forward}
            </Link>
            <p className="mt-2 text-sm text-ruwaq-ink-muted">{t.form.subtitle}</p>
            <div className="mt-8">{formBody}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <AppPageHero
        eyebrow={t.nav.newProposal}
        title={t.form.title}
        subtitle={t.form.subtitle}
      >
        <Link
          href="/templates/sample"
          className="text-sm font-semibold text-ruwaq-gold hover:underline"
        >
          {t.nav.previewSample} {forward}
        </Link>
      </AppPageHero>
      <div className="app-content-area max-w-xl">{formBody}</div>
    </>
  );
}
