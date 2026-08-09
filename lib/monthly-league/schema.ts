export interface MonthlyLeaguePlayer {

  id: number;

  playerId: string;

  playerName: string;

  playerAvatar: string | null;

  coins: number;

  rankPosition: number;

  month: number;

  year: number;

  country: string | null;

  lastCoinAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

export interface TopPlayer {

  rank: number;

  playerId: string;

  playerName: string;

  playerAvatar: string | null;

  coins: number;
}

export interface MyRank {

  rank: number;

  totalPlayers: number;

  coins: number;

  playerId: string;

  playerName: string;

  playerAvatar: string | null;
}