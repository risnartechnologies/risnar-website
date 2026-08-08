"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  open: boolean;
  templateName: string;
  onClose: () => void;
}

export default function SendCampaignModal({
  open,
  templateName,
  onClose,
}: Props) {

    const [contacts, setContacts] =
  useState<Contact[]>([]);

const [loading, setLoading] =
  useState(false);

  const [selectedContacts, setSelectedContacts] =
  useState<string[]>([]);

const [campaignName, setCampaignName] =
  useState("");

const [description, setDescription] =
  useState("");

  const [saving, setSaving] =
  useState(false);

useEffect(() => {
  if (open) {
    loadContacts();
  }
}, [open]);

async function loadContacts() {
  setLoading(true);

  const res =
    await fetch(
      "/api/contacts?limit=10000"
    );

  const data =
    await res.json();

  setContacts(
    data.contacts ?? []
  );

  setLoading(false);
}

function toggleContact(id: string) {

  setSelectedContacts((prev) =>

    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]

  );

}

async function createCampaign() {

  if (!campaignName.trim()) {

    alert("Enter campaign name.");

    return;

  }

  if (selectedContacts.length === 0) {

    alert("Select at least one contact.");

    return;

  }

  setSaving(true);

  const res =
    await fetch(
      "/api/campaigns",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          name:
            campaignName,

          description,

          templateName,

          status: "DRAFT",

          contacts:
            selectedContacts,

        }),

      }
    );

  setSaving(false);

  if (!res.ok) {

    alert(
      "Failed to create campaign."
    );

    return;

  }

  alert(
    "Campaign created successfully."
  );

  onClose();

}

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Send Campaign
            </h2>

            <p className="mt-1 text-slate-400">
              Template :
              <span className="ml-2 font-semibold text-green-400">
                {templateName}
              </span>
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            Close
          </button>

        </div>

        <div className="space-y-6 p-6">

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-5 text-lg font-semibold text-white">
                Campaign Details
            </h3>

            <input
                value={campaignName}
                onChange={(e) =>
                setCampaignName(
                    e.target.value
                )
                }
                placeholder="Campaign Name"
                className="mb-4 h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white"
            />

            <textarea
                value={description}
                onChange={(e) =>
                setDescription(
                    e.target.value
                )
                }
                placeholder="Description (Optional)"
                className="h-24 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
            />

            </div>

            <h3 className="mb-2 text-lg font-semibold text-white">
              Step 1
            </h3>

            <p className="mb-4 text-sm text-green-400">

            Selected Contacts :
            {selectedContacts.length}

            </p>

            <div className="max-h-80 overflow-y-auto rounded-lg border border-slate-800">

            {loading && (
                <div className="p-8 text-center text-slate-400">
                Loading contacts...
                </div>
            )}

            {!loading &&
                contacts.map((contact) => (

                <div
                    key={contact.id}
                    className="flex items-center justify-between border-b border-slate-800 p-4 hover:bg-slate-800/40"
                >

                    <div>

                    <p className="font-medium text-white">
                        {contact.name}
                    </p>

                    <p className="text-sm text-slate-400">
                        {contact.phone}
                    </p>

                    </div>

                    <input
                    type="checkbox"
                    checked={selectedContacts.includes(
                        contact.id
                    )}
                    onChange={() =>
                        toggleContact(
                        contact.id
                        )
                    }
                    className="h-5 w-5"
                    />

                </div>

                ))}

            </div>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-2 text-lg font-semibold text-white">
              Step 2
            </h3>

            <p className="text-slate-400">
              Template preview will appear here.
            </p>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-2 text-lg font-semibold text-white">
              Step 3
            </h3>

            <p className="text-slate-400">
              Sending progress will appear here.
            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-3 text-white"
          >
            Cancel
          </button>

        <button
        onClick={createCampaign}
        disabled={saving}
        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
        >

        {saving
            ? "Creating..."
            : "Create Campaign"}

        </button>

        </div>

      </div>

    </div>
  );
}