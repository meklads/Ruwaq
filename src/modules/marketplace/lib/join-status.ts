import { RUWQ_PUBLIC_URL } from "@/shared/constants/brand";

export function joinStatusPath(applicationId: string): string {
  return `/join/status/${applicationId}`;
}

export function joinStatusUrl(applicationId: string): string {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? RUWQ_PUBLIC_URL).replace(/\/$/, "");
  return `${base}${joinStatusPath(applicationId)}`;
}
