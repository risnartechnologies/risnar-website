import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-10 backdrop-blur">

      <div>
        <h2 className="text-2xl font-bold text-white">
          WhatsApp CRM
        </h2>

        <p className="text-sm text-slate-400">
          Manage campaigns and conversations
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="rounded-xl border border-slate-700 p-3 hover:border-green-500">
          <Bell className="text-white" size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-bold text-white">
            S
          </div>

          <div>
            <p className="font-semibold text-white">
              Sanjay
            </p>

            <p className="text-sm text-slate-400">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}