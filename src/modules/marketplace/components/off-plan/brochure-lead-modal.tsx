"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import type { OffPlanProject } from "@/content/off-plan-projects";
import { projectTitle } from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import {
  submitProjectBrochureLead,
  type ProjectLeadRole,
} from "@/modules/marketplace/server/project-lead.actions";

const STORAGE_KEY = "ruwaq_off_plan_leads";

type LeadFormCopy = {
  title: string;
  subtitle: string;
  fullName: string;
  whatsApp: string;
  email: string;
  role: string;
  roleEndBuyer: string;
  roleInvestor: string;
  roleBroker: string;
  submit: string;
  submitting: string;
  success: string;
  validation: string;
  invalidPhone: string;
};

type BrochureLeadProps = {
  project: OffPlanProject;
  locale: Locale;
  copy: LeadFormCopy;
  closeLabel: string;
  open: boolean;
  onClose: () => void;
};

function persistLeadLocally(payload: Record<string, unknown>) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
    existing.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-50)));
  } catch {
    /* ignore */
  }
}

export function BrochureLeadModal({
  project,
  locale,
  copy,
  closeLabel,
  open,
  onClose,
}: BrochureLeadProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<ProjectLeadRole>("end_buyer");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const dialogRef = useCallback((node: HTMLDialogElement | null) => {
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setDone(false);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await submitProjectBrochureLead({
        clientName: fullName,
        clientPhone: phone,
        clientEmail: email,
        role,
        projectSlug: project.slug,
        locale,
      });

      if (!result.success) {
        setError(result.error === "invalid_phone" ? copy.invalidPhone : copy.validation);
        return;
      }

      persistLeadLocally({
        leadId: result.leadId,
        projectSlug: project.slug,
        fullName,
        phone,
        email,
        role,
      });

      setDone(true);
      const brochureUrl = `${project.brochurePdf}${project.brochurePdf.includes("?") ? "&" : "?"}locale=${locale}`;
      window.open(brochureUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => onClose(), 1200);
    });
  };

  const title = projectTitle(project, locale);

  return (
    <dialog
      ref={dialogRef}
      className="ruwaq-offplan-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ruwaq-offplan-dialog-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ruwaq-offplan-dialog-close" onClick={onClose} aria-label={closeLabel}>
          ✕
        </button>
        <header className="ruwaq-offplan-dialog-header">
          <p className="ruwaq-ad-eyebrow">{title}</p>
          <h2 className="ruwaq-offplan-dialog-title">{copy.title}</h2>
          <p className="ruwaq-offplan-dialog-subtitle">{copy.subtitle}</p>
        </header>

        {done ? (
          <p className="ruwaq-offplan-success">{copy.success}</p>
        ) : (
          <form className="ruwaq-offplan-lead-form" onSubmit={handleSubmit}>
            <label className="ruwaq-offplan-field">
              <span>{copy.fullName}</span>
              <input
                type="text"
                required
                minLength={2}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="ruwaq-offplan-field">
              <span>{copy.whatsApp}</span>
              <input
                type="tel"
                required
                dir="ltr"
                placeholder="+966 5X XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
            <label className="ruwaq-offplan-field">
              <span>{copy.email}</span>
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <fieldset className="ruwaq-offplan-field">
              <legend>{copy.role}</legend>
              <div className="ruwaq-offplan-role-grid">
                {(
                  [
                    ["end_buyer", copy.roleEndBuyer],
                    ["investor", copy.roleInvestor],
                    ["broker", copy.roleBroker],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="ruwaq-offplan-role-option">
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error ? <p className="ruwaq-offplan-error">{error}</p> : null}
            <button type="submit" className="ruwaq-pro-btn-solid w-full" disabled={pending}>
              {pending ? copy.submitting : copy.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

type TriggerProps = {
  project: OffPlanProject;
  locale: Locale;
  copy: LeadFormCopy;
  closeLabel: string;
  triggerLabel: string;
  triggerClassName?: string;
  variant?: "solid" | "outline" | "ghost";
};

export function BrochureLeadTrigger({
  project,
  locale,
  copy,
  closeLabel,
  triggerLabel,
  triggerClassName,
  variant = "outline",
}: TriggerProps) {
  const [open, setOpen] = useState(false);
  const defaultClass =
    variant === "solid"
      ? "ruwaq-pro-btn-solid"
      : variant === "ghost"
        ? "ruwaq-offplan-ghost-btn"
        : "ruwaq-pro-btn-outline";

  return (
    <>
      <button
        type="button"
        className={triggerClassName ?? defaultClass}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </button>
      <BrochureLeadModal
        project={project}
        locale={locale}
        copy={copy}
        closeLabel={closeLabel}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
