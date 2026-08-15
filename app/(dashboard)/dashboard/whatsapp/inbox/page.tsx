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

/**
 * Conversation returned by:
 *
 * GET /api/conversations
 *
 * IMPORTANT:
 * The API returns only conversations belonging to
 * contacts who have sent at least one INBOUND message.
 *
 * Therefore the Inbox is a LEAD-ONLY inbox.
 */
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

/**
 * Message returned by:
 *
 * GET /api/conversations/[id]/messages
 */
interface ApiMessage {
  id: string;

  body: string | null;

  type: string;

  status: string | null;

  direction:
    | "INBOUND"
    | "OUTBOUND";

  createdAt: string;
}

export default function InboxPage() {
  /*
   * =========================================================
   * STATE
   * =========================================================
   */

  /**
   * All lead conversations displayed in the
   * left-side chat list.
   */
  const [chats, setChats] =
    useState<Chat[]>([]);

  /**
   * Currently selected conversation.
   */
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  /**
   * Messages displayed in the selected conversation.
   */
  const [messages, setMessages] =
    useState<Message[]>([]);

  /*
   * =========================================================
   * REQUEST CONTROL
   * =========================================================
   */

  /**
   * Identifies the latest conversation-list request.
   *
   * Prevents an older request from overwriting newer data.
   */
  const conversationRequestId =
    useRef(0);

  /**
   * Identifies the latest message request.
   *
   * Prevents stale message responses from replacing
   * newer message data.
   */
  const messageRequestId =
    useRef(0);

  /**
   * Keeps track of the currently selected conversation
   * without relying on a stale closure.
   */
  const selectedConversationRef =
    useRef<string | null>(null);

  /**
   * AbortController for the currently running message request.
   *
   * When the user changes conversations or the component
   * unmounts, the current HTTP request is cancelled cleanly.
   */
  const messageAbortController =
    useRef<AbortController | null>(null);

  /*
   * =========================================================
   * SELECTED CONVERSATION REF
   * =========================================================
   */

  useEffect(() => {
    selectedConversationRef.current =
      selectedId;
  }, [selectedId]);

  /*
   * =========================================================
   * INITIAL CONVERSATION LOAD
   * =========================================================
   */

  useEffect(() => {
    loadConversations();
  }, []);

  /*
   * =========================================================
   * SELECTED CONVERSATION MESSAGE POLLING
   * =========================================================
   *
   * Messages are refreshed every 2 seconds.
   *
   * IMPORTANT:
   *
   * 1. Only one polling request runs at a time.
   * 2. The current request is aborted when the user
   *    changes conversation.
   * 3. Abort errors are intentionally ignored.
   * 4. Successful responses are checked against both
   *    request ID and selected conversation.
   */

  useEffect(() => {
    /*
     * No conversation selected.
     *
     * Cancel any previous request and clear messages.
     */
    if (!selectedId) {
      messageAbortController.current?.abort();

      messageAbortController.current =
        null;

      setMessages([]);

      return;
    }

    /*
     * After the null check above, this local constant
     * is guaranteed to be a valid conversation ID.
     */
    const conversationId =
      selectedId;

    selectedConversationRef.current =
      conversationId;

    /*
     * Used to stop the polling loop when:
     *
     * - the user selects another conversation
     * - the component unmounts
     */
    let cancelled = false;

    /**
     * Sequential message polling.
     *
     * The first request starts immediately.
     *
     * The next request starts only after:
     *
     * 1. The previous request finishes.
     * 2. Two seconds have passed.
     *
     * Therefore polling never creates overlapping
     * message requests.
     */
    async function pollMessages() {
      while (!cancelled) {
        await loadMessages(
          conversationId
        );

        /*
         * Stop immediately if this polling loop
         * has been cancelled.
         */
        if (cancelled) {
          break;
        }

        /*
         * Wait two seconds AFTER the previous
         * request has completed.
         */
        await new Promise<void>(
          (resolve) => {
            setTimeout(
              resolve,
              2000
            );
          }
        );
      }
    }

    /*
     * Start polling immediately.
     */
    pollMessages();

    /*
     * Cleanup when:
     *
     * - selected conversation changes
     * - component unmounts
     */
    return () => {
      cancelled = true;

      /*
       * Cancel the active HTTP request.
       */
      messageAbortController.current?.abort();

      messageAbortController.current =
        null;

      /*
       * Invalidate any response from an
       * older request.
       */
      messageRequestId.current += 1;
    };
  }, [selectedId]);

  /*
   * =========================================================
   * LOAD CONVERSATIONS
   * =========================================================
   */

  async function loadConversations() {
    try {
      /*
       * Give this request a unique ID.
       */
      const currentRequest =
        ++conversationRequestId.current;

      const res = await fetch(
        "/api/conversations",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to load conversations. HTTP ${res.status}`
        );
      }

      const data: Conversation[] =
        await res.json();

      /*
       * Ignore this response if a newer
       * conversation request has already started.
       */
      if (
        currentRequest !==
        conversationRequestId.current
      ) {
        return;
      }

      /*
       * Convert API data into the format
       * expected by ChatList.
       */
      const mapped: Chat[] =
        data.map(
          (conversation) => ({
            id: conversation.id,

            name:
              conversation.contact?.name ??
              "Unknown",

            phone:
              conversation.contact?.phone ??
              "",

            /*
             * The API returns the latest message.
             */
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
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "",

            unread:
              conversation.unreadCount,
          })
        );

      setChats(mapped);

      /*
       * Preserve the currently selected conversation
       * whenever it still exists in the lead list.
       */
      setSelectedId((current) => {
        if (
          current &&
          mapped.some(
            (chat) =>
              chat.id === current
          )
        ) {
          return current;
        }

        /*
         * Desktop:
         * automatically open the first lead.
         *
         * Mobile:
         * keep the chat list visible.
         */
        return (
          window.innerWidth >= 768 &&
          mapped.length > 0
        )
          ? mapped[0].id
          : null;
      });
    } catch (error) {
      /*
       * Do not destroy the existing chat list because
       * of a temporary browser/network interruption.
       */
      console.error(
        "Failed to load conversations:",
        error
      );
    }
  }

  /*
   * =========================================================
   * LOAD MESSAGES
   * =========================================================
   */

  async function loadMessages(
    conversationId: string
  ) {
    /*
     * Invalidate the previous request.
     */
    const currentRequest =
      ++messageRequestId.current;

    /*
     * Abort any previous in-flight message request.
     *
     * This is especially important when:
     *
     * - switching conversations
     * - React development mode remounts effects
     * - the component is being unmounted
     */
    messageAbortController.current?.abort();

    const controller =
      new AbortController();

    messageAbortController.current =
      controller;

    try {
      const res = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          cache: "no-store",

          /*
           * Allows cleanup to cancel the request.
           */
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to load messages. HTTP ${res.status}`
        );
      }

      const data: ApiMessage[] =
        await res.json();

      /*
       * Ignore this response if a newer request
       * has already started.
       */
      if (
        currentRequest !==
        messageRequestId.current
      ) {
        return;
      }

      /*
       * Make sure the user is still viewing
       * the same conversation.
       */
      if (
        selectedConversationRef.current !==
        conversationId
      ) {
        return;
      }

      /*
       * Convert API messages into the format
       * expected by ChatWindow.
       */
      const mapped: Message[] =
        data.map(
          (message) => ({
            id: message.id,

            /*
             * Preserve the real stored body.
             *
             * Empty body is kept empty rather than
             * inventing placeholder text.
             */
            body:
              message.body ?? "",

            /*
             * Preserve message type.
             *
             * Examples:
             * text
             * template
             * image
             * video
             * audio
             * document
             * etc.
             */
            type:
              message.type,

            /*
             * Preserve Meta/CRM message status.
             */
            status:
              message.status,

            /*
             * Display local browser time.
             */
            createdAt:
              new Date(
                message.createdAt
              ).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),

            /*
             * OUTBOUND = our message.
             * INBOUND = lead/customer message.
             */
            outgoing:
              message.direction ===
              "OUTBOUND",
          })
        );

      setMessages(mapped);
    } catch (error: any) {
      /*
       * -----------------------------------------------------
       * EXPECTED ABORT
       * -----------------------------------------------------
       *
       * AbortController intentionally cancels a request
       * when the conversation changes or the component
       * unmounts.
       *
       * This is NOT an actual application error.
       */
      if (
        error?.name ===
        "AbortError"
      ) {
        return;
      }

      /*
       * -----------------------------------------------------
       * TEMPORARY BROWSER FETCH INTERRUPTION
       * -----------------------------------------------------
       *
       * Next.js may occasionally report:
       *
       * TypeError: Failed to fetch
       *
       * even when the server successfully processed the
       * request.
       *
       * We deliberately DO NOT clear the existing messages.
       *
       * The next polling cycle will retry automatically.
       */
      console.error(
        "Failed to load messages:",
        error
      );
    } finally {
      /*
       * Only clear the controller if it still belongs
       * to this request.
       *
       * A newer request may already have replaced it.
       */
      if (
        messageAbortController.current ===
        controller
      ) {
        messageAbortController.current =
          null;
      }
    }
  }

  /*
   * =========================================================
   * SELECTED CHAT
   * =========================================================
   */

  const selectedChat =
    chats.find(
      (chat) =>
        chat.id === selectedId
    ) ?? null;

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

      <div className="grid h-full grid-cols-1 md:grid-cols-[380px_1fr]">

        {/* =================================================
            CHAT LIST
            ================================================= */}

        <div
          className={`h-full min-h-0 flex-col border-r border-slate-800 ${
            selectedId
              ? "hidden md:flex"
              : "flex"
          }`}
        >
          <ChatList
            chats={chats}
            selectedId={selectedId}
            onSelect={async (id) => {
              /*
               * Select the conversation immediately.
               */
              setSelectedId(id);

              /*
               * Keep the ref synchronized immediately,
               * without waiting for React's state update.
               */
              selectedConversationRef.current =
                id;

              /*
               * Clear the previous conversation immediately.
               *
               * This prevents messages from the previous
               * lead appearing briefly in the new chat.
               */
              setMessages([]);

              /*
               * Update unread count immediately in the UI.
               */
              setChats((previous) =>
                previous.map(
                  (chat) =>
                    chat.id === id
                      ? {
                          ...chat,
                          unread: 0,
                        }
                      : chat
                )
              );

              try {
                /*
                 * Mark conversation as read.
                 */
                const readResponse =
                  await fetch(
                    `/api/conversations/${id}/read`,
                    {
                      method: "POST",
                    }
                  );

                if (!readResponse.ok) {
                  throw new Error(
                    "Failed to mark conversation as read."
                  );
                }

                /*
                 * Refresh the conversation list once.
                 *
                 * IMPORTANT:
                 * This is NOT called by message polling.
                 */
                await loadConversations();
              } catch (error) {
                console.error(
                  "Failed to mark conversation as read:",
                  error
                );
              }
            }}
          />
        </div>

        {/* =================================================
            CHAT WINDOW
            ================================================= */}

        <div
          className={`h-full min-h-0 ${
            selectedId
              ? "flex"
              : "hidden md:flex"
          }`}
        >
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages}
            onSend={() => {}}
            onBack={() => {
              /*
               * Abort the current message request immediately
               * when leaving the conversation.
               */
              messageAbortController.current?.abort();

              messageAbortController.current =
                null;

              selectedConversationRef.current =
                null;

              setSelectedId(null);

              setMessages([]);
            }}
          />
        </div>

      </div>

    </div>
  );
}