import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  variant?: "light" | "dark";
  priority?: boolean;
  /** Full raster lockup (PDF/export style). Default: motif + bilingual wordmark. */
  raster?: boolean;
};

const MOTIF_SRC = {
  light: "/brand/ruwaq/logo-on-light.png",
  dark: "/brand/ruwaq/logo-on-dark.png",
} as const;

const RASTER_SRC = {
  light: "/brand/ruwaq/logo-transparent.png",
  dark: "/brand/ruwaq/logo-on-dark.png",
} as const;

const MOTIF_WIDTH = 520;
const MOTIF_HEIGHT = 887;
const RASTER_WIDTH = 2867;
const RASTER_HEIGHT = 887;

/** Shared site chrome logo — header & footer match. */
export const SITE_LOGO_SIZE_CLASS = "h-16 w-auto sm:h-[4.5rem] lg:h-20 xl:h-[5.25rem]";

export function RuwaqLogo({
  href = "/",
  className = SITE_LOGO_SIZE_CLASS,
  variant = "light",
  priority = false,
  raster = false,
}: Props) {
  const logo = raster ? (
    <Image
      src={RASTER_SRC[variant]}
      alt="رواق Ruwaq"
      width={RASTER_WIDTH}
      height={RASTER_HEIGHT}
      className={`ruwaq-logo-img block w-auto ${className}`}
      priority={priority}
      quality={100}
      sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
    />
  ) : (
    <span
      className={`turriva-brand-lockup ${variant === "dark" ? "turriva-brand-lockup--dark" : ""} ${className}`}
    >
      <Image
        src={MOTIF_SRC[variant]}
        alt=""
        width={MOTIF_WIDTH}
        height={MOTIF_HEIGHT}
        className="turriva-brand-motif"
        priority={priority}
        quality={100}
        aria-hidden
        sizes="80px"
      />
      <span className="turriva-brand-wordmark">
        <span className="turriva-brand-ar">رواق</span>
        <span className="turriva-brand-en">RUWAQ</span>
      </span>
    </span>
  );

  if (!href) return logo;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center bg-transparent p-0 leading-none"
      aria-label="رواق — الصفحة الرئيسية"
    >
      {logo}
    </Link>
  );
}
