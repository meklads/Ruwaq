import { SiteHeader } from "@/shared/components/site-header";
import { SiteFooter } from "@/shared/components/site-footer";
import { RuwaqProApplyBand } from "@/modules/marketplace/components/ruwaq-pro-apply-band";

export default function SiteShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 bg-white">
        {children}
      </main>
      <RuwaqProApplyBand />
      <SiteFooter />
    </div>
  );
}
