"use client";

import { useEffect, useState } from "react";

/**
 * Represents a single WhatsApp conversation shown
 * in the Recent Conversations dashboard card.
 */
interface Conversation {
  id: string;
  unreadCount: number;

  contact: {
    name: string | null;
    phone: string;
  };

  messages: {
    body: string | null;
    createdAt: string;
    direction: "INBOUND" | "OUTBOUND";
  }[];
}

/**
 * Recent Conversations
 *
 * Features preserved:
 * - Loads recent conversations from the existing API.
 * - Refreshes conversation data every 5 seconds.
 * - Cleans up the polling interval when the component unmounts.
 * - Displays contact name or phone number.
 * - Displays the latest message preview.
 * - Displays unread message count when greater than zero.
 *
 * Layout protection:
 * - `min-w-0` prevents flex/grid children from forcing
 *   the dashboard column wider than its allocated space.
 * - `overflow-hidden` prevents conversation content from
 *   visually escaping its card.
 * - `truncate` keeps long contact names and message previews
 *   inside the available width.
 * - `shrink-0` keeps the unread badge from being compressed.
 */
export default function RecentConversations() {
  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  useEffect(() => {
    loadConversations();

    const interval = setInterval(
      loadConversations,
      5000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * Fetch the latest conversations from the existing
   * dashboard API endpoint.
   */
  async function loadConversations() {
    try {
      const res = await fetch(
        "/api/dashboard/recent-conversations",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to load conversations: ${res.status}`
        );
      }

      setConversations(await res.json());
    } catch (error) {
      console.error(
        "Failed to load recent conversations:",
        error
      );
    }
  }

  return (
    <div className="min-w-0">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Conversations
      </h2>

      <div className="min-w-0 space-y-3">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="min-w-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">
                  {conversation.contact.name ??
                    conversation.contact.phone}
                </p>

                <p className="mt-1 truncate text-sm text-slate-400">
                  {conversation.messages[0]?.body ??
                    "No messages"}
                </p>
              </div>

              {conversation.unreadCount > 0 && (
                <div className="shrink-0 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}