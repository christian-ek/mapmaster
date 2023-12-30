import { GameMode } from './GameState';

export interface HighScore {
  id?: number;
  username: string;
  score: number;
  created_at?: string;
  game_mode: GameMode;
}

export interface HighScoreResponse {
  data: HighScore[] | null;
  error: Error | null;
}
