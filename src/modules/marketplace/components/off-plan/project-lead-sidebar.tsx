import type { OffPlanProject } from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { BrochureLeadTrigger } from "@/modules/marketplace/components/off-plan/brochure-lead-modal";
import { projectTitle } from "@/content/off-plan-projects";

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

type Copy = {
  sidebarTitle: string;
  sidebarSubtitle: string;
  downloadBrochure: string;
  closeModal: string;
  leadForm: LeadFormCopy;
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectLeadSidebar({ project, locale, copy }: Props) {
  const title = projectTitle(project, locale);

  return (
    <aside className="ruwaq-offplan-lead-sidebar">
      <p className="ruwaq-ad-eyebrow">{title}</p>
      <h2 className="ruwaq-offplan-sidebar-title">{copy.sidebarTitle}</h2>
      <p className="ruwaq-offplan-sidebar-subtitle">{copy.sidebarSubtitle}</p>
      <BrochureLeadTrigger
        project={project}
        locale={locale}
        copy={copy.leadForm}
        closeLabel={copy.closeModal}
        triggerLabel={copy.downloadBrochure}
        triggerClassName="ruwaq-pro-btn-solid w-full"
        variant="solid"
      />
    </aside>
  );
}
