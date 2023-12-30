import React from 'react';
import GameModeSelectionOverlay from '../overlays/GameModeSelectionOverlay';
import { GameMode } from '../../interfaces/GameState';

interface GameModeSelectionStageProps {
  onStartNewGame: (gameMode: GameMode) => void;
}

/**
 * Stage shown when selecting the game mode.
 */
const GameModeSelectionStage: React.FC<GameModeSelectionStageProps> = ({
  onStartNewGame,
}) => {
  return <GameModeSelectionOverlay onSelectGameMode={onStartNewGame} />;
};

export default GameModeSelectionStage;
