import Sidebar from "@/components/whatsapp/layout/sidebar";
import Topbar from "@/components/whatsapp/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">

      <Sidebar />

      <div className="ml-72">

        <Topbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}