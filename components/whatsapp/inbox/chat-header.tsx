"use client";

import {
  MoreVertical,
  Trash2,
  Eraser,
  ArrowLeft,
  Copy,
} from "lucide-react";

import { useState } from "react";

interface Props {
  id: string;
  name: string;
  phone: string;
  onRefresh: () => void;
  onBack: () => void;
}

function formatPhone(phone: string) {
  if (phone.startsWith("+")) {
    return phone;
  }

  if (phone.startsWith("91")) {
    return `+${phone}`;
  }

  return phone;
}

export default function ChatHeader({
  id,
  name,
  phone,
  onRefresh,
  onBack,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const formattedPhone =
    formatPhone(phone);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(
        formattedPhone
      );

      alert("Phone number copied");
    } catch (error) {
      console.error(
        "Failed to copy phone number:",
        error
      );
    }
  }

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

      <div className="flex min-w-0 items-center gap-3">

        <button
          type="button"
          onClick={onBack}
          className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">

          <h2 className="truncate font-semibold text-white">
            {name}
          </h2>

          <div className="flex items-center gap-2">

            <p className="text-sm text-slate-400">
              {formattedPhone}
            </p>

            <button
              type="button"
              onClick={copyPhone}
              className="flex shrink-0 items-center gap-1 text-xs text-slate-500 transition hover:text-white"
              aria-label="Copy phone number"
              title="Copy phone number"
            >
              <Copy size={14} />
              <span>Copy</span>
            </button>

          </div>

        </div>

      </div>

      <div className="relative flex items-center gap-2">

        <button
          type="button"
          onClick={() =>
            setOpen(!open)
          }
          className="rounded-xl border border-slate-700 p-3 text-slate-300 transition hover:border-green-500 hover:text-white"
          aria-label="More options"
        >
          <MoreVertical size={18} />
        </button>

        {open && (
          <div className="absolute right-0 top-16 z-50 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

            <button
              type="button"
              onClick={clearChat}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-200 transition hover:bg-slate-800"
            >
              <Eraser size={16} />

              Clear Chat
            </button>

            <button
              type="button"
              onClick={deleteChat}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-slate-800"
            >
              <Trash2 size={16} />

              Delete Chat
            </button>

          </div>
        )}

      </div>

    </div>
  );
}