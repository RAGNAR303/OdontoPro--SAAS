import { Suspense } from "react";
import { SideBarDashboard } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBarDashboard>
      <Suspense fallback={<div>Carregando...</div>}>{children}</Suspense>
    </SideBarDashboard>
  );
}
