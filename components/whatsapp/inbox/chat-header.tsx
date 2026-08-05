"use client";

import { useState } from "react";

import {
  Phone,
  Video,
  MoreVertical,
  Trash2,
  Eraser,
} from "lucide-react";

interface Props {
  id: string;
  name: string;
  phone: string;
  onRefresh: () => void;
}

export default function ChatHeader({
  id,
  name,
  phone,
  onRefresh,
}: Props) {
  const [open, setOpen] =
    useState(false);

  async function clearChat() {
    if (
      !confirm(
        "Clear all messages from this conversation?"
      )
    ) {
      return;
    }

    await fetch(
      `/api/conversations/${id}/clear`,
      {
        method: "DELETE",
      }
    );

    setOpen(false);

    onRefresh();
  }

  async function deleteChat() {
    if (
      !confirm(
        "Delete this conversation permanently?"
      )
    ) {
      return;
    }

    await fetch(
      `/api/conversations/${id}/delete`,
      {
        method: "DELETE",
      }
    );

    setOpen(false);

    onRefresh();
  }

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

      <div className="relative flex items-center gap-2">

        <button className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white">
          <Phone size={18} />
        </button>

        <button className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white">
          <Video size={18} />
        </button>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white"
        >
          <MoreVertical size={18} />
        </button>

        {open && (
          <div className="absolute right-0 top-16 z-50 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

            <button
              onClick={clearChat}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-200 transition hover:bg-slate-800"
            >
              <Eraser
                size={16}
              />

              Clear Chat
            </button>

            <button
              onClick={deleteChat}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-slate-800"
            >
              <Trash2
                size={16}
              />

              Delete Chat
            </button>

          </div>
        )}

      </div>

    </div>
  );
}