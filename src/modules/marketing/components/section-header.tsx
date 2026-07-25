type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
};

/** Shared landing section heading — light Apple rhythm. */
export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-start";

  return (
    <header className={alignClass}>
      <p className="ruwaq-eyebrow">{eyebrow}</p>
      <h2 className={`ruwaq-section-title mt-4 sm:mt-5 ${align === "center" ? "mx-auto max-w-4xl" : "max-w-2xl"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`ruwaq-section-lead mt-4 sm:mt-5 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
