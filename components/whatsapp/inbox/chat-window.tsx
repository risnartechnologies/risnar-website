"use client";

import {
  useEffect,
  useRef,
} from "react";

import ChatHeader from "./chat-header";
import EmptyChat from "./empty-chat";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";

/**
 * Message
 *
 * Represents a single message displayed in the
 * WhatsApp conversation window.
 *
 * type:
 *   TEXT, IMAGE, VIDEO, AUDIO, DOCUMENT, etc.
 *
 * status:
 *   PENDING, SENT, DELIVERED, READ, FAILED
 *
 * outgoing:
 *   true  = message sent by us
 *   false = message received from contact
 */
export interface Message {
  id: string;

  body: string;

  type: string;

  status: string | null;

  createdAt: string;

  outgoing: boolean;
}

interface Props {
  /**
   * Currently selected WhatsApp conversation.
   *
   * null means no conversation is selected.
   */
  selectedChat: {
    id: string;
    name: string;
    phone: string;
  } | null;

  /**
   * Messages belonging to the selected conversation.
   */
  messages: Message[];

  /**
   * Called when the user sends a new text message.
   */
  onSend: (message: string) => void;

  /**
   * Called when the user presses the back button
   * on mobile.
   */
  onBack: () => void;
}

export default function ChatWindow({
  selectedChat,
  messages,
  onSend,
  onBack,
}: Props) {
  /*
   * Reference to the scrollable message container.
   */
  const messagesRef =
    useRef<HTMLDivElement>(null);

  /*
   * Determines whether incoming message updates
   * should automatically move the conversation
   * to the bottom.
   *
   * This prevents automatic scrolling when the
   * user has intentionally scrolled upward.
   */
  const shouldAutoScroll =
    useRef(true);

  /**
   * When switching conversations, always position
   * the message window at the latest message.
   */
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

  /**
   * When messages change, automatically scroll to
   * the latest message only when the user was already
   * near the bottom of the conversation.
   */
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

  /*
   * No conversation selected.
   * Keep the existing empty-chat behaviour intact.
   */
  if (!selectedChat) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/*
       * Conversation header.
       *
       * The existing refresh behaviour is preserved.
       */}
      <ChatHeader
        id={selectedChat.id}
        name={selectedChat.name}
        phone={selectedChat.phone}
        onRefresh={() => {
          window.location.reload();
        }}
        onBack={onBack}
      />

      {/*
       * Scrollable message area.
       */}
      <div
        ref={messagesRef}
        onScroll={(e) => {
          const element =
            e.currentTarget;

          /*
           * Consider the user "near the bottom"
           * when there are fewer than 60px remaining.
           *
           * If the user scrolls upward, automatic
           * scrolling is temporarily disabled.
           */
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

        {/*
         * Empty conversation state.
         */}
        {messages.length === 0 && (
          <div className="mt-20 text-center text-slate-500">
            No messages yet.
          </div>
        )}

        {/*
         * Render every message in chronological order.
         *
         * MessageBubble receives the complete message
         * information required for direction, type,
         * timestamp and status rendering.
         */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.body}
            type={message.type}
            time={message.createdAt}
            outgoing={message.outgoing}
            status={message.status}
          />
        ))}

      </div>

      {/*
       * Existing message input remains unchanged.
       */}
      <MessageInput
        onSend={onSend}
      />

    </div>
  );
}