"use client";
import AddContactModal from "@/components/whatsapp/contacts/add-contact-modal";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "@/components/whatsapp/common/confirm-delete-modal";
import {
  Plus,
  Trash2,
  Send,
} from "lucide-react";
import ImportContactsModal from "@/components/whatsapp/contacts/import-contacts-modal";
import CreateCampaignModal from "@/components/whatsapp/campaigns/create-campaign-modal";
import { createPortal } from "react-dom";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  city: string | null;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] =
  useState(false);
  const [campaignOpen, setCampaignOpen] =
  useState(false);

  const [selected, setSelected] =
  useState<string[]>([]);

  const [search, setSearch] =
  useState("");

const [page, setPage] =
  useState(1);

const [totalPages, setTotalPages] =
  useState(1);

const [totalContacts, setTotalContacts] =
  useState(0);

const [limit, setLimit] =
  useState(25);

  const [deleteOpen, setDeleteOpen] =
  useState(false);

const [deleting, setDeleting] =
  useState(false);

useEffect(() => {
  loadContacts();
}, [page, search, limit]);

async function loadContacts() {
  const res = await fetch(
    `/api/contacts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );

  const data =
    await res.json();

  setContacts(data.contacts);
  setTotalPages(
    data.totalPages
  );
  setTotalContacts(
    data.total
  );
}

  function toggle(id: string) {
  setSelected((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
}

function toggleAll() {
  if (selected.length === contacts.length) {
    setSelected([]);
  } else {
    setSelected(
      contacts.map((c) => c.id)
    );
  }
}

async function deleteSelected() {
  setDeleting(true);

  try {

    await fetch(
      "/api/contacts/delete",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ids: selected,
        }),
      }
    );

    setSelected([]);

    loadContacts();

  } finally {

    setDeleting(false);

    setDeleteOpen(false);

  }
}

  return (
    <div className="space-y-8">

<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

  <div>

    <h1 className="text-4xl font-bold text-white">
      Contacts
    </h1>

    <p className="mt-2 text-slate-400">
      Manage all your WhatsApp contacts.
    </p>

  </div>

  <div className="flex flex-wrap gap-3">

<div className="w-64">

  <input
    type="text"
    placeholder="Search by name or phone..."
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-green-500"
  />

</div>

    <button
      onClick={() =>
        setImportOpen(true)
      }
      className="h-12 rounded-xl border border-slate-700 bg-slate-900 px-5 font-medium text-slate-200 transition hover:border-green-500"
    >
      Import CSV
    </button>

    <button
      className="h-12 rounded-xl border border-slate-700 bg-slate-900 px-5 font-medium text-slate-200 transition hover:border-green-500"
    >
      Export CSV
    </button>

    <button
      className="h-12 rounded-xl border border-slate-700 bg-slate-900 px-5 font-medium text-slate-200 transition hover:border-green-500"
    >
      Download Sample
    </button>

    {selected.length > 0 && (
      <button
        onClick={() =>
          setCampaignOpen(true)
        }
        className="flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-500"
      >
        <Send size={18} />
        Send Campaign ({selected.length})
      </button>
    )}

    {selected.length > 0 && (
      <button
        onClick={() =>
          setDeleteOpen(true)
        }
        className="flex h-12 items-center gap-2 rounded-xl bg-red-600 px-5 font-semibold text-white hover:bg-red-500"
      >
        <Trash2 size={18} />
        Delete ({selected.length})
      </button>
    )}

    <button
      onClick={() => setOpen(true)}
      className="flex h-12 items-center gap-2 rounded-xl bg-green-600 px-5 font-semibold text-white transition hover:bg-green-500"
    >
      <Plus size={18} />
      Add Contact
    </button>

  </div>

  <ConfirmDeleteModal
  open={deleteOpen}
  count={selected.length}
  loading={deleting}
  onCancel={() =>
    setDeleteOpen(false)
  }
  onConfirm={deleteSelected}
/>

</div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

          <tr className="text-left text-slate-400">

            <th className="px-4 py-4">
              <input
                type="checkbox"
                checked={
                  contacts.length > 0 &&
                  selected.length === contacts.length
                }
                onChange={toggleAll}
              />
            </th>

            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">City</th>

          </tr>

          </thead>

          <tbody>

            {contacts.length === 0 && (
              <tr>

                <td
                  colSpan={5}
                  className="py-20 text-center text-slate-500"
                >
                  No contacts found.
                </td>

              </tr>
            )}

            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >

                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(contact.id)}
                    onChange={() => toggle(contact.id)}
                  />
                </td>

                <td className="px-6 py-4 text-white">
                  {contact.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.phone}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.email ?? "-"}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.company ?? "-"}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.city ?? "-"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <AddContactModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadContacts}
        />

      <CreateCampaignModal
        open={campaignOpen}
        selectedContacts={selected}
        onClose={() =>
          setCampaignOpen(false)
        }
        onSuccess={() => {
          setCampaignOpen(false);
          setSelected([]);
          loadContacts();
        }}
      />

      {typeof window !== "undefined" &&
        createPortal(
          <ImportContactsModal
            open={importOpen}
            onClose={() =>
              setImportOpen(false)
            }
            onSuccess={loadContacts}
          />,
          document.body
        )}

    </div>
  );
}