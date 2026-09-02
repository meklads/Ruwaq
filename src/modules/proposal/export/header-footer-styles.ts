/**
 * Header/footer "skins" for the free "ruwaq" classic export template.
 *
 * Deliberately code-only (no generated images): research on professional
 * letterhead design (2026) consistently favors restraint — 2-3 brand
 * colors max, a single accent, subtle geometric texture rather than busy
 * imagery. CSS gradients + hairline patterns give print-sharp results at
 * any size and let the logo/company name sit on a guaranteed-readable
 * surface, which a raster background image can never fully guarantee.
 *
 * Only applies when exportTemplateId === "ruwaq" — the executive and
 * Graphics House templates keep their own fixed, premium-differentiated
 * looks untouched.
 */

/** Carries a public showcase pick through sign-up (see /style/[id]/route.ts).
 * Lives here, not in the route file, because Next.js route.ts files may
 * only export HTTP method handlers + reserved config — any other export
 * (like a plain constant) fails the build. */
export const HEADER_FOOTER_PREF_COOKIE = "ruwaq_hf_pref";

export type HeaderFooterStyleId =
  | "gold_classic"
  | "charcoal_copper"
  | "desert_sand"
  | "emerald_prestige"
  | "ivory_contemporary"
  | "steel_blue"
  | "royal_burgundy"
  | "coastal_teal"
  | "blueprint_grid"
  | "obsidian_gold";

export type HeaderFooterStyle = {
  id: HeaderFooterStyleId;
  nameAr: string;
  nameEn: string;
  /** Two swatch colors for the picker UI (bg, accent). */
  swatch: [string, string];
  /** Raw CSS injected after the base stylesheet; scoped under body.hf-{id}. */
  css: (dir: "rtl" | "ltr") => string;
};

const borderSide = (dir: "rtl" | "ltr") => (dir === "rtl" ? "right" : "left");

