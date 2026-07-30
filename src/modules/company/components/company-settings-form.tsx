"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CompanyProfile } from "@prisma/client";
import { useT } from "@/shared/i18n/context";
import {
  EXPORT_TEMPLATE_IDS,
  isPremiumExportTemplate,
  type ExportTemplateId,
} from "@/modules/company/lib/export-template-ids";
import { UpgradeModal } from "@/modules/billing/components/upgrade-modal";
import { HeaderFooterStylePicker } from "./header-footer-style-picker";
import type { HeaderFooterStyleId } from "@/modules/proposal/export/header-footer-styles";
import {
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
} from "@/modules/company/lib/field-validators";

interface Props {
  initial: CompanyProfile | null;
  /** Master switch (env BILLING_ENABLED). false = free trial, nothing locked. */
  billingEnabled: boolean;
  /** Style chosen on the public showcase before sign-up (cookie-carried). */
  preferredStyleId?: HeaderFooterStyleId;
}

export function CompanySettingsForm({ initial, billingEnabled, preferredStyleId }: Props) {
  const t = useT();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [logoWarning, setLogoWarning] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // During the free trial every template is unlocked for everyone.
  const isPaid = !billingEnabled || (initial?.isPaid ?? false);
  const [form, setForm] = useState({
    companyName: initial?.companyName ?? "",
    logoUrl: initial?.logoUrl ?? "",
    address: initial?.address ?? "",
    about: initial?.about ?? "",
    crNumber: initial?.crNumber ?? "",
    vatNumber: initial?.vatNumber ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    website: initial?.website ?? "",
    portfolioUrl: initial?.portfolioUrl ?? "",
    catalogUrl: initial?.catalogUrl ?? "",
    exportTemplateId: (initial?.exportTemplateId ?? "ruwaq") as ExportTemplateId,
    headerFooterStyleId: (initial?.headerFooterStyleId ??
      preferredStyleId ??
      "gold_classic") as HeaderFooterStyleId,
  });

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((errs) => {
        const next = { ...errs };
        delete next[field];
        return next;
      });
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    setLogoWarning(null);
    try {
      const body = new FormData();
      body.append("logo", file);
      const res = await fetch("/api/company/logo", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "upload failed");
      update("logoUrl", data.url);
      if (data.warning) setLogoWarning(t.company.logoStorageWarning);
      router.refresh();
    } catch {
      alert(t.company.logoUploadFailed);
    }
    setUploading(false);
  };

  const validate = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (form.phone && !isValidPhone(form.phone)) errors.phone = "invalid_phone";
    if (form.email && !isValidEmail(form.email)) errors.email = "invalid_email";
    if (form.website && !isValidHttpUrl(form.website)) errors.website = "invalid_url";
    if (form.portfolioUrl && !isValidHttpUrl(form.portfolioUrl)) errors.portfolioUrl = "invalid_url";
    if (form.catalogUrl && !isValidHttpUrl(form.catalogUrl)) errors.catalogUrl = "invalid_url";
    return errors;
  };

  const handleSave = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSaveStatus("error");
      return;
    }

    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/company/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
        throw new Error("save failed");
      }
      setFieldErrors({});
      router.refresh();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus((s) => (s === "success" ? "idle" : s)), 3000);
    } catch {
      setSaveStatus("error");
      alert(t.company.saveFailed);
    }
    setSaving(false);
  };

  const errorText = (field: string) => {
    const code = fieldErrors[field];
    if (!code) return null;
    if (code === "invalid_phone") return t.company.errors.invalidPhone;
    if (code === "invalid_email") return t.company.errors.invalidEmail;
    return t.company.errors.invalidUrl;
  };

  const errorInputClass = (field: string) =>
    fieldErrors[field] ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "";

  const inputClass =
    "mt-1 block w-full rounded-lg border border-ruwaq-stone/80 px-3 py-2.5 text-sm shadow-sm focus:border-ruwaq-champagne/50 focus:outline-none focus:ring-4 focus:ring-ruwaq-champagne/10";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-ruwaq-ink">
          {t.company.sections.identity}
        </h2>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.companyName}
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.logoUrl}
          </label>
          {form.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.logoUrl}
              alt=""
              className="mb-2 h-14 w-auto max-w-[200px] object-contain"
            />
          )}
          <input
            type="url"
            value={form.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            placeholder={t.company.logoUrlPlaceholder}
            dir="ltr"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-ruwaq-ink-muted">{t.company.logoUrlHint}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleLogoUpload(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-ruwaq-secondary mt-3 px-4 py-2 text-sm disabled:opacity-50"
          >
            {uploading ? t.company.logoUploading : t.company.logoUpload}
          </button>
          {logoWarning && (
            <p className="mt-2 text-xs font-medium text-amber-600">{logoWarning}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.address}
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder={t.company.addressPlaceholder}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ruwaq-ink">
              {t.company.crNumber}
            </label>
            <input
              type="text"
              value={form.crNumber}
              onChange={(e) => update("crNumber", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ruwaq-ink">
              {t.company.vatNumber}
            </label>
            <input
              type="text"
              value={form.vatNumber}
              onChange={(e) => update("vatNumber", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.phone}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            dir="ltr"
            className={`${inputClass} ${errorInputClass("phone")}`}
          />
          {errorText("phone") && (
            <p className="mt-1 text-xs font-medium text-red-600">{errorText("phone")}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.email}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            dir="ltr"
            className={`${inputClass} ${errorInputClass("email")}`}
          />
          {errorText("email") && (
            <p className="mt-1 text-xs font-medium text-red-600">{errorText("email")}</p>
          )}
        </div>
      </section>

      <section className="space-y-4 border-t border-ruwaq-stone/50 pt-6">
        <h2 className="text-sm font-semibold text-ruwaq-ink">
          {t.company.sections.export}
        </h2>
        <p className="text-xs text-ruwaq-ink-muted">{t.company.exportTemplateHint}</p>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.exportTemplate}
          </label>
          <select
            value={form.exportTemplateId}
            onChange={(e) => update("exportTemplateId", e.target.value)}
            className={inputClass}
          >
            {EXPORT_TEMPLATE_IDS.map((id) => {
              const locked = !isPaid && isPremiumExportTemplate(id);
              return (
                <option key={id} value={id} disabled={locked}>
                  {t.company.exportTemplateOptions[id]}
                  {locked ? `، ${t.upgrade.lockedSuffix}` : ""}
                </option>
              );
            })}
          </select>
          {!billingEnabled && (
            <p className="mt-2 text-xs font-medium text-ruwaq-gold">
              {t.upgrade.trialNotice}
            </p>
          )}
          {billingEnabled && !isPaid && (
            <div className="ruwaq-upsell-card mt-3">
              <p className="text-sm font-semibold text-ruwaq-ink">
                {t.upgrade.inlineTitle}
              </p>
              <p className="mt-1 text-xs text-ruwaq-ink-muted">
                {t.upgrade.inlineBody}
              </p>
              <button
                type="button"
                onClick={() => setUpgradeOpen(true)}
                className="btn-ruwaq-primary mt-3 px-4 py-2 text-sm"
              >
                {t.upgrade.cta}
              </button>
            </div>
          )}
        </div>

        {form.exportTemplateId === "ruwaq" && (
          <>
            {!initial && preferredStyleId && (
              <p className="rounded-lg bg-ruwaq-champagne/10 px-3 py-2 text-xs font-medium text-ruwaq-ink">
                {t.company.headerFooter.prefilledNotice}
              </p>
            )}
            <HeaderFooterStylePicker
              value={form.headerFooterStyleId}
              onChange={(id) => update("headerFooterStyleId", id)}
              companyName={form.companyName}
              logoUrl={form.logoUrl}
              isPaid={isPaid}
              onRequestUpgrade={() => setUpgradeOpen(true)}
            />
          </>
        )}
      </section>

      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onSuccess={() => setUpgradeOpen(false)}
      />

      <section className="space-y-4 border-t border-ruwaq-stone/50 pt-6">
        <h2 className="text-sm font-semibold text-ruwaq-ink">
          {t.company.sections.marketing}
        </h2>
        <p className="text-xs text-ruwaq-ink-muted">{t.company.marketingHint}</p>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.about}
          </label>
          <textarea
            value={form.about}
            onChange={(e) => update("about", e.target.value)}
            placeholder={t.company.aboutPlaceholder}
            rows={4}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.website}
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://"
            dir="ltr"
            className={`${inputClass} ${errorInputClass("website")}`}
          />
          {errorText("website") && (
            <p className="mt-1 text-xs font-medium text-red-600">{errorText("website")}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.portfolioUrl}
          </label>
          <input
            type="url"
            value={form.portfolioUrl}
            onChange={(e) => update("portfolioUrl", e.target.value)}
            placeholder={t.company.portfolioUrlPlaceholder}
            dir="ltr"
            className={`${inputClass} ${errorInputClass("portfolioUrl")}`}
          />
          {errorText("portfolioUrl") && (
            <p className="mt-1 text-xs font-medium text-red-600">{errorText("portfolioUrl")}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-ruwaq-ink">
            {t.company.catalogUrl}
          </label>
          <input
            type="url"
            value={form.catalogUrl}
            onChange={(e) => update("catalogUrl", e.target.value)}
            placeholder={t.company.catalogUrlPlaceholder}
            dir="ltr"
            className={`${inputClass} ${errorInputClass("catalogUrl")}`}
          />
          {errorText("catalogUrl") && (
            <p className="mt-1 text-xs font-medium text-red-600">{errorText("catalogUrl")}</p>
          )}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-ruwaq-primary px-6 py-2 disabled:opacity-50"
        >
          {saving ? t.company.saving : t.company.save}
        </button>
        {saveStatus === "success" && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.415 0l-3.5-3.5a1 1 0 111.415-1.414l2.792 2.792 6.793-6.793a1 1 0 011.415 0z"
                clipRule="evenodd"
              />
            </svg>
            {t.company.saveSuccess}
          </span>
        )}
      </div>
    </div>
  );
}
