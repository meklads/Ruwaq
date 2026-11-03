import { getLocale } from "@/shared/i18n/server";
import { getContentCopy } from "./copy";
import { privatePreviewActive } from "./preview-mode";

/** Shown on every page of the private preview deployment; renders nothing elsewhere. */
export async function PrivatePreviewBanner() {
  if (!privatePreviewActive()) return null;
  const locale = await getLocale();
  return (
    <div role="status" style={{ background: "#12372a", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 600, padding: "0.45rem 1rem" }}>
      {getContentCopy(locale).privateBanner}
    </div>
  );
}
