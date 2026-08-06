import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const conversations = await db.conversation.findMany({
      take: 1,
    });

    return NextResponse.json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}