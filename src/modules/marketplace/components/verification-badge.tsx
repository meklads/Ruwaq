import { RuwaqProBadge } from "@/modules/marketplace/components/ruwaq-pro-badge";

type Props = {
  label: string;
  trustCopy?: { modalTitle: string };
  className?: string;
  variant?: "featured" | "verified" | "muted";
};

/** Minimal PRO verification badge — editorial B&W style */
export function VerificationBadge({
  label,
  className = "",
  variant = "verified",
}: Props) {
  return <RuwaqProBadge label={label} variant={variant} className={className} />;
}
