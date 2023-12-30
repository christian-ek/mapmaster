import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { HighScoreService } from '../../services/HighScoreService';
import { NotificationContext } from '../../contexts/NotificationContext';
import { GameMode } from '../../interfaces/GameState';
import { fadeInUpAndExitDownVariant } from '../../constants/overlayVariants';

interface LeaderboardEntryOverlayProps {
  totalPoints: number;
  gameMode: GameMode;
  onClose: () => void;
  onNewEntrySubmit: (username: string) => void;
}

/**
 * Used for displaying the leaderboard entry overlay where the player can submit their high score.
 */
const LeaderboardEntryOverlay: React.FC<LeaderboardEntryOverlayProps> = ({
  totalPoints,
  gameMode,
  onClose,
  onNewEntrySubmit,
}) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setNotification } = useContext(NotificationContext);

  /**
   * Handles the form submission from the player when they submit their high score.
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await HighScoreService.addHighScore({
        username,
        score: totalPoints,
        game_mode: gameMode,
      });
      onNewEntrySubmit(username);
      onClose();
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to submit your high score. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="overlay leaderboard-entry-overlay"
      variants={fadeInUpAndExitDownVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="congratulatory-message">
        <h2>Congratulations! 🎉</h2>
        <p>
          You&apos;ve scored {totalPoints} points and made it to the
          leaderboard!
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="leaderboard-input"
          required
          maxLength={25}
        />
        <div className="button-container">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`button submit-button ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? (
              <span className="loader" />
            ) : (
              <span className="button-text">Submit</span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LeaderboardEntryOverlay;
