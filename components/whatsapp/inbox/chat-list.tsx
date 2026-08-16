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
  selectedChatIds: string[];
  onSelect: (id: string) => void;
  onToggleSelection: (id: string) => void;
}

export default function ChatList({
  chats,
  selectedId,
  selectedChatIds,
  onSelect,
  onToggleSelection,
}: Props) {
  return (
    <div className="h-full overflow-y-auto bg-slate-950">
      {chats.length === 0 && (
        <div className="flex h-full items-center justify-center text-slate-500">
          No conversations found.
        </div>
      )}

      {chats.map((chat) => (
        <div
          key={chat.id}
          data-chat-id={chat.id}
          className="flex items-stretch border-b border-slate-800"
        >
          {/*
           * Selection checkbox.
           *
           * This sits OUTSIDE ChatItem so the checkbox does
           * not interfere with the existing chat-opening button.
           */}
          <div className="flex w-12 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={selectedChatIds.includes(chat.id)}
              onChange={() =>
                onToggleSelection(chat.id)
              }
              aria-label={`Select ${chat.name}`}
              className="h-4 w-4 cursor-pointer accent-green-600"
            />
          </div>

          <div className="min-w-0 flex-1">
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
        </div>
      ))}
    </div>
  );
}