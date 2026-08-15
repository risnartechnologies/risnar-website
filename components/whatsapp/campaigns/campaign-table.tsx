"use client";

import { useState } from "react";
import { Download } from "lucide-react";
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

function downloadSelectedCsv() {
  const selectedCampaigns =
    campaigns.filter((campaign) =>
      selected.includes(campaign.id)
    );

  const escapeCsv = (value: unknown) => {
    const text =
      value === null ||
      value === undefined
        ? ""
        : String(value);

    return `"${text.replace(/"/g, '""')}"`;
  };

  const lines: string[] = [];

  selectedCampaigns.forEach(
    (campaign, campaignIndex) => {
      /*
       * =====================================================
       * CAMPAIGN SUMMARY
       * =====================================================
       */

      lines.push(
        [
          "Campaign",
          campaign.name,
        ]
          .map(escapeCsv)
          .join(",")
      );

      lines.push(
        [
          "Template",
          campaign.templateName,
        ]
          .map(escapeCsv)
          .join(",")
      );

      lines.push(
        [
          "Recipients",
          campaign.totalRecipients,
        ]
          .map(escapeCsv)
          .join(",")
      );

      lines.push(
        [
          "Delivered",
          campaign.deliveredCount,
        ]
          .map(escapeCsv)
          .join(",")
      );

      lines.push(
        [
          "Failed",
          campaign.failedCount,
        ]
          .map(escapeCsv)
          .join(",")
      );

      lines.push(
        [
          "Status",
          campaign.status,
        ]
          .map(escapeCsv)
          .join(",")
      );

      /*
       * =====================================================
       * RECIPIENT REPORT
       * =====================================================
       */

      lines.push("");

      lines.push(
        [
          "Recipient Name",
          "Phone",
          "Status",
        ]
          .map(escapeCsv)
          .join(",")
      );

      campaign.recipients.forEach(
        (recipient: any) => {
          lines.push(
            [
              recipient.contact?.name ?? "",
              recipient.contact?.phone ?? "",
              recipient.status ?? "",
            ]
              .map(escapeCsv)
              .join(",")
          );
        }
      );

      /*
       * Separate multiple selected campaigns.
       */

      if (
        campaignIndex <
        selectedCampaigns.length - 1
      ) {
        lines.push("");
        lines.push("");
      }
    }
  );

  const csv = lines.join("\r\n");

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  const filename =
    selectedCampaigns.length === 1
      ? `campaign-${selectedCampaigns[0].name
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase()}-report.csv`
      : `campaign-report-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

  return (
    <div className="space-y-4">

      {selected.length > 0 && (
        <div className="flex justify-end gap-3">

          <button
            onClick={downloadSelectedCsv}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
          >
            <Download size={18} />
            Download CSV
          </button>

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