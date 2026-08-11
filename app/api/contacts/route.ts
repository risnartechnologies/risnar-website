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
    searchParams.get("limit") ?? "500"
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

if (Array.isArray(body.contacts)) {
  const contacts: Prisma.ContactCreateManyInput[] =
    body.contacts
      .map((contact: any) => ({
        name: contact.name ?? "",
        phone:
          typeof contact.phone === "string"
            ? contact.phone.trim()
            : "",
        email: contact.email ?? null,
        company: contact.company ?? null,
        city: contact.city ?? null,
        state: contact.state ?? null,
        tags: null,
        notes: contact.notes ?? null,
      }))
      .filter(
        (contact: Prisma.ContactCreateManyInput) =>
          Boolean(contact.phone)
      );

  if (contacts.length === 0) {
    return NextResponse.json({
      imported: 0,
      skipped: body.contacts.length,
    });
  }

  // Remove duplicate phone numbers
  // inside the CSV itself.
  const uniqueContactsMap =
    new Map<string, Prisma.ContactCreateManyInput>();

  for (const contact of contacts) {
    if (!uniqueContactsMap.has(contact.phone)) {
      uniqueContactsMap.set(
        contact.phone,
        contact
      );
    }
  }

  const uniqueContacts =
    Array.from(
      uniqueContactsMap.values()
    );

  // Find existing contacts in ONE query.
  const existingContacts =
    await db.contact.findMany({
      where: {
        phone: {
          in: uniqueContacts.map(
            (contact) => contact.phone
          ),
        },
      },
      select: {
        phone: true,
      },
    });

  const existingPhones = new Set(
    existingContacts.map(
      (contact) => contact.phone
    )
  );

  // Only insert genuinely new contacts.
  const newContacts =
    uniqueContacts.filter(
      (contact) =>
        !existingPhones.has(
          contact.phone
        )
    );

  let imported = 0;

  if (newContacts.length > 0) {
    const result =
      await db.contact.createMany({
        data: newContacts,
        skipDuplicates: true,
      });

    imported = result.count;
  }

  const skipped =
    body.contacts.length -
    imported;

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