"use client";
import AddContactModal from "@/components/whatsapp/contacts/add-contact-modal";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

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

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Contacts
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your WhatsApp contacts.
          </p>
        </div>

        <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          <Plus size={18} />
          Add Contact
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr className="text-left text-slate-400">

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

    </div>
  );
}