"use client";

import { useLeadForm } from "@/app/context/LeadFormContext";

type OpenLeadFormButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function OpenLeadFormButton({
  children,
  className,
}: OpenLeadFormButtonProps) {
  const { openLeadForm } = useLeadForm();

  return (
    <button
      type="button"
      onClick={openLeadForm}
      className={
        className ??
        "rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      }
    >
      {children ?? "Get Free Cost Estimate"}
    </button>
  );
}