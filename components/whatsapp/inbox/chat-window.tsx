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
 * Represents one message displayed in the WhatsApp
 * conversation window.
 *
 * type:
 *   TEXT, TEMPLATE, IMAGE, VIDEO, AUDIO, DOCUMENT, etc.
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
   * Called when the user presses Back on mobile.
   */
  onBack: () => void;
}

export default function ChatWindow({
  selectedChat,
  messages,
  onSend,
  onBack,
}: Props) {
  /**
   * Scrollable message container.
   */
  const messagesRef =
    useRef<HTMLDivElement>(null);

  /**
   * Controls automatic scrolling.
   *
   * true:
   *   User is near the bottom, so new messages
   *   should move the view to the latest message.
   *
   * false:
   *   User has intentionally scrolled upward.
   */
  const shouldAutoScroll =
    useRef(true);

  /**
   * When changing conversations, always show the
   * latest available message.
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

      /*
       * A newly selected conversation should always
       * start with automatic scrolling enabled.
       */
      shouldAutoScroll.current = true;
    });
  }, [selectedChat?.id]);

  /**
   * When the message list changes, scroll to the
   * latest message only when the user was already
   * near the bottom.
   *
   * This keeps manual scrolling intact.
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

  /**
   * No conversation selected.
   *
   * Preserve the existing empty-chat behaviour.
   */
  if (!selectedChat) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Conversation header */}
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
       * Message list.
       *
       * IMPORTANT:
       * ChatWindow does not filter messages by type,
       * direction, status or body.
       *
       * Every message returned by the API is passed to
       * MessageBubble unchanged. This prevents the
       * ChatWindow from accidentally hiding TEMPLATE,
       * FAILED, SENT, INBOUND or OUTBOUND messages.
       */}
      <div
        ref={messagesRef}
        onScroll={(e) => {
          const element =
            e.currentTarget;

          const distanceFromBottom =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight;

          /*
           * Keep automatic scrolling enabled only when
           * the user is within 60px of the bottom.
           */
          shouldAutoScroll.current =
            distanceFromBottom < 60;
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

        {/* Empty conversation state */}
        {messages.length === 0 && (
          <div className="mt-20 text-center text-slate-500">
            No messages yet.
          </div>
        )}

        {/*
         * Render every message exactly once.
         *
         * No message is removed here.
         * No message is replaced with placeholder text.
         * No special handling is applied based on direction.
         *
         * The MessageBubble component is responsible for
         * displaying the actual message content.
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

      {/* Existing message input */}
      <MessageInput
        onSend={onSend}
      />

    </div>
  );
}