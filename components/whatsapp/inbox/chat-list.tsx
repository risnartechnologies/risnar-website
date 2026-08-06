"use client";

import ChatItem from "./chat-item";

export interface Chat {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

interface Props {
  chats: Chat[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatList({
  chats,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div
      key={chats.length}
      className="h-full overflow-y-auto bg-slate-950"
    >
      {chats.length === 0 && (
        <div className="flex h-full items-center justify-center text-slate-500">
          No conversations found.
        </div>
      )}

      {chats.map((chat) => (
        <div
          key={chat.id}
          data-chat-id={chat.id}
        >
          <ChatItem
            id={chat.id}
            name={chat.name}
            phone={chat.phone}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            unread={chat.unread}
            active={selectedId === chat.id}
            onClick={() => onSelect(chat.id)}
          />
        </div>
      ))}
    </div>
  );
}