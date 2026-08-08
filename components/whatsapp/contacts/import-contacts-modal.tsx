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

type CsvRow = Record<string, string>;

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

  const [importing, setImporting] =
    useState(false);

  const [result, setResult] =
    useState<{
      imported: number;
      skipped: number;
    } | null>(null);

  if (!open) return null;

  function resetModal() {
    setFile(null);
    setRows([]);
    setHeaders([]);
    setError("");
    setResult(null);
    setDragging(false);
  }

  function closeModal() {
    resetModal();
    onClose();
  }

  function parseCsv(file: File) {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete(results) {
      const fields =
        (results.meta.fields ?? []).filter(
          (field) =>
            field &&
            !field.startsWith("_")
        );

        const lower =
          fields.map((x) =>
            x.toLowerCase()
          );

        if (
          !lower.includes("name") ||
          !lower.includes("phone")
        ) {
          setError(
            'CSV must contain "Name" and "Phone" columns.'
          );

          return;
        }

        setHeaders(fields);
        const cleanedRows =
        results.data.map((row) => ({
          Name:
            row.Name ??
            row.name ??
            "",
          Phone:
            row.Phone ??
            row.phone ??
            "",
        }));

      setRows(cleanedRows);
              setError("");
            },

      error() {
        setError(
          "Unable to read CSV."
        );
      },
    });
  }

  function handleFile(
    file: File | null
  ) {
    if (!file) return;

    if (
      !file.name
        .toLowerCase()
        .endsWith(".csv")
    ) {
      alert(
        "Please select a CSV file."
      );

      return;
    }

    setFile(file);

    parseCsv(file);
  }

async function importContacts() {
  if (!rows.length) return;

  setImporting(true);

  const contacts = rows.map((row) => ({
    name: row.Name ?? row.name ?? "",
    phone: row.Phone ?? row.phone ?? "",
    email: null,
    company: null,
    city: null,
    state: null,
    tags: [],
    notes: null,
  }));

  const response = await fetch(
    "/api/contacts",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        contacts,
      }),
    }
  );

if (!response.ok) {
  const err =
    await response.json();

  console.log(err);

  alert(
    JSON.stringify(err)
  );

  setImporting(false);

  return;
}

  const data =
    await response.json();

  setImporting(false);

  setResult(data);

  onSuccess();

  setTimeout(() => {
    closeModal();
  }, 1500);
}

return (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">

    <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Import Contacts
          </h2>

          <p className="mt-2 text-slate-400">
            CSV Format:
            <span className="ml-2 font-semibold text-green-400">
              Name,Phone
            </span>
          </p>

        </div>

        <button
          onClick={closeModal}
        >
          <X className="text-slate-400 hover:text-white" />
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
            e.dataTransfer.files[0]
          );
        }}
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
          dragging
            ? "border-green-500 bg-slate-800"
            : "border-slate-800"
        }`}
      >

        <FileSpreadsheet
          size={60}
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
              e.target.files?.[0] ??
                null
            )
          }
        />

      </div>
            {error && (
        <div className="mt-6 rounded-xl border border-red-700 bg-red-900/20 p-4 text-red-300">
          {error}
        </div>
      )}

      {file && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="font-semibold text-white">
                {file.name}
              </p>

              <p className="text-sm text-slate-400">
                {(file.size / 1024).toFixed(1)} KB • {rows.length} Contacts
              </p>

            </div>

            <button
              onClick={resetModal}
            >
              <X className="text-red-500" />
            </button>

          </div>

          {rows.length > 0 && (
            <div className="overflow-auto rounded-xl border border-slate-800">

              <table className="min-w-full">

                <thead className="bg-slate-800">

                  <tr>

                    {headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-sm font-semibold text-white"
                      >
                        {header}
                      </th>
                    ))}

                  </tr>

                </thead>

                <tbody>

                  {rows
                    .slice(0, 10)
                    .map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-slate-800"
                      >

                        {headers.map((header) => (
                          <td
                            key={header}
                            className="px-4 py-3 text-slate-300"
                          >
                            {row[header] ?? "-"}
                          </td>
                        ))}

                      </tr>
                    ))}

                </tbody>

              </table>

            </div>
          )}

          {rows.length > 10 && (
            <p className="mt-3 text-sm text-slate-400">
              Showing first 10 of {rows.length} contacts.
            </p>
          )}

        </div>
      )}

      <div className="mt-8 flex justify-end gap-4">

        <button
          onClick={closeModal}
          className="rounded-xl border border-slate-700 px-6 py-3 text-white"
        >
          Cancel
        </button>

        <button
          onClick={importContacts}
          disabled={
            !file ||
            !!error ||
            importing
          }
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Upload size={18} />

          {importing
            ? "Importing..."
            : "Import Contacts"}
        </button>

      </div>

      {result && (
        <div className="mt-6 rounded-xl border border-green-700 bg-green-900/20 p-4">

          <p className="font-semibold text-green-400">
            Import Completed
          </p>

          <p className="mt-2 text-slate-300">
            Successfully Imported: {result.imported}
          </p>

          <p className="text-slate-300">
            Duplicate / Invalid: {result.skipped}
          </p>

        </div>
      )}

    </div>

  </div>
);
}