export const HEADER_FOOTER_STYLES: Record<HeaderFooterStyleId, HeaderFooterStyle> = {
  gold_classic: {
    id: "gold_classic",
    nameAr: "الأصيل الذهبي",
    nameEn: "Gold Classic",
    swatch: ["#F5F5F7", "#C9A063"],
    // This IS the template's default look — no overrides needed.
    css: () => "",
  },

  charcoal_copper: {
    id: "charcoal_copper",
    nameAr: "النحاس الدافئ",
    nameEn: "Warm Copper",
    swatch: ["#5C4A3A", "#B87333"],
    css: () => `
      body.hf-charcoal_copper .banner {
        background: #5C4A3A;
        background-image: repeating-linear-gradient(115deg, rgba(184,115,51,0.12) 0 2px, transparent 2px 22px);
        border-bottom: 3px solid #B87333;
      }
      body.hf-charcoal_copper .banner-badge { color: #D89B5C; }
      body.hf-charcoal_copper .banner-title { color: #FFFEFA; }
      body.hf-charcoal_copper .banner-client { color: rgba(255,254,250,0.75); }
      body.hf-charcoal_copper .header-company-name { color: #FFFEFA; }
      body.hf-charcoal_copper .logo-circle { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.32); }
      body.hf-charcoal_copper .doc-footer,
      body.hf-charcoal_copper .doc-footer-client {
        background: #5C4A3A;
        color: rgba(255,254,250,0.78);
        border-top: none;
      }
      body.hf-charcoal_copper .doc-footer a,
      body.hf-charcoal_copper .doc-footer-tagline { color: #D89B5C; }
      body.hf-charcoal_copper footer.doc-footer-client > div:first-child { color: #FFFEFA !important; }
    `,
  },

  desert_sand: {
    id: "desert_sand",
    nameAr: "الصحراء",
    nameEn: "Desert Sand",
    swatch: ["#E8DCC8", "#8B5A2B"],
    css: () => `
      body.hf-desert_sand .banner {
        background: linear-gradient(120deg, #EFE6D6 0%, #DCC7A3 100%);
        border-bottom: 3px solid #8B5A2B;
      }
      body.hf-desert_sand .banner-badge { color: #8B5A2B; }
      body.hf-desert_sand .banner-title { color: #5A3A1B; }
      body.hf-desert_sand .banner-client { color: #7A5C3A; }
      body.hf-desert_sand .header-company-name { color: #5A3A1B; }
      body.hf-desert_sand .logo-circle { background: #FBF7EF; border-color: #C9A876; }
      body.hf-desert_sand .doc-footer,
      body.hf-desert_sand .doc-footer-client {
        background: #F5EEDF;
        color: #7A5C3A;
        border-top: 1px solid #DCC7A3;
      }
      body.hf-desert_sand .doc-footer a,
      body.hf-desert_sand .doc-footer-tagline { color: #8B5A2B; }
      body.hf-desert_sand footer.doc-footer-client > div:first-child { color: #5A3A1B !important; }
    `,
  },

  emerald_prestige: {
    id: "emerald_prestige",
    nameAr: "الزمرد",
    nameEn: "Emerald Prestige",
    swatch: ["#0B3D2E", "#C9A063"],
    css: () => `
      body.hf-emerald_prestige .banner {
        background: linear-gradient(135deg, #0B3D2E 0%, #114A38 100%);
        border-bottom: 3px solid #C9A063;
      }
      body.hf-emerald_prestige .banner-badge { color: #D4B47A; }
      body.hf-emerald_prestige .banner-title { color: #FFFFFF; }
      body.hf-emerald_prestige .banner-client { color: rgba(255,255,255,0.72); }
      body.hf-emerald_prestige .header-company-name { color: #FFFFFF; }
      body.hf-emerald_prestige .logo-circle { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); }
      body.hf-emerald_prestige .doc-footer,
      body.hf-emerald_prestige .doc-footer-client {
        background: #0B3D2E;
        color: rgba(255,255,255,0.78);
        border-top: none;
      }
      body.hf-emerald_prestige .doc-footer a,
      body.hf-emerald_prestige .doc-footer-tagline { color: #D4B47A; }
      body.hf-emerald_prestige footer.doc-footer-client > div:first-child { color: #FFFFFF !important; }
    `,
  },

  ivory_contemporary: {
    id: "ivory_contemporary",
    nameAr: "الأبيض العصري",
    nameEn: "Ivory Contemporary",
    swatch: ["#FAF9F6", "#2F4A6E"],
    css: (dir) => `
      body.hf-ivory_contemporary .banner {
        background: #FAF9F6;
        border-bottom: 1px solid #E5E1D8;
        border-${borderSide(dir)}: 4px solid #2F4A6E;
      }
      body.hf-ivory_contemporary .banner-badge { color: #2F4A6E; }
      body.hf-ivory_contemporary .banner-title { color: #2F4A6E; }
      body.hf-ivory_contemporary .banner-client { color: #6E6E73; }
      body.hf-ivory_contemporary .header-company-name { color: #2F4A6E; }
      body.hf-ivory_contemporary .logo-circle { background: #FFFFFF; border: 1.5px solid #E5E1D8; }
      body.hf-ivory_contemporary .doc-footer,
      body.hf-ivory_contemporary .doc-footer-client {
        background: #FAF9F6;
        color: #6E6E73;
        border-top: 1px solid #E5E1D8;
      }
      body.hf-ivory_contemporary .doc-footer a,
      body.hf-ivory_contemporary .doc-footer-tagline { color: #2F4A6E; }
    `,
  },

  steel_blue: {
    id: "steel_blue",
    nameAr: "الفولاذ",
    nameEn: "Steel Blue",
    swatch: ["#3B4A5A", "#9FB4C7"],
    css: () => `
      body.hf-steel_blue .banner {
        background: #3B4A5A;
        background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px);
        border-bottom: 3px solid #9FB4C7;
      }
      body.hf-steel_blue .banner-badge { color: #C8D6E0; }
      body.hf-steel_blue .banner-title { color: #FFFFFF; }
      body.hf-steel_blue .banner-client { color: rgba(255,255,255,0.72); }
      body.hf-steel_blue .header-company-name { color: #FFFFFF; }
      body.hf-steel_blue .logo-circle { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.3); }
      body.hf-steel_blue .doc-footer,
      body.hf-steel_blue .doc-footer-client {
        background: #3B4A5A;
        color: rgba(255,255,255,0.78);
        border-top: none;
      }
      body.hf-steel_blue .doc-footer a,
      body.hf-steel_blue .doc-footer-tagline { color: #C8D6E0; }
      body.hf-steel_blue footer.doc-footer-client > div:first-child { color: #FFFFFF !important; }
    `,
  },

  royal_burgundy: {
    id: "royal_burgundy",
    nameAr: "الملكي",
    nameEn: "Royal Burgundy",
    swatch: ["#5C1A2B", "#C9A063"],
    css: () => `
      body.hf-royal_burgundy .banner {
        background: linear-gradient(135deg, #5C1A2B 0%, #6E2035 100%);
        border-bottom: 3px solid #C9A063;
      }
      body.hf-royal_burgundy .banner-badge { color: #D4B47A; }
      body.hf-royal_burgundy .banner-title { color: #FFFFFF; }
      body.hf-royal_burgundy .banner-client { color: rgba(255,255,255,0.72); }
      body.hf-royal_burgundy .header-company-name { color: #FFFFFF; }
      body.hf-royal_burgundy .logo-circle { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); }
      body.hf-royal_burgundy .doc-footer,
      body.hf-royal_burgundy .doc-footer-client {
        background: #5C1A2B;
        color: rgba(255,255,255,0.78);
        border-top: none;
      }
      body.hf-royal_burgundy .doc-footer a,
      body.hf-royal_burgundy .doc-footer-tagline { color: #D4B47A; }
      body.hf-royal_burgundy footer.doc-footer-client > div:first-child { color: #FFFFFF !important; }
    `,
  },

  coastal_teal: {
    id: "coastal_teal",
    nameAr: "الساحلي",
    nameEn: "Coastal Teal",
    swatch: ["#0E5C63", "#E8DCC8"],
    css: () => `
      body.hf-coastal_teal .banner {
        background: linear-gradient(120deg, #0E5C63 0%, #12707A 100%);
        border-bottom: 3px solid #E8DCC8;
      }
      body.hf-coastal_teal .banner-badge { color: #E8DCC8; }
      body.hf-coastal_teal .banner-title { color: #FFFFFF; }
      body.hf-coastal_teal .banner-client { color: rgba(255,255,255,0.72); }
      body.hf-coastal_teal .header-company-name { color: #FFFFFF; }
      body.hf-coastal_teal .logo-circle { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); }
      body.hf-coastal_teal .doc-footer,
      body.hf-coastal_teal .doc-footer-client {
        background: #0E5C63;
        color: rgba(255,255,255,0.8);
        border-top: none;
      }
      body.hf-coastal_teal .doc-footer a,
      body.hf-coastal_teal .doc-footer-tagline { color: #E8DCC8; }
      body.hf-coastal_teal footer.doc-footer-client > div:first-child { color: #FFFFFF !important; }
    `,
  },

  blueprint_grid: {
    id: "blueprint_grid",
    nameAr: "المخطط المعماري",
    nameEn: "Architectural Blueprint",
    swatch: ["#1B3A5C", "#7FA8D9"],
    css: () => `
      body.hf-blueprint_grid .banner {
        background:
          repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 24px),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 24px),
          #1B3A5C;
        border-bottom: 3px solid #7FA8D9;
      }
      body.hf-blueprint_grid .banner-badge { color: #A9C6E8; }
      body.hf-blueprint_grid .banner-title { color: #FFFFFF; }
      body.hf-blueprint_grid .banner-client { color: rgba(255,255,255,0.72); }
      body.hf-blueprint_grid .header-company-name { color: #FFFFFF; }
      body.hf-blueprint_grid .logo-circle { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.35); }
      body.hf-blueprint_grid .doc-footer,
      body.hf-blueprint_grid .doc-footer-client {
        background: #1B3A5C;
        color: rgba(255,255,255,0.78);
        border-top: none;
      }
      body.hf-blueprint_grid .doc-footer a,
      body.hf-blueprint_grid .doc-footer-tagline { color: #A9C6E8; }
      body.hf-blueprint_grid footer.doc-footer-client > div:first-child { color: #FFFFFF !important; }
    `,
  },

  obsidian_gold: {
    id: "obsidian_gold",
    nameAr: "نيلي وذهبي",
    nameEn: "Indigo Gold",
    swatch: ["#3D4F78", "#C9A063"],
    css: () => `
      body.hf-obsidian_gold .banner {
        background: #3D4F78;
        background-image: linear-gradient(180deg, rgba(201,160,99,0.12) 0%, transparent 60%);
        border-bottom: 3px solid #C9A063;
      }
      body.hf-obsidian_gold .banner-badge { color: #C9A063; letter-spacing: 0.14em; }
      body.hf-obsidian_gold .banner-title { color: #FFFEFA; }
      body.hf-obsidian_gold .banner-client { color: rgba(255,254,250,0.72); }
      body.hf-obsidian_gold .header-company-name { color: #FFFEFA; }
      body.hf-obsidian_gold .logo-circle { background: rgba(201,160,99,0.1); border-color: rgba(201,160,99,0.45); }
      body.hf-obsidian_gold .doc-footer,
      body.hf-obsidian_gold .doc-footer-client {
        background: #3D4F78;
        color: rgba(255,254,250,0.75);
        border-top: none;
      }
      body.hf-obsidian_gold .doc-footer a,
      body.hf-obsidian_gold .doc-footer-tagline { color: #C9A063; }
      body.hf-obsidian_gold footer.doc-footer-client > div:first-child { color: #FFFEFA !important; }
    `,
  },
};

