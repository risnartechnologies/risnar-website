import { NextResponse } from "next/server";

/* =========================
   CONTACT API
   - Phase 2 placeholder
   - Receives lead form data
   - Ready for Resend/SMTP later
   ========================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
    } = body;

    console.log(
      "NEW LEAD RECEIVED"
    );

    console.log({
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      receivedAt:
        new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Lead received successfully",
    });
  } catch (error) {
    console.error(
      "CONTACT API ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}