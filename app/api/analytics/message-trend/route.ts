import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma/db";

export async function GET(
  request: NextRequest
) {
  try {
    const range =
      request.nextUrl.searchParams.get(
        "range"
      ) ?? "30d";

      const from =
  request.nextUrl.searchParams.get(
    "from"
  );

const to =
  request.nextUrl.searchParams.get(
    "to"
  );

    const now = new Date();

    let start = new Date(now);

    let labels: string[] = [];

    switch (range) {

      case "custom":
  if (from && to) {
    start = new Date(from);
  }
  break;

      case "24h":
        start.setHours(
          now.getHours() - 23,
          0,
          0,
          0
        );
        break;

      case "7d":
        start.setDate(
          now.getDate() - 6
        );
        start.setHours(0, 0, 0, 0);
        break;

      case "30d":
        start.setDate(
          now.getDate() - 29
        );
        start.setHours(0, 0, 0, 0);
        break;

      case "90d":
        start.setDate(
          now.getDate() - 89
        );
        start.setHours(0, 0, 0, 0);
        break;

      case "12m":
        start = new Date(
          now.getFullYear(),
          now.getMonth() - 11,
          1
        );
        break;
    }

let end = now;

if (
  range === "custom" &&
  to
) {
  end = new Date(to);

  end.setHours(
    23,
    59,
    59,
    999
  );
}

const messages =
  await db.message.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      createdAt: true,
    },
  });

    const trend = [];

    if (range === "24h") {
      for (let i = 0; i < 24; i++) {
        const hour =
          new Date(start);

        hour.setHours(
          start.getHours() + i
        );

        trend.push({
          date:
            hour
              .getHours()
              .toString()
              .padStart(2, "0") + ":00",
          messages:
            messages.filter(
              (m) => {
                const d =
                  new Date(
                    m.createdAt
                  );

                return (
                  d.getFullYear() ===
                    hour.getFullYear() &&
                  d.getMonth() ===
                    hour.getMonth() &&
                  d.getDate() ===
                    hour.getDate() &&
                  d.getHours() ===
                    hour.getHours()
                );
              }
            ).length,
        });
      }
    } else if (
      range === "12m"
    ) {
      for (let i = 0; i < 12; i++) {
        const month =
          new Date(
            start.getFullYear(),
            start.getMonth() + i,
            1
          );

        trend.push({
          date:
            month.toLocaleString(
              "en-IN",
              {
                month: "short",
              }
            ),

          messages:
            messages.filter(
              (m) => {
                const d =
                  new Date(
                    m.createdAt
                  );

                return (
                  d.getFullYear() ===
                    month.getFullYear() &&
                  d.getMonth() ===
                    month.getMonth()
                );
              }
            ).length,
        });
      }
    } else {
let days;

if (range === "custom") {
  days =
    Math.max(
      1,
      Math.ceil(
        (end.getTime() -
          start.getTime()) /
          86400000
      ) + 1
    );
} else {
  days =
    range === "7d"
      ? 7
      : range === "30d"
      ? 30
      : 90;
}

      for (
        let i = 0;
        i < days;
        i++
      ) {
        const day =
          new Date(start);

        day.setDate(
          start.getDate() + i
        );

        trend.push({
          date:
            day.toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
              }
            ),

          messages:
            messages.filter(
              (m) => {
                const d =
                  new Date(
                    m.createdAt
                  );

                return (
                  d.getFullYear() ===
                    day.getFullYear() &&
                  d.getMonth() ===
                    day.getMonth() &&
                  d.getDate() ===
                    day.getDate()
                );
              }
            ).length,
        });
      }
    }

    return NextResponse.json(
      trend
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}