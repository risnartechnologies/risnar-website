import CampaignStatusBadge from "./campaign-status-badge";

interface Props {
  name: string;
  template: string;
  recipients: number;
  sent: number;
  status: string;
}

export default function CampaignCard({
  name,
  template,
  recipients,
  sent,
  status,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-green-500">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold text-white">
            {name}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {template}
          </p>

        </div>

        <CampaignStatusBadge status={status} />

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-slate-400">
            Recipients
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {recipients}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Sent
          </p>

          <p className="mt-2 text-3xl font-bold text-green-400">
            {sent}
          </p>

        </div>

      </div>

    </div>
  );
}