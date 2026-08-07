"use client";

import {
  Bell,
  Menu,
} from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({
  onMenuClick,
}: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur sm:px-6 lg:px-10">

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-xl border border-slate-700 p-3 text-white hover:border-green-500 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            WhatsApp CRM
          </h2>

          <p className="hidden text-sm text-slate-400 sm:block">
            Manage campaigns and conversations
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3 sm:gap-6">

        <button className="rounded-xl border border-slate-700 p-3 transition hover:border-green-500">
          <Bell
            className="text-white"
            size={20}
          />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-bold text-white">
            S
          </div>

          <div className="hidden md:block">

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