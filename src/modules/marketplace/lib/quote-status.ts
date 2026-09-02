import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";

export function quoteStatusPath(leadId: string): string {
  return `/quote/status/${leadId}`;
}

export function quoteStatusUrl(leadId: string): string {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? RUWQ_PUBLIC_URL).replace(/\/$/, "");
  return `${base}${quoteStatusPath(leadId)}`;
}
