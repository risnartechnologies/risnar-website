"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/* =========================
   LEAD FORM CONTEXT
   - Global lead form state
   - Open from anywhere
   - Single modal instance
   ========================= */

type LeadFormContextType = {
  isOpen: boolean;
  openLeadForm: () => void;
  closeLeadForm: () => void;
};

const LeadFormContext =
  createContext<
    LeadFormContextType | undefined
  >(undefined);

export function LeadFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const openLeadForm = () =>
    setIsOpen(true);

  const closeLeadForm = () =>
    setIsOpen(false);

  return (
    <LeadFormContext.Provider
      value={{
        isOpen,
        openLeadForm,
        closeLeadForm,
      }}
    >
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context =
    useContext(
      LeadFormContext
    );

  if (!context) {
    throw new Error(
      "useLeadForm must be used inside LeadFormProvider"
    );
  }

  return context;
}