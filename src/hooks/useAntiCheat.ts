import { useEffect, useContext } from 'react';
import { GameStage } from '../interfaces/GameState';
import { NotificationContext } from '../contexts/NotificationContext';
import { GameContext } from '../contexts/GameContext';

/**
 * Custom hook that handles anti-cheat functionality.
 * It listens for visibility change and blur events to detect cheating attempts.
 */
const useAntiCheat = (gameStage: GameStage) => {
  const { dispatch } = useContext(GameContext);
  const { setNotification } = useContext(NotificationContext);

  /*
   * useEffect hook is used to listen for visibility change and blur events.
   */
  useEffect(() => {
    const onCheatAttempt = () => {
      if (gameStage === GameStage.Running) {
        dispatch({ type: 'SET_GAME_STAGE', payload: GameStage.GameOver });
        setNotification({
          type: 'icon',
          icon: '💩',
          message:
            'Oops! You switched windows, so we had to end the game. Better luck next time!',
        });
      }
    };

    document.addEventListener('visibilitychange', onCheatAttempt);
    window.addEventListener('blur', onCheatAttempt);

    return () => {
      document.removeEventListener('visibilitychange', onCheatAttempt);
      window.removeEventListener('blur', onCheatAttempt);
    };
  }, [gameStage, dispatch, setNotification]);
};

export default useAntiCheat;
