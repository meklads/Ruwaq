"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PROJECT_LAUNCH_INQUIRY_KEYS,
  PROJECT_LAUNCH_SERVICE_KEYS,
  type ProjectLaunchInquiryKey,
  type ProjectLaunchServiceKey,
} from "@/modules/marketplace/lib/project-launch";
import { submitVisualizationLead } from "@/modules/marketplace/server/visualization-lead.actions";
import { trackEvent } from "@/shared/lib/analytics";
import { ProjectLaunchBanner } from "@/modules/marketplace/components/project-launch-banner";
import { graphicsHouseProjectLaunchReferralUrl } from "@/shared/constants/brand";
import type { Messages } from "@/shared/i18n/messages/types";
import type { Locale } from "@/shared/i18n/locale";

const PROJECT_TYPE_KEYS = [
  "residential",
  "commercial",
  "hospitality",
  "mixed_use",
  "government",
  "other",
] as const;

type Props = {
  copy: Messages["marketplace"]["visualization"];
  locale: Locale;
};

export function VisualizationLeadForm({ copy, locale }: Props) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [serviceInterest, setServiceInterest] = useState<ProjectLaunchServiceKey | "">("");
  const [inquiryType, setInquiryType] = useState<ProjectLaunchInquiryKey | "">("");
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPE_KEYS)[number]>("residential");
  const [projectDetails, setProjectDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const projectLaunchUrl = graphicsHouseProjectLaunchReferralUrl("visualization_form");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitVisualizationLead({
      clientName,
      clientPhone,
      clientEmail: clientEmail.trim(),
      companyName: companyName || undefined,
      jobTitle: jobTitle || undefined,
      serviceInterest: serviceInterest || undefined,
      inquiryType: inquiryType || undefined,
      projectType,
      projectDetails,
      budgetRange: budgetRange || undefined,
      locale,
      referrer: "visualization_page",
    });
    setPending(false);
    if (!result.success) {
      const key = result.error as keyof typeof copy.errors;
      setError(copy.errors[key] ?? copy.errors.server);
      return;
    }
    setSuccess(true);
    trackEvent("visualization_lead", { referrer: "visualization_page", locale });
  };

  if (success) {
    return (
      <div className="ruwaq-join-editorial-success">
        <h2 className="ruwaq-ad-section-title text-2xl">{copy.successTitle}</h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{copy.successBody}</p>
        <a
          href={projectLaunchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ruwaq-pro-btn-outline mt-8 inline-flex px-6 py-2.5"
        >
          {copy.externalCta}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="ruwaq-join-editorial-fields">
      <ProjectLaunchBanner copy={copy} locale={locale} campaign="visualization_page_banner" />

      {error ? (
        <div className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.name}</label>
        <input
          className="ruwaq-ad-field"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.company}</label>
        <input
          className="ruwaq-ad-field"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={copy.fields.companyPlaceholder}
          autoComplete="organization"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.email}</label>
        <input
          className="ruwaq-ad-field"
          type="email"
          dir="ltr"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder={copy.fields.emailPlaceholder}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.phone}</label>
        <input
          className="ruwaq-ad-field"
          type="tel"
          dir="ltr"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder={copy.fields.phonePlaceholder}
          required
          autoComplete="tel"
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.jobTitle}</label>
        <input
          className="ruwaq-ad-field"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.projectType}</label>
        <select
          className="ruwaq-ad-field"
          value={projectType}
          onChange={(e) =>
            setProjectType(e.target.value as (typeof PROJECT_TYPE_KEYS)[number])
          }
          required
        >
          {PROJECT_TYPE_KEYS.map((key) => (
            <option key={key} value={key}>
              {copy.projectTypes[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.serviceInterest}</label>
        <select
          className="ruwaq-ad-field"
          value={serviceInterest}
          onChange={(e) => setServiceInterest(e.target.value as ProjectLaunchServiceKey | "")}
        >
          <option value="">{copy.fields.servicePlaceholder}</option>
          {PROJECT_LAUNCH_SERVICE_KEYS.map((key) => (
            <option key={key} value={key}>
              {copy.serviceInterests[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.inquiryType}</label>
        <select
          className="ruwaq-ad-field"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value as ProjectLaunchInquiryKey | "")}
        >
          <option value="">{copy.fields.inquiryPlaceholder}</option>
          {PROJECT_LAUNCH_INQUIRY_KEYS.map((key) => (
            <option key={key} value={key}>
              {copy.inquiryTypes[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.details}</label>
        <textarea
          className="ruwaq-ad-field min-h-[120px] resize-y"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          required
          minLength={10}
        />
      </div>

      <div>
        <label className="ruwaq-ad-field-label">{copy.fields.budget}</label>
        <input
          className="ruwaq-ad-field"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
        />
      </div>

      <button type="submit" disabled={pending} className="ruwaq-pro-btn-solid w-full px-8 py-3 disabled:opacity-50">
        {pending ? copy.submitting : copy.submit}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        {copy.privacyNote}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-950">
          {copy.privacyLink}
        </Link>
      </p>
    </form>
  );
}
