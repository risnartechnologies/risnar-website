"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  active: boolean;
  onClick: () => void;
}

/**
 * Formats the stored WhatsApp phone number for display
 * and clipboard use.
 *
 * Database value:
 *   919821205511
 *
 * Display / clipboard value:
 *   +919821205511
 *
 * IMPORTANT:
 * This does NOT modify the phone number stored in the
 * database or passed to the WhatsApp API.
 */
function formatPhone(phone: string) {
  const cleanPhone = phone.trim();

  if (cleanPhone.startsWith("+")) {
    return cleanPhone;
  }

  if (cleanPhone.startsWith("91")) {
    return `+${cleanPhone}`;
  }

  return cleanPhone;
}

export default function ChatItem({
  name,
  phone,
  lastMessage,
  lastMessageTime,
  unread,
  active,
  onClick,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const formattedPhone =
    formatPhone(phone);

  /**
   * Copy the explicitly formatted international
   * phone number to the clipboard.
   *
   * stopPropagation() prevents clicking Copy from
   * opening/selecting the conversation.
   */
  async function copyPhone(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(
        formattedPhone
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy phone number:",
        error
      );
    }
  }

  return (
    <div
      onClick={onClick}
      className={`flex w-full cursor-pointer items-start gap-4 p-4 text-left transition ${
        active
          ? "bg-slate-800"
          : "hover:bg-slate-900"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-semibold text-white">
            {name}
          </h3>

          <span className="shrink-0 text-xs text-slate-500">
            {lastMessageTime}
          </span>
        </div>

        {/*
         * Phone number and explicit clipboard action.
         *
         * Clicking Copy writes +91... directly to
         * the clipboard instead of relying on browser
         * text-selection behaviour.
         */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {formattedPhone}
          </span>

          <button
            type="button"
            onClick={copyPhone}
            className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-green-400"
            title="Copy phone number"
          >
            <Copy size={12} />

            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="mt-2 truncate text-sm text-slate-400">
          {lastMessage}
        </p>
      </div>

      {unread > 0 && !active && (
        <div className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-green-600 px-2 text-xs font-bold text-white">
          {unread}
        </div>
      )}
    </div>
  );
}