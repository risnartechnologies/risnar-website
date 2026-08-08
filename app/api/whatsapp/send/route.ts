import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendTextMessage } from "@/lib/whatsapp/whatsapp";

const requestSchema = z.object({
  phone: z.string().min(10),
  message: z.string().min(1).max(4096),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { phone, message } = requestSchema.parse(body);

    const result = await sendTextMessage(phone, message);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      {
        status: 200,
      }
    );
} catch (error: any) {
  console.error("AXIOS ERROR:");
  console.error(error.response?.status);
  console.error(JSON.stringify(error.response?.data, null, 2));

  return NextResponse.json(
    {
      success: false,
      error: error.response?.data || error.message,
    },
    { status: 500 }
  );
}
}