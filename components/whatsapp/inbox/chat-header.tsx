import { Phone, Video, MoreVertical } from "lucide-react";

interface Props {
  name: string;
  phone: string;
}

export default function ChatHeader({
  name,
  phone,
}: Props) {
  return (
    <div className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>

          <h2 className="font-semibold text-white">
            {name}
          </h2>

          <p className="text-sm text-slate-400">
            {phone}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-2">

        <button className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white">
          <Phone size={18} />
        </button>

        <button className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white">
          <Video size={18} />
        </button>

        <button className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white">
          <MoreVertical size={18} />
        </button>

      </div>

    </div>
  );
}