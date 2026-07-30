/** Ruwaq brand tokens — export PDFs & proposals */
export const ruwaqBrand = {
  id: "ruwaq" as const,
  colors: {
    navy: "#0F172A",
    navySoft: "#94A3B8",
    gold: "#C9A063",
    goldLight: "#D4B47A",
    cream: "#E8E8ED",
    creamBg: "#F5F5F7",
    text: "#1D1D1F",
    textMuted: "#6E6E73",
    white: "#FFFFFF",
    estimateBg: "rgba(201, 160, 99, 0.12)",
    estimateBorder: "rgba(201, 160, 99, 0.35)",
    estimateText: "#A8864F",
    estimateGold: "#C9A063",
    budgetMatchBg: "#F0F7F4",
    budgetMatchBorder: "#B7D4C8",
    budgetMatchText: "#2D6A4F",
  },
  fonts: {
    arabic: "'Tajawal', 'IBM Plex Sans Arabic', 'Noto Sans Arabic', Tahoma, sans-serif",
    latin: "'Montserrat', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  footer: {
    addressAr: "جدة، حي الزهراء، المملكة العربية السعودية",
    addressEn: "Jeddah, Al-Zahra District, Saudi Arabia",
    website: "ruwaq.co",
    taglineAr: "احترافية تبني الثقة",
    taglineEn: "Professionalism builds trust",
  },
  assets: {
    logoOnLight: "/brand/ruwaq/logo-on-light.png",
    logoOnDark: "/brand/ruwaq/logo-on-dark.png",
    logoFullDark: "/brand/ruwaq/logo-full-dark.png",
  },
} as const;

export type ExportTemplateId = "ruwaq" | "ruwaq_executive" | "graphics_house";
