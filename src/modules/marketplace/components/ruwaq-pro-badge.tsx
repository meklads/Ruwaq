type Props = {
  label: string;
  variant?: "featured" | "verified" | "muted";
  className?: string;
};

/** Ruwaq PRO mark — monochrome editorial badge */
export function RuwaqProBadge({
  label,
  variant = "verified",
  className = "",
}: Props) {
  const variantClass =
    variant === "featured"
      ? "ruwaq-pro-badge--featured"
      : variant === "muted"
        ? "ruwaq-pro-badge--muted"
        : "ruwaq-pro-badge--verified";

  return (
    <span className={`ruwaq-pro-badge ${variantClass} ${className}`.trim()} title={label}>
      {label}
    </span>
  );
}
