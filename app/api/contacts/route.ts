import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  const contacts = await db.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const body = await request.json();

  const contact = await db.contact.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      company: body.company,
      city: body.city,
      state: body.state,
      tags: body.tags,
      notes: body.notes,
    },
  });

  return NextResponse.json(contact);
}