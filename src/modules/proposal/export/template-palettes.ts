/**
 * Curated 2–3 color palettes for NASAQ proposal templates.
 * Rule: never pure black / near-black (#000–#222). Deep blue / teal / stone instead.
 */

export type TemplatePaletteId =
  | "gold_sand"
  | "ocean_mist"
  | "emerald_soft"
  | "desert_clay"
  | "indigo_pearl"
  | "rose_stone"
  | "teal_linen"
  | "custom";

export type TemplatePalette = {
  id: TemplatePaletteId;
  nameAr: string;
  nameEn: string;
  /** Header / footer / strong UI */
  primary: string;
  /** Accent line, badges, CTAs */
  accent: string;
  /** Soft panels / page wash */
  surface: string;
  /** Text on primary backgrounds */
  onPrimary: string;
  /** Body text — never black */
  text: string;
  /** Muted secondary text */
  textMuted: string;
};

export const TEMPLATE_PALETTES: Record<Exclude<TemplatePaletteId, "custom">, TemplatePalette> = {
  gold_sand: {
    id: "gold_sand",
    nameAr: "ذهبي رملي",
    nameEn: "Gold Sand",
    primary: "#2F4A6E",
    accent: "#C9A063",
    surface: "#F7F4EF",
    onPrimary: "#FFFEFA",
    text: "#3A4556",
    textMuted: "#6B7280",
  },
  ocean_mist: {
    id: "ocean_mist",
    nameAr: "ضباب المحيط",
    nameEn: "Ocean Mist",
    primary: "#2A6B7C",
    accent: "#7EB8C4",
    surface: "#F0F7F8",
    onPrimary: "#F8FCFD",
    text: "#2F4A52",
    textMuted: "#5F7A82",
  },
  emerald_soft: {
    id: "emerald_soft",
    nameAr: "زمرد هادئ",
    nameEn: "Soft Emerald",
    primary: "#2D6A4F",
    accent: "#B8A06A",
    surface: "#F3F8F5",
    onPrimary: "#F7FBF8",
    text: "#2F4A3C",
    textMuted: "#5C7468",
  },
  desert_clay: {
    id: "desert_clay",
    nameAr: "طين الصحراء",
    nameEn: "Desert Clay",
    primary: "#8B5A2B",
    accent: "#C4A574",
    surface: "#F8F1E6",
    onPrimary: "#FFFBF5",
    text: "#4A3728",
    textMuted: "#7A6552",
  },
  indigo_pearl: {
    id: "indigo_pearl",
    nameAr: "نيلي لؤلؤي",
    nameEn: "Indigo Pearl",
    primary: "#4A5D8A",
    accent: "#B8A9D4",
    surface: "#F4F3F8",
    onPrimary: "#FAF9FC",
    text: "#3A4460",
    textMuted: "#6B7390",
  },
  rose_stone: {
    id: "rose_stone",
    nameAr: "حجر وردي",
    nameEn: "Rose Stone",
    primary: "#7A4E5C",
    accent: "#D4A5AE",
    surface: "#F9F3F4",
    onPrimary: "#FFF9FA",
    text: "#4A3540",
    textMuted: "#7A636C",
  },
  teal_linen: {
    id: "teal_linen",
    nameAr: "تيل كتّان",
    nameEn: "Teal Linen",
    primary: "#3D6B66",
    accent: "#C2A878",
    surface: "#F4F7F5",
    onPrimary: "#F8FBFA",
    text: "#334844",
    textMuted: "#5E736E",
  },
};

export const TEMPLATE_PALETTE_ORDER: Exclude<TemplatePaletteId, "custom">[] = [
  "gold_sand",
  "ocean_mist",
  "emerald_soft",
  "desert_clay",
  "indigo_pearl",
  "rose_stone",
  "teal_linen",
];

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

function isHex(value: string | null | undefined): value is string {
  return Boolean(value && HEX_RE.test(value));
}

/** Reject near-black primaries so custom picks stay readable and on-brand. */
function liftIfTooDark(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance >= 0.12) return hex;
  // Lift toward a soft navy-blue rather than pure black
  return "#2F4A6E";
}

export function resolveTemplatePalette(options: {
  paletteId?: string | null;
  primary?: string | null;
  accent?: string | null;
  surface?: string | null;
}): TemplatePalette {
  const { paletteId, primary, accent, surface } = options;

  if (isHex(primary) && isHex(accent)) {
    const p = liftIfTooDark(primary);
    const a = accent;
    const s = isHex(surface) ? surface : "#F7F4EF";
    return {
      id: "custom",
      nameAr: "مخصص",
      nameEn: "Custom",
      primary: p,
      accent: a,
      surface: s,
      onPrimary: "#FFFEFA",
      text: "#3A4556",
      textMuted: "#6B7280",
    };
  }

  if (paletteId && paletteId in TEMPLATE_PALETTES) {
    return TEMPLATE_PALETTES[paletteId as Exclude<TemplatePaletteId, "custom">];
  }

  return TEMPLATE_PALETTES.gold_sand;
}

/**
 * Full-document theme overrides — header, footer, tables, cover, accents.
 * Applied after base + header/footer skins so the visitor's palette wins.
 */
