import { NextResponse } from "next/server";
import { db } from "@/lib/prisma/db";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const page = Number(
    searchParams.get("page") ?? "1"
  );

  const limit = Number(
    searchParams.get("limit") ?? "25"
  );

  const search =
    searchParams
      .get("search")
      ?.trim() ?? "";

  const where: Prisma.ContactWhereInput =
    {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        phone: {
          contains: search,
        },
      },
    ];
  }

  const [contacts, total] =
    await Promise.all([
      db.contact.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip:
          (page - 1) * limit,
        take: limit,
      }),

      db.contact.count({
        where,
      }),
    ]);

  return NextResponse.json({
    contacts,
    total,
    page,
    totalPages: Math.ceil(
      total / limit
    ),
  });
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    // ----------------------------
    // BULK IMPORT
    // ----------------------------

    if (
      Array.isArray(body.contacts)
    ) {
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
            tags: null,
            notes:
              contact.notes ??
              null,
          },
        });

        imported++;
      }

      return NextResponse.json({
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
          phone:
            body.phone,
          email:
            body.email,
          company:
            body.company,
          city:
            body.city,
          state:
            body.state,
          tags: null,
          notes:
            body.notes,
        },
      });

    return NextResponse.json(
      contact
    );

  } catch (error) {

    console.error(
      "CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof
          Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );

  }
}