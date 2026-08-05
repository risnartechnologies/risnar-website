"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddContactModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    city: "",
    state: "",
    tags: "",
    notes: "",
  });

  if (!open) return null;

  async function saveContact() {
    setLoading(true);

    await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        tags: form.tags,
      }),
    });

    setLoading(false);

    setForm({
      name: "",
      phone: "",
      email: "",
      company: "",
      city: "",
      state: "",
      tags: "",
      notes: "",
    });

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Add Contact
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400" />
          </button>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {[
            ["name", "Name"],
            ["phone", "Phone"],
            ["email", "Email"],
            ["company", "Company"],
            ["city", "City"],
            ["state", "State"],
            ["tags", "Tags (comma separated)"],
          ].map(([key, label]) => (
            <input
              key={key}
              placeholder={label}
              value={(form as any)[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          ))}

        </div>

        <textarea
          placeholder="Notes"
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          className="mt-5 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-green-500"
        />

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={saveContact}
            disabled={loading}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            {loading ? "Saving..." : "Save Contact"}
          </button>

        </div>

      </div>

    </div>
  );
}