"use client";

import Link from "next/link";
import RecentConversations from "@/components/whatsapp/dashboard/recent-conversations";
import CampaignPerformance from "@/components/whatsapp/dashboard/campaign-performance";
import {
  useEffect,
  useState,
} from "react";
import {
  Users,
  MessageSquare,
  Megaphone,
  BarChart3,
  Plus,
} from "lucide-react";

export default function DashboardPage() {

  interface DashboardData {
  contacts: number;
  conversations: number;
  unread: number;
  campaigns: number;
  messages: number;

  messagesToday: number;

  newContactsToday: number;

  activeCampaigns: number;
  recentMessages: {
    id: string;
    body: string;
    contact: {
      name: string | null;
      phone: string;
    };
  }[];
}

const [data, setData] =
  useState<DashboardData | null>(
    null
  );

useEffect(() => {
  loadDashboard();

  const interval =
    setInterval(() => {
      loadDashboard();
    }, 5000);

  return () =>
    clearInterval(interval);
}, []);

const loadDashboard =
  async () => {
  try {
    const res = await fetch(
      "/api/dashboard/overview",
      {
        cache: "no-store",
      }
    );

    setData(
      await res.json()
    );
  } catch (error) {
    console.error(error);
  }
};
const cards = [
  {
    title: "Contacts",
    value:
      data?.contacts ?? 0,
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Conversations",
    value:
      data?.conversations ?? 0,
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    title: "Campaigns",
    value:
      data?.campaigns ?? 0,
    icon: Megaphone,
    color: "text-orange-400",
  },
  {
    title: "Unread",
    value:
      data?.unread ?? 0,
    icon: BarChart3,
    color: "text-red-400",
  },
];

  const actions = [
    {
      title: "New Contact",
      href: "/dashboard/whatsapp/contacts",
    },
    {
      title: "Inbox",
      href: "/dashboard/whatsapp/inbox",
    },
    {
      title: "Campaigns",
      href: "/dashboard/whatsapp/campaigns",
    },
    {
      title: "Analytics",
      href: "/dashboard/whatsapp/analytics",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to RISNAR WhatsApp CRM
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-white">
                    {card.value}
                  </h2>
                </div>

                <Icon
                  size={34}
                  className={card.color}
                />

              </div>
            </div>
          );
        })}

      </div>

<div className="grid gap-6 xl:grid-cols-3">
  <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <h2 className="mb-6 text-xl font-semibold text-white">
      Today's Overview
    </h2>

    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl bg-slate-800 p-4">
        <p className="text-sm text-slate-400">
          Messages Today
        </p>

        <p className="mt-2 text-3xl font-bold text-green-400">
          {data?.messagesToday ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <p className="text-sm text-slate-400">
          Unread
        </p>

        <p className="mt-2 text-3xl font-bold text-red-400">
          {data?.unread ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <p className="text-sm text-slate-400">
          New Contacts
        </p>

        <p className="mt-2 text-3xl font-bold text-blue-400">
          {data?.newContactsToday ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <p className="text-sm text-slate-400">
          Active Campaigns
        </p>

        <p className="mt-2 text-3xl font-bold text-orange-400">
          {data?.activeCampaigns ?? 0}
        </p>
      </div>
    </div>
  </div>

  <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <RecentConversations />
  </div>

  <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <CampaignPerformance />
  </div>
</div>

    </div>
  );
}