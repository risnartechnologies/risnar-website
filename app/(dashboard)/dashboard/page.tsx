import type { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}