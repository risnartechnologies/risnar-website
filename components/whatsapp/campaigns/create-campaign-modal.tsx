"use client";

import DateTimePicker from "@/components/ui/date-time-picker";
import {
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";

import DarkSelect from "@/components/ui/dark-select";

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

  const [templates, setTemplates] =
  useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

const [form, setForm] = useState({
  name: "",
  description: "",
  templateName: "",
  status: "DRAFT",

  audience: "ALL",

  scheduledAt: "",
});

useEffect(() => {
  if (!open) return;

  async function loadTemplates() {
    try {
      const res = await fetch(
        "/api/templates"
      );

      const data =
        await res.json();

      setTemplates(
      data.data ?? []
    );
    } catch (error) {
      console.error(error);
    }
  }

  loadTemplates();
}, [open]);

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
      status: "DRAFT",

      audience: "ALL",

      scheduledAt: "",
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

          <DarkSelect
            value={form.templateName}
            onChange={(value) =>
              setForm({
                ...form,
                templateName: value,
              })
            }
            placeholder="Select WhatsApp Template"
            options={templates.map(
              (template) => ({
                label: template.name,
                value: template.name,
              })
            )}
          />

        <DarkSelect
          value={form.audience}
          onChange={(value) =>
            setForm({
              ...form,
              audience: value,
            })
          }
          placeholder="Select Audience"
          options={[
            {
              label: "All Contacts",
              value: "ALL",
            },
            {
              label: "Active Contacts",
              value: "ACTIVE",
            },
            {
              label: "Inactive Contacts",
              value: "INACTIVE",
            },
            {
              label: "By Tag (Coming Soon)",
              value: "TAG",
            },
          ]}
        />

        <DateTimePicker
          value={form.scheduledAt}
          onChange={(value) =>
            setForm({
              ...form,
              scheduledAt: value,
            })
          }
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

          <DarkSelect
            value={form.status}
            onChange={(value) =>
              setForm({
                ...form,
                status: value,
              })
            }
            placeholder="Select Status"
            options={[
              {
                label: "Draft",
                value: "DRAFT",
              },
              {
                label: "Scheduled",
                value: "SCHEDULED",
              },
              {
                label: "Running",
                value: "RUNNING",
              },
              {
                label: "Completed",
                value: "COMPLETED",
              },
              {
                label: "Paused",
                value: "PAUSED",
              },
              {
                label: "Cancelled",
                value: "CANCELLED",
              },
            ]}
          />

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