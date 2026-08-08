"use client";

import { useEffect, useState } from "react";
import SendCampaignModal from "@/components/whatsapp/campaigns/send-campaign-modal";

interface Template {
  id: string;
  name: string;
  category: string;
  language: string;
  status: string;
}

export default function CampaignsPage() {
  const [templates, setTemplates] = useState<
    Template[]
  >([]);

  const [selectedTemplate, setSelectedTemplate] =
  useState("");

const [modalOpen, setModalOpen] =
  useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      const res =
        await fetch("/api/templates");

      const data =
        await res.json();

      setTemplates(
        data.data ?? []
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Campaigns
        </h1>

        <p className="mt-2 text-slate-400">
          Send approved WhatsApp
          templates to your contacts.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr className="text-left text-slate-400">

              <th className="px-6 py-4">
                Template
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Language
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
              Action
            </th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>

                <td
                  colSpan={4}
                  className="py-20 text-center text-slate-500"
                >
                  Loading templates...
                </td>

              </tr>
            )}

            {!loading &&
              templates.length === 0 && (
                <tr>

                  <td
                    colSpan={4}
                    className="py-20 text-center text-slate-500"
                  >
                    No templates found.
                  </td>

                </tr>
              )}

            {templates.map(
              (template) => (
                <tr
                  key={template.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4 text-white">
                    {template.name}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {template.category}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {template.language}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-green-600/20 px-3 py-1 text-sm text-green-400">

                      {template.status}

                    </span>

                  </td>

                  <td className="px-6 py-4">

                  <button
                    onClick={() => {
                      setSelectedTemplate(
                        template.name
                      );

                      setModalOpen(true);
                    }}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                  >
                    Send
                  </button>

                </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      <SendCampaignModal
        open={modalOpen}
        templateName={selectedTemplate}
        onClose={() =>
          setModalOpen(false)
        }
      />

    </div>
  );
}