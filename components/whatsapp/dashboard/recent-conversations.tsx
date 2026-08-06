"use client";

import {
  useEffect,
  useState,
} from "react";

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
    direction:
      | "INBOUND"
      | "OUTBOUND";
  }[];
}

export default function RecentConversations() {
  const [
    conversations,
    setConversations,
  ] = useState<
    Conversation[]
  >([]);

  useEffect(() => {
    loadConversations();

    const interval =
      setInterval(
        loadConversations,
        5000
      );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadConversations() {
    try {
      const res =
        await fetch(
          "/api/dashboard/recent-conversations",
          {
            cache:
              "no-store",
          }
        );

      setConversations(
        await res.json()
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Conversations
      </h2>

      <div className="space-y-3">

        {conversations.map(
          (
            conversation
          ) => (
            <div
              key={
                conversation.id
              }
              className="rounded-xl border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold text-white">
                    {conversation
                      .contact
                      .name ??
                      conversation
                        .contact
                        .phone}
                  </p>

                  <p className="mt-1 truncate text-sm text-slate-400">
                    {conversation
                      .messages[0]
                      ?.body ??
                      "No messages"}
                  </p>

                </div>

                {conversation.unreadCount >
                  0 && (
                  <div className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                    {
                      conversation.unreadCount
                    }
                  </div>
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}