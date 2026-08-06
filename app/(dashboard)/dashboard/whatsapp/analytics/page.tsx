"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface Analytics {
  contacts: number;
  conversations: number;
  messages: number;
  unreadConversations: number;
  campaigns: number;
  todayMessages: number;
}

interface Trend {
  date: string;
  messages: number;
}

interface TopContact {
  id: string;
  name: string;
  phone: string;
  messages: number;
}

interface Activity {
  id: string;
  name: string;
  phone: string;
  body: string;
  direction: "INBOUND" | "OUTBOUND";
  time: string;
}

export default function AnalyticsPage() {
  const [stats, setStats] =
    useState<Analytics | null>(null);

  const [trend, setTrend] =
    useState<Trend[]>([]);

  const [range, setRange] =
    useState("30d");

  const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");

  const [direction, setDirection] =
    useState<any[]>([]);

  const [status, setStatus] =
    useState<any[]>([]);

  const [topContacts, setTopContacts] =
    useState<TopContact[]>([]);

  const [activities, setActivities] =
    useState<Activity[]>([]);

  useEffect(() => {
    loadAnalytics();
    loadTrend("30d");
    loadDirection();
    loadStatus();
    loadTopContacts();
    loadRecentActivity();
  }, []);

  async function loadAnalytics() {
    const res = await fetch(
      "/api/analytics/overview",
      { cache: "no-store" }
    );

    setStats(await res.json());
  }

async function loadTrend(
  selectedRange: string
) {
  let url =
    `/api/analytics/message-trend?range=${selectedRange}`;

  if (
    selectedRange === "custom" &&
    fromDate &&
    toDate
  ) {
    url =
      `/api/analytics/message-trend?range=custom&from=${fromDate}&to=${toDate}`;
  }

  const res = await fetch(
    url,
    {
      cache: "no-store",
    }
  );

  setTrend(
    await res.json()
  );
}

  async function loadDirection() {
    const res = await fetch(
      "/api/analytics/direction",
      { cache: "no-store" }
    );

    setDirection(await res.json());
  }

  async function loadStatus() {
    const res = await fetch(
      "/api/analytics/status",
      { cache: "no-store" }
    );

    setStatus(await res.json());
  }

  async function loadTopContacts() {
    const res = await fetch(
      "/api/analytics/top-contacts",
      { cache: "no-store" }
    );

    setTopContacts(await res.json());
  }

  async function loadRecentActivity() {
    const res = await fetch(
      "/api/analytics/recent-activity",
      { cache: "no-store" }
    );

    setActivities(await res.json());
  }

  const cards = [
    {
      title: "Contacts",
      value: stats?.contacts ?? 0,
    },
    {
      title: "Conversations",
      value: stats?.conversations ?? 0,
    },
    {
      title: "Messages",
      value: stats?.messages ?? 0,
    },
    {
      title: "Today's Messages",
      value: stats?.todayMessages ?? 0,
    },
    {
      title: "Unread",
      value:
        stats?.unreadConversations ??
        0,
    },
    {
      title: "Campaigns",
      value: stats?.campaigns ?? 0,
    },
  ];

  const rangeTitle = {
  "24h": "Last 24 Hours",
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "12m": "Last 12 Months",
};

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor your WhatsApp CRM performance.
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

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-white">
          Message Trend (
          {
            rangeTitle[
              range as keyof typeof rangeTitle
            ]
          }
          )
        </h2>

          <div className="flex flex-wrap gap-2">

            {[
              ["24H","24h"],
              ["7D","7d"],
              ["30D","30d"],
              ["90D","90d"],
              ["12M","12m"],
            ].map(([label,value]) => (

              <button
                key={value}
                onClick={()=>{
                  setRange(value);
                  loadTrend(value);
                }}
                className={`rounded-lg px-3 py-2 text-sm ${
                  range===value
                    ? "bg-green-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

        </div>

        <div className="flex items-center gap-2">

  <input
    type="date"
    value={fromDate}
    onChange={(e) =>
      setFromDate(
        e.target.value
      )
    }
    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) =>
      setToDate(
        e.target.value
      )
    }
    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
  />

  <button
    onClick={() => {
      setRange("custom");
      loadTrend("custom");
    }}
    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
  >
    Apply
  </button>

</div>

        <div className="h-[380px]">

          <ResponsiveContainer>

            <LineChart data={trend}>

              <CartesianGrid stroke="#334155" strokeDasharray="3 3"/>

              <XAxis
                dataKey="date"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 12,
                }}
                labelStyle={{
                  color: "#ffffff",
                }}
                itemStyle={{
                  color: "#22c55e",
                }}
              />

              <Line
                type="monotone"
                dataKey="messages"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{
                  r: 4,
                  fill: "#22c55e",
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

            <div className="grid grid-cols-2 gap-6">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-xl font-semibold text-white">
            Incoming vs Outgoing
          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer
                width="100%"
                height="100%"
              >

              <PieChart>

                <Pie
                  data={direction}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  <Cell fill="#22c55e" />

                  <Cell fill="#3b82f6" />

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-xl font-semibold text-white">
            Delivery Status
          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <BarChart data={status}>

                <CartesianGrid stroke="#334155" />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-xl font-semibold text-white">
            Top Active Contacts
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800 text-left text-slate-400">

                <th className="pb-3">
                  Contact
                </th>

                <th className="pb-3">
                  Phone
                </th>

                <th className="pb-3 text-right">
                  Messages
                </th>

              </tr>

            </thead>

            <tbody>

              {topContacts.map(
                (contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-slate-800"
                  >

                    <td className="py-4 text-white">
                      {contact.name}
                    </td>

                    <td className="text-slate-400">
                      {contact.phone}
                    </td>

                    <td className="text-right font-semibold text-green-400">
                      {contact.messages}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-xl font-semibold text-white">
            Recent Activity
          </h2>

          <div className="space-y-4 max-h-[420px] overflow-y-auto">

            {activities.map(
              (activity) => (
                <div
                  key={activity.id}
                  className="rounded-xl border border-slate-800 p-4"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-white">
                      {activity.name}
                    </span>

                    <span
                      className={`text-xs ${
                        activity.direction === "INBOUND"
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    >
                      {activity.direction}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {activity.body || "(No message text)"}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(
                      activity.time
                    ).toLocaleString()}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}