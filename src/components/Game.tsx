import React, { useContext, useCallback } from 'react';

import { AnimatePresence } from 'framer-motion';
import { GameContext } from '../contexts/GameContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { GameStage } from '../interfaces/GameState';
import { GAME_TIME_LIMIT } from '../constants/constants';
import useAntiCheat from '../hooks/useAntiCheat';
import useTimer from '../hooks/useTimer';
import useGameManager from '../hooks/useGameManager';
import usePreventPinchZoom from '../hooks/usePreventPinchZoom';
import Notification from './Notification';
import Map from './Map';
import InstructionsStage from './stages/InstructionsStage';
import RunningStage from './stages/RunningStage';
import RoundWonStage from './stages/RoundWonStage';
import GameOverStage from './stages/GameOverStage';
import GameModeSelectionStage from './stages/GameModeSelectionStage';
import GameInitializer from './GameInitializer';

/**
 * Main component for the game.
 */
const Game: React.FC = () => {
  const { gameMode, gameStage, dispatch } = useContext(GameContext);
  const { notification } = useContext(NotificationContext);

  useAntiCheat(gameStage);
  usePreventPinchZoom();

  const onTimeUp = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, [dispatch]);

  const { timeLeft, startTimer, resetTimer, pauseTimer, isTimerRunning } =
    useTimer(GAME_TIME_LIMIT, onTimeUp);

  const {
    onStartNewGame,
    openGameModeSelection,
    onNextRound,
    onUsedClue,
    onMapClick,
  } = useGameManager({
    resetTimer,
    pauseTimer,
  });

  const onCountdownFinish = useCallback(() => {
    startTimer();
    dispatch({ type: 'SET_GAME_STAGE', payload: GameStage.Running });
  }, [startTimer, dispatch]);

  const renderOverlays = () => {
    let stageComponent;

    switch (gameStage) {
      case GameStage.Instructions:
        stageComponent = (
          <InstructionsStage
            key="instructionsStage"
            onInstructionsAcknowledged={openGameModeSelection}
          />
        );
        break;

      case GameStage.GameModeSelection:
        stageComponent = (
          <GameModeSelectionStage
            key="gameModeSelectionStage"
            onStartNewGame={onStartNewGame}
          />
        );
        break;

      case GameStage.Countdown:
      case GameStage.Running:
        stageComponent = (
          <RunningStage
            key="runningStage"
            isTimerRunning={isTimerRunning}
            onCountdownFinish={onCountdownFinish}
            timeLeft={timeLeft}
            onUsedClue={onUsedClue}
          />
        );
        break;

      case GameStage.RoundWon:
        stageComponent = (
          <RoundWonStage key="roundWonStage" onNextRound={onNextRound} />
        );
        break;

      case GameStage.GameOver:
        stageComponent = (
          <GameOverStage
            key="gameOverStage"
            onStartNewGame={onStartNewGame}
            onOpenGameModeSelection={openGameModeSelection}
          />
        );
        break;

      default:
        stageComponent = null;
    }

    return <AnimatePresence>{stageComponent}</AnimatePresence>;
  };

  return (
    <>
      <GameInitializer />
      <Notification notification={notification} />
      <Map gameMode={gameMode} onMapClick={onMapClick}>
        {renderOverlays()}
      </Map>
    </>
  );
};

export default React.memo(Game);
