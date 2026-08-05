import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>

      <p className="text-slate-400">{title}</p>
      <h2 className="mt-2 text-4xl font-bold text-white">{value}</h2>
    </div>
  );
}