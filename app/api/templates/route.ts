import { NextResponse } from "next/server";

import { fetchTemplates } from "@/lib/meta/templates";

export async function GET() {
  try {

    const templates =
      await fetchTemplates();

    return NextResponse.json(
      templates
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to fetch templates.",
      },
      {
        status: 500,
      }
    );

  }
}