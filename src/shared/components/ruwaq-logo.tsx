import Image from "next/image";
import Link from "next/link";

/** Official header lockup — gold wordmark on black (793×506 source). */
export const RUWQ_HEADER_LOCKUP = {
  src: "/brand/ruwaq-logo2.png",
  width: 793,
  height: 506,
} as const;

type Props = {
  href?: string;
  className?: string;
  variant?: "light" | "dark" | "editorial";
  /** Larger lockup for footer band (same typography, slightly more spacing). */
  size?: "chrome" | "footer";
};

/** Classic text lockup, Arabic + English wordmark */
export const SITE_LOGO_SIZE_CLASS = "ruwaq-brand-lockup--chrome";

export function RuwaqLogo({
  href = "/",
  className = "",
  variant = "light",
  size = "chrome",
}: Props) {
  const sizeClass = size === "footer" ? "ruwaq-brand-lockup--footer" : "ruwaq-brand-lockup--chrome";
  const variantClass =
    variant === "editorial"
      ? "ruwaq-brand-lockup--editorial"
      : variant === "dark"
        ? "ruwaq-brand-lockup--dark"
        : "";

  const logo =
    variant === "editorial" ? (
      <span className={`ruwaq-brand-lockup ruwaq-brand-lockup--header-img ${className}`.trim()}>
        <Image
          src={RUWQ_HEADER_LOCKUP.src}
          alt="رواق RUWAQ"
          width={RUWQ_HEADER_LOCKUP.width}
          height={RUWQ_HEADER_LOCKUP.height}
          className="ruwaq-brand-lockup__img"
          priority
        />
      </span>
    ) : (
      <span
        className={`ruwaq-brand-lockup ${sizeClass} ${variantClass} ${className}`.trim()}
      >
        <span className="ruwaq-brand-wordmark">
          <span className="ruwaq-brand-ar">رواق</span>
          <span className="ruwaq-brand-en">RUWAQ</span>
        </span>
      </span>
    );

  if (!href) return logo;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center justify-center bg-transparent p-0 leading-none"
      aria-label="رواق، الصفحة الرئيسية"
    >
      {logo}
    </Link>
  );
}
