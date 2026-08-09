"use client";

import { useEffect, useState } from "react";

import CampaignTable, {
  Campaign,
} from "@/components/whatsapp/campaigns/campaign-table";

import CampaignSearch from "@/components/whatsapp/campaigns/campaign-search";
import CampaignFilter from "@/components/whatsapp/campaigns/campaign-filter";
import CampaignDetailsModal from "@/components/whatsapp/campaigns/campaign-details-modal";

export default function CampaignsPage() {

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {

    const res =
      await fetch("/api/campaigns");

    const data =
      await res.json();

    setCampaigns(data);

  }

  const filtered =
    campaigns.filter((campaign) => {

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

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Campaigns
        </h1>

        <p className="mt-2 text-slate-400">
          View campaign history, delivery status and performance.
        </p>

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
        onRowClick={(campaign) => {

          setSelectedCampaign(
            campaign
          );

          setDetailsOpen(true);

        }}
      />

      <CampaignDetailsModal
        open={detailsOpen}
        campaign={selectedCampaign}
        onClose={() =>
          setDetailsOpen(false)
        }
      />

    </div>

  );

}