"use client";

import { useId, useState } from "react";
import { RuwaqProBadge } from "@/modules/marketplace/components/ruwaq-pro-badge";

type Props = {
  label: string;
  title: string;
  body: string;
  variant?: "featured" | "verified" | "muted";
  className?: string;
};

/** Verified / PRO badge with editorial hover tooltip. */
export function VerifiedBadgeTooltip({
  label,
  title,
  body,
  variant = "verified",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className={`ruwaq-verified-badge-wrap ${className}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span tabIndex={0} aria-describedby={open ? tooltipId : undefined} className="inline-flex">
        <RuwaqProBadge label={label} variant={variant} />
      </span>
      {open ? (
        <span id={tooltipId} role="tooltip" className="ruwaq-verified-tooltip">
          <span className="ruwaq-verified-tooltip__title">{title}</span>
          <span className="ruwaq-verified-tooltip__body">{body}</span>
        </span>
      ) : null}
    </span>
  );
}
