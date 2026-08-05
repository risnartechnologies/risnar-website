interface Props {
  status: string;
}

const styles: Record<
  string,
  string
> = {
  Draft:
    "bg-slate-700 text-slate-200 border-slate-600",

  Scheduled:
    "bg-blue-900/40 text-blue-400 border-blue-700",

  Running:
    "bg-yellow-900/40 text-yellow-400 border-yellow-700",

  Completed:
    "bg-green-900/40 text-green-400 border-green-700",

  Failed:
    "bg-red-900/40 text-red-400 border-red-700",
};

export default function CampaignStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] ??
        "bg-slate-700 text-slate-300 border-slate-600"
      }`}
    >
      {status}
    </span>
  );
}