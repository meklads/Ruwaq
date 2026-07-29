import { ContractorPortalHeader } from "@/shared/components/contractor-portal-header";
import { ContractorPortalFooter } from "@/shared/components/contractor-portal-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ContractorPortalHeader />
      <div className="flex-1 bg-white">{children}</div>
      <ContractorPortalFooter />
    </div>
  );
}
