import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../contexts/GameContext';
import Leaderboard from '../Leaderboard';
import { fadeInSlideLeftVariant } from '../../constants/overlayVariants';

interface GameOverOverlayProps {
  onStartNewGame: () => void;
  onOpenGameModeSelection: () => void;
}

/**
 * Used for displaying the total points the player scored, the correct country and the leaderboard.
 */
const GameOverOverlay: React.FC<GameOverOverlayProps> = ({
  onStartNewGame,
  onOpenGameModeSelection,
}) => {
  const { points, gameMode, wantedCountry } = useContext(GameContext);

  return (
    <motion.div
      className="overlay game-over-overlay"
      variants={fadeInSlideLeftVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3 className="game-over-header">You&apos;ve scored a total of:</h3>
      <h1 className="rocher game-over-points">{points.totalPoints} p</h1>
      <div className="game-over-country">
        <p className="wanted-country-title">The correct country was:</p>
        <div className="country-name">
          <strong>{wantedCountry?.name.common}</strong>
        </div>
      </div>

      <Leaderboard gameMode={gameMode} playerScore={points.totalPoints} />

      <div className="button-container">
        <button
          onClick={onStartNewGame}
          className="button two-button-layout"
          type="button"
        >
          Restart Game
        </button>
        <button
          onClick={onOpenGameModeSelection}
          className="button two-button-layout"
          type="button"
        >
          New game
        </button>
      </div>
    </motion.div>
  );
};

export default GameOverOverlay;
