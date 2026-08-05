"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard/whatsapp",
    icon: LayoutDashboard,
  },
  {
    title: "Contacts",
    href: "/dashboard/whatsapp/contacts",
    icon: Users,
  },
  {
    title: "Campaigns",
    href: "/dashboard/whatsapp/campaigns",
    icon: Megaphone,
  },
  {
    title: "Inbox",
    href: "/dashboard/whatsapp/inbox",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/dashboard/whatsapp/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/whatsapp/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white">
          RISNAR
        </h1>

        <p className="text-sm text-green-400">
          WhatsApp CRM
        </p>

      </div>

      <nav className="p-4">

        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                active
                  ? "bg-green-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={22} />
              {item.title}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}