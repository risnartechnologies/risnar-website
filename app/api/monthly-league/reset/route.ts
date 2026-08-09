import { NextResponse } from 'next/server';

import pool from '@/lib/monthly-league/db';

export async function POST() {

  await pool.query(`
    UPDATE monthly_league
    SET coins = 0,
        rank_position = 0
    WHERE month = MONTH(CURDATE())
      AND year = YEAR(CURDATE())
  `);

  return NextResponse.json({
    success: true,
  });
}