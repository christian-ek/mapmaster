import { useState, useEffect, useCallback } from 'react';
import { GAME_TIME_LIMIT } from '../constants/constants';

/**
 * Custom hook for the game timer functionality.
 */
function useTimer(initialTime = GAME_TIME_LIMIT, onTimeUp = () => {}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [triggerTimeUp, setTriggerTimeUp] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setTriggerTimeUp(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    setTriggerTimeUp(false);
  }, [initialTime]);

  /**
   * useEffect is used to decrement timeLeft each second and trigger onTimeUp at 0
   */
  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time === 0) {
          clearInterval(interval);
          return time;
        }
        const newTime = time - 1;
        if (newTime === 0) {
          setTriggerTimeUp(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  /**
   * useEffect is used to trigger onTimeUp when triggerTimeUp is true
   */
  useEffect(() => {
    if (triggerTimeUp) {
      onTimeUp();
    }
  }, [triggerTimeUp, onTimeUp]);

  const isTimerRunning = isRunning;

  return { timeLeft, startTimer, pauseTimer, resetTimer, isTimerRunning };
}

export default useTimer;
