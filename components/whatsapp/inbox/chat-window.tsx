"use client";

import ChatHeader from "./chat-header";
import EmptyChat from "./empty-chat";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";

export interface Message {
  id: string;
  body: string;
  createdAt: string;
  outgoing: boolean;
}

interface Props {
  selectedChat: {
    id: string;
    name: string;
    phone: string;
  } | null;

  messages: Message[];

  onSend: (message: string) => void;
}

export default function ChatWindow({
  selectedChat,
  messages,
  onSend,
}: Props) {
  if (!selectedChat) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full flex-col bg-slate-950">

      <ChatHeader
        name={selectedChat.name}
        phone={selectedChat.phone}
      />

      <div className="flex-1 space-y-4 overflow-y-auto p-6">

        {messages.length === 0 && (
          <div className="mt-20 text-center text-slate-500">
            No messages yet.
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.body}
            time={message.createdAt}
            outgoing={message.outgoing}
          />
        ))}

      </div>

      <MessageInput
        onSend={onSend}
      />

    </div>
  );
}