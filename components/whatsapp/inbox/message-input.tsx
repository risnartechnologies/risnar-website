"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
  }

  return (
    <div className="flex items-center gap-3 border-t border-slate-800 bg-slate-950 p-4">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
      />

      <button
        onClick={handleSend}
        className="rounded-xl bg-green-600 p-3 text-white transition hover:bg-green-500"
      >
        <Send size={18} />
      </button>

    </div>
  );
}