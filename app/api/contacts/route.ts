import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";

export async function GET() {
  const contacts =
    await db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(
    contacts
  );
}

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  // ----------------------------
  // BULK IMPORT
  // ----------------------------

  if (Array.isArray(body.contacts)) {
    let imported = 0;
    let skipped = 0;

    for (const contact of body.contacts) {
      if (!contact.phone) {
        skipped++;
        continue;
      }

      const existing =
        await db.contact.findUnique({
          where: {
            phone:
              contact.phone,
          },
        });

      if (existing) {
        skipped++;
        continue;
      }

      await db.contact.create({
        data: {
          name:
            contact.name ??
            "",
          phone:
            contact.phone,
          email:
            contact.email ??
            null,
          company:
            contact.company ??
            null,
          city:
            contact.city ??
            null,
          state:
            contact.state ??
            null,
          tags:
            contact.tags ??
            [],
          notes:
            contact.notes ??
            null,
        },
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
    });
  }

  // ----------------------------
  // SINGLE CONTACT
  // ----------------------------

  const contact =
    await db.contact.create({
      data: {
        name: body.name,
        phone: body.phone,
        email:
          body.email,
        company:
          body.company,
        city: body.city,
        state:
          body.state,
        tags:
          body.tags,
        notes:
          body.notes,
      },
    });

  return NextResponse.json(
    contact
  );
}