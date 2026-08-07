import { NextResponse } from "next/server";

export async function GET() {
  /**
   * Temporary template list.
   *
   * This will later be replaced with
   * WhatsApp Cloud API template sync.
   */
  return NextResponse.json([
    {
      id: "welcome",
      name: "Welcome Message",
      category: "UTILITY",
      language: "en",
    },
    {
      id: "follow_up",
      name: "Follow Up",
      category: "MARKETING",
      language: "en",
    },
    {
      id: "festival_offer",
      name: "Festival Offer",
      category: "MARKETING",
      language: "en",
    },
    {
      id: "payment_reminder",
      name: "Payment Reminder",
      category: "UTILITY",
      language: "en",
    },
    {
      id: "order_update",
      name: "Order Update",
      category: "UTILITY",
      language: "en",
    },
  ]);
}