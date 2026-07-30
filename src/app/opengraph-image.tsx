import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(165deg, #111111 0%, #1a1a1a 55%, #0a0a0a 100%)",
          color: "#ffffff",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 300,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          رواق
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.38em",
            paddingLeft: "0.38em",
            color: "#d4b47a",
            marginBottom: 36,
          }}
        >
          RUWAQ
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          دليل هندسي وعقاري في المنطقة الغربية
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 300,
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.72)",
            marginTop: 12,
          }}
        >
          Engineering directory and AI proposal studio, Western Region KSA
        </div>
      </div>
    ),
    size
  );
}