export function buildPaletteThemeCss(palette: TemplatePalette, dir: "rtl" | "ltr"): string {
  const { primary, accent, surface, onPrimary, text, textMuted } = palette;
  const side = dir === "rtl" ? "right" : "left";

  return `
    :root {
      --tpl-primary: ${primary};
      --tpl-accent: ${accent};
      --tpl-surface: ${surface};
      --tpl-on-primary: ${onPrimary};
      --tpl-text: ${text};
      --tpl-text-muted: ${textMuted};
    }
    body {
      color: ${text} !important;
    }
    .banner {
      background: linear-gradient(135deg, ${primary} 0%, ${primary}ee 100%) !important;
      background-image: none !important;
      border-bottom: 3px solid ${accent} !important;
      border-top: none !important;
      color: ${onPrimary} !important;
    }
    .banner-badge { color: ${accent} !important; }
    .banner-title { color: ${onPrimary} !important; }
    .banner-client { color: ${onPrimary}cc !important; }
    .header-company-name { color: ${onPrimary} !important; }
    .logo-letterhead {
      background: ${onPrimary} !important;
      border-color: ${accent}66 !important;
    }
    .logo-monogram {
      background: ${primary} !important;
      border-color: ${accent} !important;
    }
    .logo-monogram-text { color: ${accent} !important; }
    .doc-footer,
    .doc-footer-client {
      background: ${primary} !important;
      color: ${onPrimary}cc !important;
      border-top: none !important;
    }
    .doc-footer a,
    .doc-footer-tagline { color: ${accent} !important; }
    footer.doc-footer-client > div:first-child { color: ${onPrimary} !important; }
    .doc-footer-meta { color: ${onPrimary}b3 !important; }
    .section-title { color: ${primary} !important; }
    .exec-index { background: ${primary} !important; color: ${onPrimary} !important; }
    th, .boq-table th {
      background: ${primary} !important;
      color: ${onPrimary} !important;
    }
    .boq-table { border-color: ${primary}33 !important; }
    .total-box {
      background: linear-gradient(135deg, ${primary} 0%, ${primary}dd 100%) !important;
      color: ${onPrimary} !important;
      border-color: ${accent} !important;
    }
    .meta-grid {
      background: ${surface} !important;
      border-color: ${primary}22 !important;
    }
    .meta-grid strong { color: ${primary} !important; }
    .intro, .scope-item {
      background: ${surface} !important;
      border-color: ${primary}18 !important;
    }
    .scope-item { border-${side}: 3px solid ${primary} !important; }
    .clause-item { border-${side}: 3px solid ${accent} !important; }
    .clause-cat { color: ${accent} !important; }
    .clause-num {
      background: ${surface} !important;
      color: ${primary} !important;
      border-color: ${primary}33 !important;
    }
    .amount-cell { color: ${primary} !important; }
    .signature-line { border-top-color: ${primary} !important; color: ${primary} !important; }
    .cover-page {
      background: linear-gradient(165deg, ${surface} 0%, #ffffff 50%, ${surface} 100%) !important;
    }
    .cover-page--executive {
      background: linear-gradient(145deg, ${primary} 0%, ${primary}ee 100%) !important;
      border-bottom-color: ${accent} !important;
    }
    .cover-eyebrow, .cover-confidential { color: ${accent} !important; }
    .cover-title { color: ${primary} !important; }
    .cover-page--executive .cover-title,
    .cover-page--executive .cover-meta-value { color: ${onPrimary} !important; }
    .cover-page--executive .cover-client,
    .cover-page--executive .cover-company { color: ${onPrimary}cc !important; }
    .cover-meta {
      background: #ffffffaa !important;
      border-color: ${primary}22 !important;
    }
    .cover-page--executive .cover-meta {
      background: ${onPrimary}14 !important;
      border-color: ${onPrimary}33 !important;
    }
    .cover-meta-label { color: ${textMuted} !important; }
    .cover-meta-value { color: ${primary} !important; }
    .cover-gold-rule {
      background: linear-gradient(90deg, ${accent}, transparent) !important;
    }
    .cover-chrome-header {
      background: ${primary};
      color: ${onPrimary};
      border-bottom: 2px solid ${accent};
    }
    .cover-chrome-footer {
      background: ${primary};
      color: ${onPrimary}cc;
      border-top: 2px solid ${accent};
    }
    .cover-chrome-footer-company { color: ${onPrimary}; }
    body.variant-executive .banner {
      background: linear-gradient(135deg, ${primary} 0%, ${primary}cc 100%) !important;
      border-bottom-color: ${accent} !important;
    }
    body.variant-executive .doc-footer,
    body.variant-executive .doc-footer-client {
      background: ${primary} !important;
    }
    body.variant-executive .total-box {
      background: #ffffff !important;
      color: ${primary} !important;
      border-color: ${primary} !important;
    }
  `;
}

export function parsePaletteQuery(searchParams: URLSearchParams): {
  paletteId?: string;
  primary?: string;
  accent?: string;
  surface?: string;
} {
  return {
    paletteId: searchParams.get("palette") ?? undefined,
    primary: searchParams.get("c1") ?? undefined,
    accent: searchParams.get("c2") ?? undefined,
    surface: searchParams.get("c3") ?? undefined,
  };
}

export function paletteToQuery(palette: TemplatePalette): string {
  if (palette.id === "custom") {
    const parts = [`c1=${encodeURIComponent(palette.primary)}`, `c2=${encodeURIComponent(palette.accent)}`];
    if (palette.surface) parts.push(`c3=${encodeURIComponent(palette.surface)}`);
    return parts.join("&");
  }
  return `palette=${palette.id}`;
}