export const HEADER_FOOTER_STYLE_ORDER: HeaderFooterStyleId[] = [
  "gold_classic",
  "charcoal_copper",
  "desert_sand",
  "emerald_prestige",
  "ivory_contemporary",
  "steel_blue",
  "royal_burgundy",
  "coastal_teal",
  "blueprint_grid",
  "obsidian_gold",
];

export function getHeaderFooterStyle(id: string | null | undefined): HeaderFooterStyle {
  if (id && id in HEADER_FOOTER_STYLES) return HEADER_FOOTER_STYLES[id as HeaderFooterStyleId];
  return HEADER_FOOTER_STYLES.gold_classic;
}

/** Free forever — 3 of the 10 looks, enough variety for the free trial. */
export const FREE_HEADER_FOOTER_STYLE_IDS: readonly HeaderFooterStyleId[] = [
  "gold_classic",
  "desert_sand",
  "steel_blue",
];

/** The other 7 are a paid-plan perk (see modules/billing). */
export function isPremiumHeaderFooterStyle(id: string): boolean {
  return !(FREE_HEADER_FOOTER_STYLE_IDS as readonly string[]).includes(id);
}

export function parseHeaderFooterStyleId(value: unknown): HeaderFooterStyleId {
  if (typeof value === "string" && value in HEADER_FOOTER_STYLES) {
    return value as HeaderFooterStyleId;
  }
  return "gold_classic";
}

