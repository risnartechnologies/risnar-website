"use client";

import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  count: number;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  count,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
  onClick={onCancel}
>

      <div
  onClick={(e) => e.stopPropagation()}
  className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
          <Trash2
            size={30}
            className="text-red-500"
          />
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Delete Contacts
        </h2>

        <p className="mt-3 text-center text-slate-400">
          Are you sure you want to delete
          <span className="font-semibold text-white">
            {" "}
            {count}{" "}
          </span>
          contact{count > 1 ? "s" : ""}?
        </p>

        <p className="mt-2 text-center text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-700 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}