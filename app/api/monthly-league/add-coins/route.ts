import { NextRequest, NextResponse } from 'next/server';

import { addCoins } from '@/lib/monthly-league/service';

export async function POST(
  request: NextRequest,
) {

  const body = await request.json();

  const now = new Date();

  const month = now.getMonth() + 1;

  const year = now.getFullYear();

  await addCoins(

    body.playerId,

    body.playerName,

    body.playerAvatar ?? null,

    Number(body.coins),

    month,

    year,
  );

  return NextResponse.json({
    success: true,
  });
}