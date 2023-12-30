import { useCallback, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { GameMode, GameStage } from '../interfaces/GameState';
import { CountryService } from '../services/CountryService';
import { calculatePoints } from '../components/GameUtils';
import useMapInteraction from './useMapInteraction';

interface GameManagerProps {
  resetTimer: () => void;
  pauseTimer: () => void;
}

/**
 * Custom hook for managing the game state and logic.
 */
function useGameManager({ resetTimer, pauseTimer }: GameManagerProps) {
  const { gameMode, points, dispatch } = useContext(GameContext);

  const onCorrectGuess = useCallback(() => {
    const { roundPoints, netRoundPoints } = calculatePoints(points.usedClue);
    dispatch({ type: 'SET_ROUND_POINTS', payload: roundPoints });
    dispatch({
      type: 'UPDATE_POINTS',
      payload: {
        totalPoints: points.totalPoints + netRoundPoints,
        roundPoints,
        netRoundPoints,
        usedClue: points.usedClue,
      },
    });
    dispatch({ type: 'CORRECT_GUESS' });
    pauseTimer();
  }, [dispatch, points, pauseTimer]);

  const newRound = useCallback(
    async (selectedGameMode: GameMode) => {
      dispatch({ type: 'NEW_ROUND' });
      const randomCountry =
        await CountryService.getRandomCountry(selectedGameMode);
      dispatch({ type: 'SET_WANTED_COUNTRY', payload: randomCountry });
    },
    [dispatch]
  );

  const onStartNewGame = useCallback(
    async (selectedGameMode: GameMode) => {
      dispatch({ type: 'START_GAME', payload: selectedGameMode });
      await newRound(selectedGameMode);
      resetTimer();
    },
    [dispatch, newRound, resetTimer]
  );

  const openGameModeSelection = useCallback(async () => {
    dispatch({ type: 'SET_GAME_STAGE', payload: GameStage.GameModeSelection });
  }, [dispatch]);

  const onNextRound = useCallback(() => {
    newRound(gameMode);
  }, [newRound, gameMode]);

  const onUsedClue = useCallback(() => {
    if (!points.usedClue) {
      dispatch({
        type: 'UPDATE_POINTS',
        payload: {
          ...points,
          usedClue: true,
        },
      });
    }
  }, [dispatch, points]);

  const { onMapClick } = useMapInteraction({ onCorrectGuess });

  return {
    onStartNewGame,
    openGameModeSelection,
    onNextRound,
    onUsedClue,
    onMapClick,
  };
}

export default useGameManager;
