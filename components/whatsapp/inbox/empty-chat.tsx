import { MessageSquare } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-slate-950 text-center">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900">

        <MessageSquare
          size={48}
          className="text-green-500"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold text-white">
        Welcome to Inbox
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        Select a conversation from the left panel to start chatting with your customers.
      </p>

    </div>
  );
}