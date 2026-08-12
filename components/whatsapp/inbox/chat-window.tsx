"use client";

import {
  useEffect,
  useRef,
} from "react";

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

  onBack: () => void;
}

export default function ChatWindow({
  selectedChat,
  messages,
  onSend,
  onBack,
}: Props) {
const messagesRef =
  useRef<HTMLDivElement>(null);

const shouldAutoScroll =
  useRef(true);

useEffect(() => {
  const container =
    messagesRef.current;

  if (!container) {
    return;
  }

  requestAnimationFrame(() => {
    container.scrollTop =
      container.scrollHeight;
  });
}, [selectedChat?.id]);

useEffect(() => {
  const container =
    messagesRef.current;

  if (
    !container ||
    !shouldAutoScroll.current
  ) {
    return;
  }

  requestAnimationFrame(() => {
    container.scrollTop =
      container.scrollHeight;
  });
}, [messages]);

  if (!selectedChat) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      <ChatHeader
        id={selectedChat.id}
        name={selectedChat.name}
        phone={selectedChat.phone}
        onRefresh={() => {
          window.location.reload();
        }}
      />

      <div
        ref={messagesRef}
        onScroll={(e) => {
          const element =
            e.currentTarget;

          shouldAutoScroll.current =
            element.scrollHeight -
              element.scrollTop -
              element.clientHeight <
            60;
        }}
        className="
          min-h-0
          flex-1
          overflow-y-auto
          scroll-smooth
          p-6
          space-y-4
        "
      >

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