/** Resolves the style a user is actually entitled to save/export with —
 * mirrors resolveEntitledExportTemplateId. Free users requesting a premium
 * look are quietly dropped back to the default rather than blocked. */
export function resolveEntitledHeaderFooterStyleId(
  requestedId: unknown,
  isPaid: boolean
): HeaderFooterStyleId {
  const requested = parseHeaderFooterStyleId(requestedId);
  if (!isPaid && isPremiumHeaderFooterStyle(requested)) {
    return "gold_classic";
  }
  return requested;
}

/**
 * Builds a small self-contained HTML doc reusing the EXACT same CSS class
 * names and skin CSS as the real export template (ruwaq.template.ts) —
 * meant to be rendered in an <iframe srcDoc>. Single source of truth for
 * BOTH the live picker in Company Settings and the public marketing
 * showcase, so neither can visually drift from what actually gets exported.
 */
export function buildHeaderFooterPreviewHtml(options: {
  styleId: string;
  companyName: string;
  logoUrl?: string;
  dir: "rtl" | "ltr";
  badgeLabel: string;
  companyFallback: string;
}): string {
  const style = getHeaderFooterStyle(options.styleId);
  const safeName = options.companyName.trim() || options.companyFallback;
  const logo = options.logoUrl?.trim() ?? "";

  return `<!DOCTYPE html>
<html dir="${options.dir}">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; }
  .banner {
    background: #F5F5F7;
    padding: 14px 18px 16px;
    color: #3A4556;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .banner-main { flex: 1; min-width: 0; }
  .banner-badge { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: #C9A063; font-weight: 700; margin-bottom: 3px; }
  .banner-title { font-size: 14px; font-weight: 700; color: #2F4A6E; margin: 0; }
  .header-logo-col { flex-shrink: 0; text-align: center; min-width: 48px; }
  .logo-circle {
    width: 34px; height: 34px; border-radius: 50%; background: #fff;
    border: 1.5px dashed #D1D5DB; display: flex; align-items: center;
    justify-content: center; overflow: hidden; margin: 0 auto 3px;
  }
  .logo-circle img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
  .header-company-name { font-size: 7px; font-weight: 700; color: #2F4A6E; margin: 0; max-width: 60px; }
  .doc-footer-client {
    border-top: 1px solid #E5E7EB;
    padding: 8px 18px 10px;
    font-size: 8px;
    color: #6E6E73;
    background: #F3F4F6;
  }
  .doc-footer-client > div:first-child { font-weight: 600; color: #2F4A6E; }
  ${style.css(options.dir)}
</style>
</head>
<body class="hf-${style.id}">
  <header class="banner">
    <div class="banner-main">
      <div class="banner-badge">${options.badgeLabel}</div>
      <h1 class="banner-title">${safeName}</h1>
    </div>
    <div class="header-logo-col">
      <div class="logo-circle">${logo ? `<img src="${logo}" alt="">` : ""}</div>
      <p class="header-company-name">${safeName}</p>
    </div>
  </header>
  <footer class="doc-footer-client">
    <div>${safeName}</div>
  </footer>
</body>
</html>`;
}
