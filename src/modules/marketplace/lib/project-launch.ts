export const PROJECT_LAUNCH_SERVICE_KEYS = [
  "integrated_launch",
  "smart_maquette",
  "cgi",
  "interactive",
  "gallery",
  "media",
] as const;

export const PROJECT_LAUNCH_INQUIRY_KEYS = [
  "new_project",
  "partnership",
  "general",
] as const;

export type ProjectLaunchServiceKey = (typeof PROJECT_LAUNCH_SERVICE_KEYS)[number];
export type ProjectLaunchInquiryKey = (typeof PROJECT_LAUNCH_INQUIRY_KEYS)[number];

export function formatProjectLaunchDetails(input: {
  projectDetails: string;
  clientEmail?: string;
  jobTitle?: string;
  serviceInterest?: string;
  inquiryType?: string;
  referrer?: "visualization_page" | "request_quote";
}): string {
  const meta: string[] = [];
  if (input.clientEmail?.trim()) meta.push(`Email: ${input.clientEmail.trim()}`);
  if (input.jobTitle?.trim()) meta.push(`Job title: ${input.jobTitle.trim()}`);
  if (input.serviceInterest?.trim()) meta.push(`Service: ${input.serviceInterest.trim()}`);
  if (input.inquiryType?.trim()) meta.push(`Inquiry: ${input.inquiryType.trim()}`);

  const lines = [...meta, "", input.projectDetails.trim()];
  if (input.referrer === "request_quote") {
    lines.push("", "— Submitted via Ruwaq /request-quote (ProjectLaunch™)");
  }
  return lines.join("\n");
}
