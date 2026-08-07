"use client";

import { useRef, useState } from "react";

import Papa from "papaparse";

import {
  Upload,
  FileSpreadsheet,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type CsvRow = Record<
  string,
  string
>;

export default function ImportContactsModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [dragging, setDragging] =
    useState(false);

  const [rows, setRows] =
    useState<CsvRow[]>([]);

  const [headers, setHeaders] =
    useState<string[]>([]);

  const [error, setError] =
    useState("");

    const [loading, setLoading] =
  useState(false);

  if (!open) return null;

  function parseCsv(
    selected: File
  ) {
    Papa.parse<CsvRow>(
      selected,
      {
        header: true,
        skipEmptyLines: true,

        complete: (
          results
        ) => {
          const data =
            results.data;

          const fields =
            results.meta
              .fields ?? [];

          setRows(data);
          setHeaders(fields);

          const lower =
            fields.map(
              (h) =>
                h.toLowerCase()
            );

          if (
            !lower.includes(
              "name"
            ) ||
            !lower.includes(
              "phone"
            )
          ) {
            setError(
              'CSV must contain "Name" and "Phone" columns.'
            );
          } else {
            setError("");
          }
        },

        error: () => {
          setError(
            "Unable to read CSV."
          );
        },
      }
    );
  }

  function handleFile(
    selected: File | null
  ) {
    if (!selected) return;

    if (
      !selected.name
        .toLowerCase()
        .endsWith(".csv")
    ) {
      alert(
        "Please select a CSV file."
      );
      return;
    }

    setFile(selected);

    parseCsv(selected);
  }

  async function importContacts() {
  if (!rows.length || error) {
    return;
  }

  setLoading(true);

  const response =
    await fetch(
      "/api/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          contacts: rows,
        }),
      }
    );

  setLoading(false);

  if (!response.ok) {
    alert(
      "Unable to import contacts."
    );
    return;
  }

  const result =
    await response.json();

  alert(
    `Imported: ${result.imported}\nSkipped: ${result.skipped}`
  );

  setFile(null);
  setRows([]);
  setHeaders([]);
  setError("");

  onSuccess();
  onClose();
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Import Contacts
          </h2>

          <button
            onClick={onClose}
          >
            <X className="text-slate-400" />
          </button>

        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() =>
            setDragging(false)
          }
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            handleFile(
              e.dataTransfer
                .files[0]
            );
          }}
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragging
              ? "border-green-500 bg-slate-800"
              : "border-slate-700"
          }`}
        >

          <FileSpreadsheet
            size={56}
            className="mx-auto mb-5 text-green-500"
          />

          <h3 className="text-xl font-semibold text-white">
            Drag & Drop CSV File
          </h3>

          <p className="mt-2 text-slate-400">
            or
          </p>

          <button
            onClick={() =>
              inputRef.current?.click()
            }
            className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            Browse CSV
          </button>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept=".csv"
            onChange={(e) =>
              handleFile(
                e.target
                  .files?.[0] ??
                  null
              )
            }
          />

        </div>

        {file && (

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <p className="font-semibold text-white">
                  {file.name}
                </p>

                <p className="text-sm text-slate-400">
                  {(file.size / 1024).toFixed(
                    1
                  )}{" "}
                  KB • {rows.length} Contacts
                </p>

              </div>

              <button
                onClick={() => {
                  setFile(null);
                  setRows([]);
                  setHeaders([]);
                  setError("");
                }}
              >
                <X className="text-red-500" />
              </button>

            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 p-3 text-red-300">
                {error}
              </div>
            )}

            {rows.length > 0 && (

              <div className="overflow-auto rounded-xl border border-slate-800">

                <table className="min-w-full">

                  <thead className="bg-slate-800">

                    <tr>

                      {headers.map(
                        (
                          header
                        ) => (
                          <th
                            key={
                              header
                            }
                            className="px-4 py-3 text-left text-sm font-semibold text-white"
                          >
                            {header}
                          </th>
                        )
                      )}

                    </tr>

                  </thead>

                  <tbody>

                    {rows
                      .slice(
                        0,
                        10
                      )
                      .map(
                        (
                          row,
                          index
                        ) => (
                          <tr
                            key={
                              index
                            }
                            className="border-t border-slate-800"
                          >
                            {headers.map(
                              (
                                header
                              ) => (
                                <td
                                  key={
                                    header
                                  }
                                  className="px-4 py-3 text-slate-300"
                                >
                                  {row[
                                    header
                                  ] ??
                                    "-"}
                                </td>
                              )
                            )}
                          </tr>
                        )
                      )}

                  </tbody>

                </table>

              </div>

            )}

            {rows.length >
              10 && (
              <p className="mt-3 text-sm text-slate-400">
                Showing
                first
                10 of{" "}
                {
                  rows.length
                }{" "}
                contacts.
              </p>
            )}

          </div>

        )}

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

            <button
            onClick={importContacts}
            disabled={
                !file ||
                !!error ||
                loading
            }
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
            <Upload size={18} />

            {loading
                ? "Importing..."
                : "Import Contacts"}

            </button>

        </div>

      </div>

    </div>
  );
}