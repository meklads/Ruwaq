import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  wide?: boolean;
  variant?: "default" | "tall" | "landscape";
  offset?: boolean;
};

/** Section image — minimal border on light canvas. */
export function SectionVisual({
  src,
  alt,
  priority,
  className = "",
  wide,
  variant = "default",
  offset = false,
}: Props) {
  const imgClass =
    variant === "landscape"
      ? "ruwaq-section-visual-img ruwaq-section-visual-img--landscape"
      : "ruwaq-section-visual-img";

  const wrapClass = [
    "ruwaq-section-visual-frame",
    wide ? "ruwaq-section-visual-wide" : "",
    offset ? "ruwaq-section-visual--offset" : "",
    variant === "tall" ? "ruwaq-section-visual--tall" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapClass}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={variant === "landscape" ? 675 : 900}
        className={imgClass}
        priority={priority}
        sizes={wide ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, 560px"}
      />
    </div>
  );
}

export const LANDING_SECTION_IMAGES = {
  problem: "/brand/body/1.webp",
  sample: "/brand/body/2.webp",
  audience: "/brand/body/3.webp",
  trust: "/brand/body/4.webp",
} as const;

export function landingSectionAlts(locale: "ar" | "en") {
  if (locale === "ar") {
    return {
      problem: "من فوضى Word إلى عرض منظم مع توريفا العقارية",
      sample: "نموذج عرض تشطيب احترافي على المكتب",
      audience: "مقاول تشطيب يراجع العرض في موقع المشروع",
      trust: "اتفاق ناجح بعد إرسال عرض PDF باسم شركتك",
    };
  }
  return {
    problem: "From Word chaos to an organized Turriva proposal",
    sample: "Professional fit-out proposal on a desk",
    audience: "Contractor reviewing a proposal on site",
    trust: "Successful deal after sending a branded PDF proposal",
  };
}
