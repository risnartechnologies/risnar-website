import { NextResponse } from 'next/server';

import { getTop100 } from '@/lib/monthly-league/service';

export async function GET() {

  const now = new Date();

  const month = now.getMonth() + 1;

  const year = now.getFullYear();

  const players = await getTop100(
    month,
    year,
  );

  return NextResponse.json(players);
}