import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendTemplateMessage } from "@/lib/whatsapp/whatsapp";

const schema = z.object({
  phone: z.string(),
  template: z.string(),
  language: z.string().optional(),

  parameters: z
    .array(
      z.union([
        z.string(),

        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ])
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { phone, template, language, parameters } =
      schema.parse(body);

    const result = await sendTemplateMessage(
      phone,
      template,
      language ?? "en_US",
      parameters ?? []
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.error?.message ??
          error?.message ??
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}