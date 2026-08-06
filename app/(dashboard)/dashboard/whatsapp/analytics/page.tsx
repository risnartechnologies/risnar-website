"use client";

import {
  useEffect,
  useState,
} from "react";

interface Analytics {
  contacts: number;
  conversations: number;
  messages: number;
  unreadConversations: number;
  campaigns: number;
  todayMessages: number;
}

export default function AnalyticsPage() {
  const [stats, setStats] =
    useState<Analytics | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const res = await fetch(
        "/api/analytics/overview",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  const cards = [
    {
      title: "Contacts",
      value: stats?.contacts ?? 0,
    },
    {
      title: "Conversations",
      value:
        stats?.conversations ?? 0,
    },
    {
      title: "Messages",
      value: stats?.messages ?? 0,
    },
    {
      title: "Today's Messages",
      value:
        stats?.todayMessages ?? 0,
    },
    {
      title: "Unread",
      value:
        stats?.unreadConversations ??
        0,
    },
    {
      title: "Campaigns",
      value:
        stats?.campaigns ?? 0,
    },
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor your WhatsApp CRM
          performance.
        </p>

      </div>

      <div className="grid grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
              {card.value}
            </h2>
          </div>
        ))}

      </div>

    </div>
  );
}