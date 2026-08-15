"use client";
import {
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";

import DarkSelect from "@/components/ui/dark-select";

interface Props {
  open: boolean;
  selectedContacts: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCampaignModal({
  open,
  selectedContacts,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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

        console.log("Templates API Response:", data);

        setTemplates(
          data.data ?? []
        );

        console.log("Templates State:", data.data ?? []);
    } catch (error) {
      console.error(error);
    }
  }

  loadTemplates();
}, [open]);
  console.log("Templates Render:", templates);
  if (!open) return null;

async function saveCampaign() {
  setLoading(true);
  setErrorMessage("");

  try {
    // ---------------------------------------
    // CREATE CAMPAIGN
    // ---------------------------------------

    const response = await fetch(
      "/api/campaigns",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...form,
          contacts:
            selectedContacts,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      setErrorMessage(
        data?.message ??
          data?.error ??
          "Unable to create campaign."
      );

      setLoading(false);
      return;
    }

    const campaignId =
      data?.campaign?.id;

    if (!campaignId) {
      console.error(
        "Campaign ID missing:",
        data
      );

      setErrorMessage(
        "Campaign was created, but could not be started."
      );

      setLoading(false);
      return;
    }

    console.log(
      "=== CAMPAIGN CREATED ===",
      {
        campaignId,
      }
    );

    // ---------------------------------------
    // START CAMPAIGN WORKFLOW
    // ---------------------------------------

    const startResponse =
      await fetch(
        `/api/campaigns/${campaignId}/start`,
        {
          method: "POST",
        }
      );

    const startData =
      await startResponse.json();

    if (!startResponse.ok) {
      console.error(
        "Campaign start failed:",
        startData
      );

      setErrorMessage(
        startData?.message ??
          "Campaign was created but could not be started."
      );

      setLoading(false);
      return;
    }

    console.log(
      "=== CAMPAIGN WORKFLOW STARTED ===",
      {
        campaignId,
        runId:
          startData?.runId ??
          null,
      }
    );

    // ---------------------------------------
    // RESET FORM
    // ---------------------------------------

    setForm({
      name: "",
      description: "",
      templateName: "",
      status: "DRAFT",
    });

    setLoading(false);

    // ---------------------------------------
    // REFRESH CAMPAIGN LIST
    // ---------------------------------------

    onSuccess();

    // ---------------------------------------
    // CLOSE MODAL
    // ---------------------------------------

    onClose();
  } catch (error) {
    console.error(
      "Create campaign failed:",
      error
    );

    setLoading(false);

    setErrorMessage(
      "Unable to create campaign."
    );
  }
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

        </div>

        <div className="mt-8 flex items-center justify-between">

          <div className="min-h-[24px]">
            {errorMessage && (
              <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex gap-4">

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-6 py-3 text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveCampaign}
              disabled={loading}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Create Campaign"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}