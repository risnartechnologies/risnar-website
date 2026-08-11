interface Props {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  active: boolean;
  onClick: () => void;
}

export default function ChatItem({
  name,
  phone,
  lastMessage,
  lastMessageTime,
  unread,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-4 border-b border-slate-800 p-4 text-left transition ${
        active
          ? "bg-slate-800"
          : "hover:bg-slate-900"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between">

          <h3 className="truncate font-semibold text-white">
            {name}
          </h3>

          <span className="text-xs text-slate-500">
            {lastMessageTime}
          </span>

        </div>

        <p className="mt-1 text-xs text-slate-500">
          {phone}
        </p>

        <p className="mt-2 truncate text-sm text-slate-400">
          {lastMessage}
        </p>

      </div>

      {unread > 0 && !active && (
        <div className="flex h-6 min-w-6 items-center justify-center rounded-full bg-green-600 px-2 text-xs font-bold text-white">
          {unread}
        </div>
      )}
    </button>
  );
}