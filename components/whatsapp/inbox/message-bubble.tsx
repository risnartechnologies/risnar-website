/**
 * MessageBubble
 *
 * Renders a single WhatsApp message inside the inbox.
 *
 * Supported message types include:
 * TEXT, TEMPLATE, IMAGE, VIDEO, AUDIO, DOCUMENT, etc.
 *
 * The component intentionally does not filter or replace
 * message content based on type or status. Whatever body
 * value is supplied by the parent is displayed as-is.
 */

interface Props {
  /**
   * Actual message content to display.
   */
  message: string;

  /**
   * WhatsApp message type.
   *
   * Kept available for future type-specific rendering,
   * but currently does not alter the existing layout.
   */
  type: string;

  /**
   * Formatted message time.
   */
  time: string;

  /**
   * true  = outbound message sent by us.
   * false = inbound message received from contact.
   */
  outgoing: boolean;

  /**
   * Current WhatsApp message status.
   *
   * PENDING, SENT, DELIVERED, READ, FAILED, etc.
   */
  status: string | null;
}

export default function MessageBubble({
  message,
  type,
  time,
  outgoing,
  status,
}: Props) {
  /*
   * Keep the supplied message body unchanged.
   *
   * In particular, TEMPLATE messages must display the
   * template name when that value is supplied by the API.
   *
   * Do not replace an empty body with placeholder text such
   * as "this is text message", because that can hide the
   * actual state of the database/API response.
   */
  const displayMessage =
    message ?? "";

    console.log(
  "=== MESSAGE BUBBLE DEBUG ===",
  {
    message,
    type,
    time,
    outgoing,
    status,
  }
);

  return (
    <div
      className={`flex ${
        outgoing
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          outgoing
            ? "bg-green-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >

        {/*
         * Message body.
         *
         * whitespace-pre-wrap preserves line breaks
         * and spacing from WhatsApp text messages.
         *
         * The message is rendered exactly as received.
         */}
        <p className="whitespace-pre-wrap text-sm">
          {displayMessage}
        </p>

        {/*
         * Timestamp.
         *
         * Existing timestamp styling is preserved.
         */}
        <p
          className={`mt-2 text-right text-xs ${
            outgoing
              ? "text-green-100"
              : "text-slate-400"
          }`}
        >
          {time}
        </p>

      </div>
    </div>
  );
}