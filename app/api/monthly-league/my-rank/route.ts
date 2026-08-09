import { NextRequest, NextResponse } from 'next/server';

import { getMyRank } from '@/lib/monthly-league/service';

export async function GET(
  request: NextRequest,
) {

  const playerId =
      request.nextUrl.searchParams.get(
        'playerId',
      );

  if (!playerId) {
    return NextResponse.json(
      {
        error: 'Missing playerId',
      },
      {
        status: 400,
      },
    );
  }

  const now = new Date();

  const month = now.getMonth() + 1;

  const year = now.getFullYear();

  const rank = await getMyRank(
    playerId,
    month,
    year,
  );

  return NextResponse.json(rank);
}