import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameMode } from '../../interfaces/GameState';
import Leaderboard from '../Leaderboard';
import { getGameModeName } from '../GameUtils';
import { slideInAndOutVariant } from '../../constants/overlayVariants';

interface GameModeSelectionOverlayProps {
  onSelectGameMode: (gameMode: GameMode) => void;
}

/**
 * Framer motion variants for the leaderboard container.
 */
const leaderboardVariants = {
  hidden: {
    maxHeight: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  visible: {
    maxHeight: '500px',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    maxHeight: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

/**
 * Framer motion variants for the game mode "radiobuttons".
 */
const radioButtonVariants = {
  selected: {
    backgroundColor: ['#FFFFFF', '#5f5f92'],
    color: '#FFFFFF',
    scale: 1.1,
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
    border: '1px solid #5f5f92',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  unselected: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    scale: 1,
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0)',
    border: '1px solid #5f5f92',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

/**
 * Used for displaying the game mode selection screen.
 */
const GameModeSelectionOverlay: React.FC<GameModeSelectionOverlayProps> = ({
  onSelectGameMode,
}) => {
  const [selectedMode, setSelectedMode] = useState(GameMode.World);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const gameModes = Object.values(GameMode);

  const onGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(event.target.value as GameMode);
  };

  const onStartGame = () => {
    onSelectGameMode(selectedMode);
  };

  return (
    <motion.div
      className="overlay game-mode-selection"
      variants={slideInAndOutVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="padding-sides-1">
        <h2 className="center">Choose Your Challenge:</h2>
        <form>
          <div className="game-mode-options-container">
            {gameModes.map((mode) => (
              <div className="game-mode-option" key={mode}>
                <input
                  type="radio"
                  id={mode}
                  name="gameMode"
                  value={mode}
                  checked={selectedMode === mode}
                  onChange={onGameModeChange}
                  className="game-mode-radio"
                />
                <motion.label
                  htmlFor={mode}
                  className="game-mode-label"
                  variants={radioButtonVariants}
                  animate={selectedMode === mode ? 'selected' : 'unselected'}
                >
                  {getGameModeName(mode)}
                </motion.label>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showLeaderboard && (
              <motion.div
                variants={leaderboardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="leaderboard-container"
              >
                <Leaderboard gameMode={selectedMode} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="button-container">
            <button
              type="button"
              className="button start-button"
              onClick={onStartGame}
            >
              Start Game
            </button>
            <button
              type="button"
              className="button leaderboard-button"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default GameModeSelectionOverlay;
