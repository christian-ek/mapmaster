import React, { useState, useEffect, useContext, useCallback } from 'react';
import { HighScoreService } from '../services/HighScoreService';
import { HighScore } from '../interfaces/HighScore';
import LeaderboardEntryOverlay from './overlays/LeaderboardEntryOverlay';
import { NotificationContext } from '../contexts/NotificationContext';
import { GameMode } from '../interfaces/GameState';
import { getGameModeName } from './GameUtils';

interface LeaderboardProps {
  playerScore?: number;
  gameMode: GameMode;
}

/**
 * Used for displaying the leaderboard.
 */
const Leaderboard: React.FC<LeaderboardProps> = ({
  playerScore = 0,
  gameMode,
}) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEntryOverlay, setShowEntryOverlay] = useState(false);
  const [newEntryName, setNewEntryName] = useState('');
  const { setNotification } = useContext(NotificationContext);
  const [hasBeenPromptedForEntry, setHasBeenPromptedForEntry] = useState(false);

  /**
   * useCallback for loading high scores and prompting for entry if player has a high score
   */
  const loadHighScores = useCallback(async () => {
    setIsLoading(true);
    try {
      const scores = await HighScoreService.fetchHighScores(gameMode);
      setHighScores(scores);
      if (
        !hasBeenPromptedForEntry &&
        playerScore > 0 &&
        (scores.length < 3 || playerScore > scores[scores.length - 1].score)
      ) {
        setShowEntryOverlay(true);
        setHasBeenPromptedForEntry(true);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to load high score. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [playerScore, setNotification, gameMode, hasBeenPromptedForEntry]);

  /*
   * useEffect for loading high scores when component is mounted
   */
  useEffect(() => {
    loadHighScores();
  }, [loadHighScores]);

  const onNewEntrySubmit = useCallback(
    (username: string) => {
      setNewEntryName(username);
      setShowEntryOverlay(false);
      loadHighScores();
    },
    [loadHighScores]
  );

  /**
   * Formats the score with spaces between thousands
   */
  const formatPoints = (score: number) =>
    `${score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} p`;

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 0:
        return '🏆';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  };

  return (
    <div className="leaderboard">
      <h3 className="leaderboard-title">
        Leaderboard - {getGameModeName(gameMode)}
      </h3>

      {isLoading ? (
        <div className="container">
          <div className="loading-indicator" />
        </div>
      ) : (
        <>
          {showEntryOverlay && (
            <LeaderboardEntryOverlay
              totalPoints={playerScore}
              gameMode={gameMode}
              onClose={() => setShowEntryOverlay(false)}
              onNewEntrySubmit={onNewEntrySubmit}
            />
          )}

          {highScores.length > 0 ? (
            <ul>
              {highScores.map((score, index) => {
                const isCurrentUser = score.username === newEntryName;
                const listItemClass = isCurrentUser ? 'highlighted-player' : '';
                return (
                  <li key={score.id} className={listItemClass}>
                    <span className="rank-emoji">{getRankEmoji(index)}</span>
                    <span>{score.username}</span>
                    <span className="score">{formatPoints(score.score)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="no-scores-message">🏆 No high scores available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
