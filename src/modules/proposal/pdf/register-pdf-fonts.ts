import path from "path";
import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerProposalPdfFonts() {
  if (registered) return;
  const fontsDir = path.join(process.cwd(), "public/fonts");
  Font.register({
    family: "Tajawal",
    fonts: [
      { src: path.join(fontsDir, "Tajawal-Regular.ttf"), fontWeight: 400 },
      { src: path.join(fontsDir, "Tajawal-Bold.ttf"), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "TajawalFallback",
    fonts: [
      { src: path.join(fontsDir, "NotoSansArabic-Regular.ttf"), fontWeight: 400 },
      { src: path.join(fontsDir, "NotoSansArabic-Bold.ttf"), fontWeight: 700 },
    ],
  });
  registered = true;
}

export const PDF_FONT_FAMILY = "Tajawal";
