"use client";

import { useState } from "react";
import CampaignStatusBadge from "./campaign-status-badge";

export interface Campaign {
  id: string;
  name: string;
  templateName: string;
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  respondedCount: number;
  failedCount: number;
  status: string;
  recipients: any[];
}

interface Props {
  campaigns: Campaign[];
  onRowClick: (campaign: Campaign) => void;
}

export default function CampaignTable({
  campaigns,
  onRowClick,
}: Props) {
  const [selected, setSelected] =
    useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function toggleAll() {
    if (
      selected.length === campaigns.length
    ) {
      setSelected([]);
    } else {
      setSelected(
        campaigns.map(
          (campaign) => campaign.id
        )
      );
    }
  }

  async function deleteSelected() {
    if (
      !confirm(
        `Delete ${selected.length} campaign(s)?`
      )
    ) {
      return;
    }

    await fetch(
      "/api/campaigns/delete",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ids: selected,
        }),
      }
    );

    window.location.reload();
  }

  return (
    <div className="space-y-4">

      {selected.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={deleteSelected}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"
          >
            Delete ({selected.length})
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr className="text-left text-sm font-semibold text-slate-400">

              <th className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={
                    campaigns.length > 0 &&
                    selected.length ===
                      campaigns.length
                  }
                  onChange={toggleAll}
                />
              </th>

              <th className="px-6 py-4">
                Campaign
              </th>

              <th className="px-6 py-4">
                Template
              </th>

              <th className="px-6 py-4">
                Recipients
              </th>

              <th className="px-6 py-4">
                Sent
              </th>

              <th className="px-6 py-4">
                Delivered
              </th>

              <th className="px-6 py-4">
                Responded
              </th>

              <th className="px-6 py-4">
                Failed
              </th>

              <th className="px-6 py-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {campaigns.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="py-20 text-center text-slate-500"
                >
                  No campaigns found.
                </td>
              </tr>
            )}

            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                onClick={() =>
                  onRowClick(campaign)
                }
                className="cursor-pointer border-t border-slate-800 hover:bg-slate-800/40"
              >

                <td
                  className="px-4 py-4"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(
                      campaign.id
                    )}
                    onChange={() =>
                      toggle(
                        campaign.id
                      )
                    }
                  />
                </td>

                <td className="px-6 py-4 font-medium text-white">
                  {campaign.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {campaign.templateName}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {campaign.totalRecipients}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {campaign.sentCount}
                </td>

                <td className="px-6 py-4 text-green-400">
                  {campaign.deliveredCount}
                </td>

                <td className="px-6 py-4 text-blue-400">
                  {campaign.respondedCount}
                </td>

                <td className="px-6 py-4 text-red-400">
                  {campaign.failedCount}
                </td>

                <td className="px-6 py-4">
                  <CampaignStatusBadge
                    status={campaign.status}
                  />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}