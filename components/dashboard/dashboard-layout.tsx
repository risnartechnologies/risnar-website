import type { ReactNode } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardHeader from "./dashboard-header";
import PageContainer from "./page-container";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader />

        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </div>
  );
}