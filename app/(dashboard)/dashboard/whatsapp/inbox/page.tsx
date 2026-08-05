"use client";

import { useEffect, useState } from "react";

import ChatList, {
  Chat,
} from "@/components/whatsapp/inbox/chat-list";

import ChatWindow, {
  Message,
} from "@/components/whatsapp/inbox/chat-window";

interface Conversation {
  id: string;
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
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages] = useState<Message[]>([]);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    const res = await fetch("/api/conversations");
    const data: Conversation[] = await res.json();

    const mapped: Chat[] = data.map((conversation) => ({
      id: conversation.id,
      name: conversation.contact.name ?? "Unknown",
      phone: conversation.contact.phone,
      lastMessage:
        conversation.messages[0]?.body ?? "No messages",
      lastMessageTime:
        conversation.messages[0]
          ? new Date(
              conversation.messages[0].createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      unread: 0,
    }));

    setChats(mapped);

    if (mapped.length > 0) {
      setSelectedId(mapped[0].id);
    }
  }

  const selectedChat =
    chats.find((chat) => chat.id === selectedId) ?? null;

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

      <div className="grid h-full grid-cols-[380px_1fr]">

        <div className="border-r border-slate-800">

          <ChatList
            chats={chats}
            selectedId={selectedId}
            onSelect={setSelectedId}
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