interface Props {
  message: string;
  type: string;
  time: string;
  outgoing: boolean;
  status: string | null;
}

/**
 * MessageBubble
 *
 * Renders one WhatsApp message.
 *
 * Important responsive behaviour:
 * - Outgoing messages stay aligned to the right.
 * - Incoming messages stay aligned to the left.
 * - Long text/URLs are allowed to wrap.
 * - The bubble can never force the mobile chat window
 *   wider than the available viewport.
 */
export default function MessageBubble({
  message,
  type,
  time,
  outgoing,
  status,
}: Props) {
  return (
    <div
      className={`flex min-w-0 w-full ${
        outgoing
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`min-w-0 max-w-[70%] overflow-hidden rounded-2xl px-4 py-3 ${
          outgoing
            ? "bg-green-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        <p className="break-words whitespace-pre-wrap text-sm">
          {message}
        </p>

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