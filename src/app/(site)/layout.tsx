import { SiteHeader } from "@/shared/components/site-header";
import { SiteFooter } from "@/shared/components/site-footer";
import { PrivatePreviewBanner } from "@/modules/site/content/private-banner";

export default function SiteShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PrivatePreviewBanner />
      <SiteHeader />
      <main id="main" className="flex-1 bg-white">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
