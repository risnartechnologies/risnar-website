import CampaignStatusBadge from "./campaign-status-badge";

export interface Campaign {
  id: string;
  name: string;
  templateName: string;
  totalRecipients: number;
  sentCount: number;
  status: string;
}

interface Props {
  campaigns: Campaign[];
}

export default function CampaignTable({
  campaigns,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <table className="w-full">

        <thead className="border-b border-slate-800 bg-slate-950">

          <tr className="text-left text-sm font-semibold text-slate-400">

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
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {campaigns.length === 0 && (
            <tr>

              <td
                colSpan={5}
                className="py-20 text-center text-slate-500"
              >
                No campaigns found.
              </td>

            </tr>
          )}

          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >

              <td className="px-6 py-4 font-medium text-white">
                {campaign.name}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {campaign.templateName}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {campaign.totalRecipients}
              </td>

              <td className="px-6 py-4 text-green-400">
                {campaign.sentCount}
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
  );
}