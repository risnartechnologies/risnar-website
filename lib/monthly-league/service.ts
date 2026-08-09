import pool from './db';

export async function getTop3(
  month: number,
  year: number,
) {
  const [rows] = await pool.query(
    `
    SELECT
      player_id,
      player_name,
      player_avatar,
      coins
    FROM monthly_league
    WHERE month = ?
      AND year = ?
    ORDER BY coins DESC
    LIMIT 3
    `,
    [month, year],
  );

  return rows;
}

export async function getTop100(
  month: number,
  year: number,
) {
  const [rows] = await pool.query(
    `
    SELECT
      player_id,
      player_name,
      player_avatar,
      coins
    FROM monthly_league
    WHERE month = ?
      AND year = ?
    ORDER BY coins DESC
    LIMIT 100
    `,
    [month, year],
  );

  return rows;
}

export async function getMyRank(
  playerId: string,
  month: number,
  year: number,
) {

  const [rankRows]: any = await pool.query(
    `
    SELECT
      COUNT(*) + 1 AS player_rank
    FROM monthly_league
    WHERE month = ?
      AND year = ?
      AND coins >
      (
        SELECT coins
        FROM monthly_league
        WHERE player_id = ?
          AND month = ?
          AND year = ?
        LIMIT 1
      )
    `,
    [
      month,
      year,
      playerId,
      month,
      year,
    ],
  );

  const [playerRows]: any = await pool.query(
    `
    SELECT
      player_id,
      player_name,
      player_avatar,
      coins
    FROM monthly_league
    WHERE player_id = ?
      AND month = ?
      AND year = ?
    LIMIT 1
    `,
    [
      playerId,
      month,
      year,
    ],
  );

  const [totalRows]: any = await pool.query(
    `
    SELECT COUNT(*) AS totalPlayers
    FROM monthly_league
    WHERE month = ?
      AND year = ?
    `,
    [
      month,
      year,
    ],
  );

  if (playerRows.length === 0) {
    return null;
  }

  return {

    rank:
        rankRows[0].player_rank,

    totalPlayers:
        totalRows[0].totalPlayers,

    playerId:
        playerRows[0].player_id,

    playerName:
        playerRows[0].player_name,

    playerAvatar:
        playerRows[0].player_avatar,

    coins:
        playerRows[0].coins,
  };
}