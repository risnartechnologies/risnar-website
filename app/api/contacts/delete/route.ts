import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function POST(
  request: Request
) {
  try {
    const { ids } =
      await request.json();

    if (
      !Array.isArray(ids) ||
      ids.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No contacts selected.",
        },
        {
          status: 400,
        }
      );
    }

    await db.contact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to delete contacts.",
      },
      {
        status: 500,
      }
    );

  }
}