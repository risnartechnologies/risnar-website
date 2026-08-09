"use client";

import { X } from "lucide-react";
import CampaignStatusBadge from "./campaign-status-badge";

interface Recipient {
  id: string;
  status: string;
  sentAt: string | null;
  failedAt: string | null;
  errorMessage: string | null;
  contact: {
    name: string | null;
    phone: string;
  };
}

interface Campaign {
  id: string;
  name: string;
  templateName: string;
  status: string;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  createdAt?: string;
  recipients: Recipient[];
}

interface Props {
  open: boolean;
  campaign: Campaign | null;
  onClose: () => void;
}

export default function CampaignDetailsModal({
  open,
  campaign,
  onClose,
}: Props) {

  if (!open || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              {campaign.name}
            </h2>

            <p className="mt-2 text-slate-400">
              {campaign.templateName}
            </p>

          </div>

          <button onClick={onClose}>
            <X className="text-slate-400" />
          </button>

        </div>

        <div className="grid grid-cols-4 gap-6 border-b border-slate-800 p-8">

          <div className="rounded-xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Recipients
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {campaign.totalRecipients}
            </p>

          </div>

          <div className="rounded-xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Delivered
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {campaign.sentCount}
            </p>

          </div>

          <div className="rounded-xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Failed
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {campaign.failedCount}
            </p>

          </div>

          <div className="rounded-xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Status
            </p>

            <div className="mt-3">

              <CampaignStatusBadge
                status={campaign.status}
              />

            </div>

          </div>

        </div>

        <div className="max-h-[420px] overflow-y-auto">

          <table className="w-full">

            <thead className="sticky top-0 bg-slate-950">

              <tr className="text-left text-slate-400">

                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Sent
                </th>

                <th className="px-6 py-4">
                  Error
                </th>

              </tr>

            </thead>

            <tbody>

              {campaign.recipients.map((recipient) => (

                <tr
                  key={recipient.id}
                  className="border-t border-slate-800"
                >

                  <td className="px-6 py-4 text-white">
                    {recipient.contact.name ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {recipient.contact.phone}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={
                        recipient.status === "SENT"
                          ? "font-semibold text-green-400"
                          : recipient.status === "FAILED"
                          ? "font-semibold text-red-400"
                          : "font-semibold text-yellow-400"
                      }
                    >
                      {recipient.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-slate-300">

                    {recipient.sentAt
                      ? new Date(
                          recipient.sentAt
                        ).toLocaleString()
                      : "-"}

                  </td>

                  <td className="max-w-xs truncate px-6 py-4 text-red-400">

                    {recipient.errorMessage ?? "-"}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}