interface Props {
  message: string;
  type: string;
  time: string;
  outgoing: boolean;
  status: string | null;
}

export default function MessageBubble({
  message,
  type,
  time,
  outgoing,
  status,
}: Props) {
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

        <p className="whitespace-pre-wrap text-sm">
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