"use client";

import {
  useEffect,
  useState,
} from "react";

interface CampaignSummary {
  total: number;
  draft: number;
  scheduled: number;
  running: number;
  completed: number;
  paused: number;
  cancelled: number;
}

export default function CampaignPerformance() {
  const [summary, setSummary] =
    useState<CampaignSummary | null>(
      null
    );

  useEffect(() => {
    loadSummary();

    const interval =
      setInterval(
        loadSummary,
        5000
      );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadSummary() {
    try {
      const res = await fetch(
        "/api/dashboard/campaign-summary",
        {
          cache: "no-store",
        }
      );

      setSummary(
        await res.json()
      );
    } catch (error) {
      console.error(error);
    }
  }

const items = [
  {
    label: "Total",
    value: summary?.total ?? 0,
    color: "text-white",
  },
  {
    label: "Draft",
    value: summary?.draft ?? 0,
    color: "text-slate-400",
  },
  {
    label: "Scheduled",
    value: summary?.scheduled ?? 0,
    color: "text-blue-400",
  },
  {
    label: "Running",
    value: summary?.running ?? 0,
    color: "text-green-400",
  },
  {
    label: "Completed",
    value: summary?.completed ?? 0,
    color: "text-emerald-400",
  },
];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Campaign Summary
      </h2>

      <div className="flex h-full flex-col justify-between">

        <div className="space-y-4">

        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
          >
            <span className="text-slate-300">
              {item.label}
            </span>

            <span
              className={`text-xl font-bold ${item.color}`}
            >
              {item.value}
            </span>
          </div>
        ))}

        </div>

            <a
            href="/dashboard/whatsapp/campaigns"
            className="mt-6 inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300"
            >
            View All →
            </a>

      </div>

    </div>
  );
}