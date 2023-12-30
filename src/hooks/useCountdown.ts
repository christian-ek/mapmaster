import { useState, useEffect } from 'react';

/**
 * Custom hook that implements a countdown timer.
 */
function useCountdown(initialCount = 3, onCountdownFinish = () => {}) {
  const [countdown, setCountdown] = useState(initialCount);

  /**
   * useEffect is used to decrement countdown each second and trigger onCountdownFinish at 0
   */
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      onCountdownFinish();
      setCountdown(-1); // stops the countdown
    }
  }, [countdown, onCountdownFinish]);

  return countdown;
}

export default useCountdown;
