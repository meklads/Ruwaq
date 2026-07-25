import Image from "next/image";

type Props = {
  href?: string;
  className?: string;
  variant?: "light" | "dark" | "mark";
  priority?: boolean;
};

const LOGO_SRC = {
  light: "/brand/graphics-house/logo-on-light.png",
  dark: "/brand/graphics-house/logo-on-dark.png",
  mark: "/brand/graphics-house/logo-mark.png",
} as const;

const LOGO_DIMS = {
  light: { width: 900, height: 417 },
  dark: { width: 900, height: 422 },
  mark: { width: 900, height: 200 },
} as const;

export const GRAPHICS_HOUSE_LOGO_CLASS = "h-8 w-auto sm:h-9";

export function GraphicsHouseLogo({
  href = "https://3dgraphicshouse.com",
  className = GRAPHICS_HOUSE_LOGO_CLASS,
  variant = "mark",
  priority = false,
}: Props) {
  const { width, height } = LOGO_DIMS[variant];

  const logo = (
    <Image
      src={LOGO_SRC[variant]}
      alt="Graphics House"
      width={width}
      height={height}
      className={`block w-auto ${className}`}
      priority={priority}
      quality={95}
      sizes="(max-width: 640px) 140px, 180px"
    />
  );

  if (!href) return logo;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center bg-transparent p-0 leading-none"
      aria-label="Graphics House — 3dgraphicshouse.com"
    >
      {logo}
    </a>
  );
}
