import React, { useContext } from 'react';
import GameOverOverlay from '../overlays/GameOverOverlay';
import { GameContext } from '../../contexts/GameContext';
import { GameMode } from '../../interfaces/GameState';

interface GameOverStageProps {
  onStartNewGame: (gameMode: GameMode) => void;
  onOpenGameModeSelection: () => void;
}

/**
 * Stage shown when the game is over.
 */
const GameOverStage: React.FC<GameOverStageProps> = ({
  onStartNewGame,
  onOpenGameModeSelection,
}) => {
  const { gameMode } = useContext(GameContext);

  const onRestartGame = () => {
    onStartNewGame(gameMode);
  };

  return (
    <GameOverOverlay
      onStartNewGame={onRestartGame}
      onOpenGameModeSelection={onOpenGameModeSelection}
    />
  );
};

export default GameOverStage;
