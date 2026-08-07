"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  Menu,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({
  onMenuClick,
}: Props) {
  const [email, setEmail] =
    useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setEmail(
        user?.email ?? ""
      );
    }

    loadUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

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
            {email
              ? email
                  .charAt(0)
                  .toUpperCase()
              : "A"}
          </div>

          <div className="hidden md:block">

            <p className="font-semibold text-white">
              {email ||
                "Administrator"}
            </p>

            <p className="text-sm text-slate-400">
              Admin
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl border border-red-600 px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={18} />
          <span className="hidden lg:block">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}