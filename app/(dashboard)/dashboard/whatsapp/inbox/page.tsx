"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ChatList, {
  Chat,
} from "@/components/whatsapp/inbox/chat-list";

import ChatWindow, {
  Message,
} from "@/components/whatsapp/inbox/chat-window";

interface Conversation {
  id: string;

  unreadCount: number;

  contact: {
    id: string;
    name: string | null;
    phone: string;
  };

  messages: {
    body: string | null;
    createdAt: string;
  }[];
}

export default function InboxPage() {
  const [chats, setChats] =
    useState<Chat[]>([]);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);
  
  const requestId = useRef(0);

useEffect(() => {
  loadConversations();
}, []);

useEffect(() => {
  if (!selectedId) {
    setMessages([]);
    return;
  }

  loadMessages(selectedId);

  const interval = setInterval(() => {
    loadMessages(selectedId);
  }, 2000);

  return () => clearInterval(interval);
}, [selectedId]);

  /**
   * Load all conversations.
   */
  async function loadConversations() {
    try {
      const currentRequest =
        ++requestId.current;

      const res = await fetch(
        "/api/conversations",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to load conversations."
        );
      }

      const data: Conversation[] =
        await res.json();

        console.clear();

        console.log(
          "API returned",
          data.length,
          "conversations"
        );

        console.table(
          data.map((c) => ({
            id: c.id,
            name: c.contact?.name,
          }))
        );

      if (
        currentRequest !==
        requestId.current
      ) {
        return;
      }

      const mapped: Chat[] = data.map(
        (conversation) => ({
          id: conversation.id,

          name:
            conversation.contact?.name ??
            "Unknown",

          phone:
            conversation.contact?.phone ??
            "",

          lastMessage:
            conversation.messages?.[0]
              ?.body ??
            "No messages",

          lastMessageTime:
            conversation.messages?.[0]
              ?.createdAt
              ? new Date(
                  conversation.messages[0]
                    .createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",

          unread:
          conversation.unreadCount,
        })
      );

      setChats(mapped);

      console.log(
          "Mapped chats:",
          mapped.length
        );

        console.table(mapped);

      setSelectedId((current) => {
        // Keep the currently selected conversation if it still exists.
        if (
          current &&
          mapped.some(
            (chat) => chat.id === current
          )
        ) {
          return current;
        }

        // Select the first conversation only on the initial load
        // or if the previously selected conversation was deleted.
        return mapped.length > 0
          ? mapped[0].id
          : null;
      });
    } catch (error) {
      console.error(error);

      setChats([]);
    }
  }

  /**
   * Load messages for selected conversation.
   */
async function loadMessages(
  conversationId: string
) {
  try {
    const res = await fetch(
      `/api/conversations/${conversationId}/messages`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to load messages."
      );
    }

    const data = await res.json();

    const mapped: Message[] =
      data.map(
        (
          message: {
            id: string;
            body: string | null;
            direction:
              | "INBOUND"
              | "OUTBOUND";
            createdAt: string;
          }
        ) => ({
          id: message.id,

          body:
            message.body ?? "",

          createdAt: new Date(
            message.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),

          outgoing:
            message.direction ===
            "OUTBOUND",
        })
      );

    console.log(
      "Loaded Messages:",
      mapped
    );

    setMessages(mapped);

    loadConversations();
  } catch (error) {
    console.error(
      "Failed to load messages:",
      error
    );

    setMessages([]);
  }
}

  const selectedChat =
    chats.find(
      (chat) =>
        chat.id === selectedId
    ) ?? null;

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

      <div className="grid h-full grid-cols-[380px_1fr]">

        <div className="flex h-full flex-col border-r border-slate-800 min-h-0">

      <ChatList
        chats={chats}
        selectedId={selectedId}
        onSelect={async (id) => {
          setSelectedId(id);

          // Update UI immediately.
          setChats((previous) =>
            previous.map((chat) =>
              chat.id === id
                ? {
                    ...chat,
                    unread: 0,
                  }
                : chat
            )
          );

          try {
            await fetch(
              `/api/conversations/${id}/read`,
              {
                method: "POST",
              }
            );

            await loadConversations();
          } catch (error) {
            console.error(error);
          }
        }}
      />

        </div>

        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          onSend={() => {}}
        />

      </div>

    </div>
  );
}