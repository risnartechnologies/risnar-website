"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCampaignModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    templateName: "",
    status: "DRAFT",
  });

  if (!open) return null;

  async function saveCampaign() {
    setLoading(true);

    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Unable to create campaign.");
      return;
    }

    setForm({
      name: "",
      description: "",
      templateName: "",
      status: "Draft",
    });

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Create Campaign
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400" />
          </button>

        </div>

        <div className="space-y-5">

          <input
            placeholder="Campaign Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-500"
          />

          <input
            placeholder="Template Name"
            value={form.templateName}
            onChange={(e) =>
              setForm({
                ...form,
                templateName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-500"
          />

          <textarea
            rows={5}
            placeholder="Campaign Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-green-500"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="RUNNING">Running</option>
            <option value="COMPLETED">Completed</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={saveCampaign}
            disabled={loading}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            {loading ? "Saving..." : "Create Campaign"}
          </button>

        </div>

      </div>

    </div>
  );
}