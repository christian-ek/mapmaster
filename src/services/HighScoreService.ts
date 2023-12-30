import { HighScore } from '../interfaces/HighScore';
import supabase from '../clients/SupaBaseClient';
import { GameMode } from '../interfaces/GameState';

/**
 * Service class for managing high scores.
 */
export class HighScoreService {
  /**
   * Fetches the high scores from the database.
   */
  public static async fetchHighScores(
    gameMode: GameMode
  ): Promise<HighScore[]> {
    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .eq('game_mode', gameMode)
      .order('score', { ascending: false })
      .limit(3);

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Adds a new high score to the database.
   */
  public static async addHighScore(newScore: HighScore): Promise<void> {
    const { error } = await supabase.from('high_scores').insert([newScore]);

    if (error) throw new Error(error.message);
  }
}

export default HighScoreService;
