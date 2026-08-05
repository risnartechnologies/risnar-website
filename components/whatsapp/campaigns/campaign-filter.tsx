"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  "All",
  "Draft",
  "Scheduled",
  "Running",
  "Completed",
  "Failed",
];

export default function CampaignFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
    >
      {statuses.map((status) => (
        <option
          key={status}
          value={status}
        >
          {status}
        </option>
      ))}
    </select>
  );
}