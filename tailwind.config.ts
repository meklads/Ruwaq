import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ruwaq: {
          /* Apple-neutral surfaces + Ruwaq logo gold accent */
          ink: "#1D1D1F",
          "ink-soft": "#6E6E73",
          "ink-muted": "#86868B",
          white: "#FFFFFF",
          paper: "#FFFFFF",
          canvas: "#FFFFFF",
          "canvas-soft": "#FBFBFD",
          "canvas-warm": "#FAFAFA",
          linen: "#F5F5F7",
          stone: "#E8E8ED",
          "stone-mid": "#D2D2D7",
          gold: "#C9A063",
          "gold-light": "#D4B47A",
          "gold-muted": "#F5F0E6",
          brown: "#C9A063",
          "brown-light": "#D4B47A",
          "brown-muted": "#F5F0E6",
          champagne: "#C9A063",
          "champagne-light": "#D4B47A",
          "champagne-muted": "#F5F0E6",
          sage: "#6B7F62",
          navy: "#0F172A",
          "navy-light": "#1E293B",
          "navy-muted": "#334155",
          "navy-soft": "#94A3B8",
          cream: "#E8E8ED",
          "cream-bg": "#F5F5F7",
        },
        warm: "#F9F9F9",
        charcoal: "#0A0A0A",
        lux: {
          ivory: "#FAF8F5",
          cream: "#F5F1EB",
          sand: "#EBE4D8",
          stone: "#D9D0C3",
          gold: "#B8956B",
          "gold-light": "#D4B896",
          ink: "#3D3632",
          "ink-soft": "#6B635C",
          "ink-muted": "#9A928A",
        },
        brand: {
          50: "#F5F5F7",
          100: "#E8E8ED",
          200: "#D2D2D7",
          300: "#AEAEB2",
          400: "#D4B47A",
          500: "#C9A063",
          600: "#A8864F",
          700: "#94A3B8",
          800: "#0F172A",
          900: "#141210",
        },
      },
      fontFamily: {
        ar: ["var(--font-ar)", "Segoe UI", "sans-serif"],
        "ar-heading": ["var(--font-marketing-ar)", "var(--font-ar)", "sans-serif"],
        latin: ["var(--font-marketing-latin)", "system-ui", "sans-serif"],
        sans: ["var(--font-ar)", "Segoe UI", "sans-serif"],
        display: ["var(--font-marketing-ar)", "var(--font-ar)", "sans-serif"],
        "display-en": ["var(--font-marketing-latin)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ruwaq:
          "0 1px 2px rgba(0, 0, 0, 0.02), 0 4px 20px rgba(0, 0, 0, 0.04)",
        "ruwaq-lg":
          "0 2px 8px rgba(0, 0, 0, 0.03), 0 20px 48px rgba(0, 0, 0, 0.07)",
        "ruwaq-soft": "0 24px 64px -16px rgba(0, 0, 0, 0.1)",
        "ruwaq-glass": "0 8px 32px rgba(0, 0, 0, 0.06)",
        "ruwaq-premium":
          "0 1px 1px rgba(0, 0, 0, 0.02), 0 8px 32px -8px rgba(0, 0, 0, 0.06), 0 24px 48px -24px rgba(0, 0, 0, 0.04)",
        "ruwaq-float":
          "0 4px 14px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.06)",
        "lux-soft": "0 8px 40px rgba(61, 54, 50, 0.08)",
        "lux-card": "0 2px 12px rgba(61, 54, 50, 0.06), 0 12px 32px rgba(61, 54, 50, 0.04)",
      },
      letterSpacing: {
        display: "-0.025em",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
