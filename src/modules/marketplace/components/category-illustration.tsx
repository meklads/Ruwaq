import type { MarketplaceCategorySlug } from "@/shared/constants/marketplace-taxonomy";

const ACCENT = "#B89468";
const INK = "#1C1917";

type Props = {
  slug: MarketplaceCategorySlug;
  className?: string;
};

const PANELS: Record<MarketplaceCategorySlug, string> = {
  "fit-out": "ruwaq-category-illustration--fit-out",
  contracting: "ruwaq-category-illustration--contracting",
  supervision: "ruwaq-category-illustration--supervision",
  hvac: "ruwaq-category-illustration--hvac",
  kitchens: "ruwaq-category-illustration--kitchens",
  "luxury-materials": "ruwaq-category-illustration--materials",
  outdoor: "ruwaq-category-illustration--outdoor",
  maintenance: "ruwaq-category-illustration--maintenance",
};

function IllustrationSvg({ slug }: { slug: MarketplaceCategorySlug }) {
  const stroke = INK;
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "fit-out":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <rect x="12" y="58" width="96" height="24" rx="2" {...common} />
          <path d="M24 58V44c0-6 8-10 16-10h40c8 0 16 4 16 10v14" {...common} />
          <path d="M36 34V22M48 34V18M60 34V22M72 34V18" {...common} />
          <circle cx="84" cy="28" r="8" fill={ACCENT} stroke="none" opacity="0.35" />
          <path d="M80 28h8M84 24v8" stroke={ACCENT} strokeWidth="1.25" />
        </svg>
      );
    case "contracting":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <path d="M18 78h84" {...common} />
          <path d="M28 78V52l16-18 16 12 20-22v36" {...common} />
          <path d="M78 24h18v12" {...common} />
          <path d="M84 18v18M78 24h18" stroke={ACCENT} strokeWidth="1.75" />
          <rect x="42" y="62" width="14" height="16" {...common} />
          <rect x="62" y="56" width="14" height="22" {...common} />
        </svg>
      );
    case "supervision":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <rect x="24" y="16" width="56" height="72" rx="3" {...common} />
          <path d="M34 30h36M34 42h28M34 54h32M34 66h20" {...common} />
          <path d="M88 28l14 8v44l-14 8V28z" {...common} />
          <circle cx="95" cy="58" r="10" fill={ACCENT} stroke="none" opacity="0.3" />
          <path d="M92 58l2.5 2.5 6-6" stroke={ACCENT} strokeWidth="1.75" />
        </svg>
      );
    case "hvac":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <rect x="22" y="28" width="76" height="40" rx="4" {...common} />
          <path d="M34 48h52M34 56h36" {...common} />
          <path d="M60 18v10M48 22l6 8M72 22l-6 8" stroke={ACCENT} strokeWidth="1.75" />
          <path d="M18 48c8-8 16-8 24 0s16 8 24 0 16-8 24 0" {...common} />
          <path d="M18 68c8 8 16 8 24 0s16-8 24 0 16 8 24 0" {...common} />
        </svg>
      );
    case "kitchens":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <rect x="14" y="34" width="92" height="44" rx="2" {...common} />
          <rect x="24" y="44" width="28" height="24" rx="1" {...common} />
          <rect x="58" y="44" width="18" height="24" rx="1" {...common} />
          <rect x="82" y="44" width="16" height="24" rx="1" {...common} />
          <path d="M34 34V24M52 34V20M70 34V24" {...common} />
          <circle cx="91" cy="30" r="6" fill={ACCENT} stroke="none" opacity="0.35" />
        </svg>
      );
    case "luxury-materials":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <path d="M60 14l14 24H46L60 14z" {...common} />
          <path d="M46 38h28l-6 44H52L46 38z" {...common} />
          <path d="M22 78h76" {...common} />
          <path d="M28 78V62l8-10 8 10v16M52 78V58l8-8 8 8v20" {...common} />
          <circle cx="88" cy="52" r="10" fill={ACCENT} stroke="none" opacity="0.25" />
          <path d="M84 52h8M88 48v8" stroke={ACCENT} strokeWidth="1.25" />
        </svg>
      );
    case "outdoor":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <path d="M12 78c18-10 36-10 54 0s36 10 54 0" {...common} />
          <path d="M60 18c-8 18-8 34 0 52" {...common} />
          <path d="M60 38c-14 8-22 18-22 32M60 38c14 8 22 18 22 32" {...common} />
          <circle cx="88" cy="26" r="10" fill={ACCENT} stroke="none" opacity="0.22" />
          <path d="M34 78h8v-10h-8v10zM78 78h10v-14H78v14z" {...common} />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 120 96" aria-hidden className="h-full w-full">
          <path
            d="M72 18l8 8-28 28a6 6 0 103 3l28-28 8 8-31 31a12 12 0 01-17-17l31-31z"
            {...common}
          />
          <rect x="18" y="52" width="34" height="26" rx="2" {...common} />
          <path d="M28 52V44h14v8M35 62v8" {...common} />
          <circle cx="88" cy="72" r="8" fill={ACCENT} stroke="none" opacity="0.28" />
        </svg>
      );
  }
}

export function CategoryIllustration({ slug, className = "" }: Props) {
  return (
    <div
      className={`ruwaq-category-illustration ${PANELS[slug]} ${className}`.trim()}
      aria-hidden
    >
      <IllustrationSvg slug={slug} />
    </div>
  );
}
