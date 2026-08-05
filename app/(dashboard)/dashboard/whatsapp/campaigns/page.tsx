"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CampaignTable, {
  Campaign,
} from "@/components/whatsapp/campaigns/campaign-table";

import CampaignSearch from "@/components/whatsapp/campaigns/campaign-search";
import CampaignFilter from "@/components/whatsapp/campaigns/campaign-filter";
import CreateCampaignModal from "@/components/whatsapp/campaigns/create-campaign-modal";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    const res = await fetch("/api/campaigns");
    const data = await res.json();
    setCampaigns(data);
  }

  const filtered = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      campaign.templateName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      campaign.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Campaigns
          </h1>

          <p className="mt-2 text-slate-400">
            Create and manage WhatsApp campaigns.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
        >
          <Plus size={18} />
          Create Campaign
        </button>

      </div>

      <div className="flex flex-wrap gap-4">

        <CampaignSearch
          value={search}
          onChange={setSearch}
        />

        <CampaignFilter
          value={status}
          onChange={setStatus}
        />

      </div>

      <CampaignTable
        campaigns={filtered}
      />

      <CreateCampaignModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadCampaigns}
      />

    </div>
  );
}