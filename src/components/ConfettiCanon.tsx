import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface ConfettiOptions {
  angle?: number;
  spread?: number;
  startVelocity?: number;
  particleCount?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  decay?: number;
  gravity?: number;
  ticks?: number;
  scalar?: number;
}

type ConfettiInstance = {
  (options: ConfettiOptions): void;
};

/**
 * Used for firing confetti.
 */
const ConfettiCanon: React.FC = () => {
  const refAnimationInstance = useRef<ConfettiInstance | null>(null);
  const [fireCount, setFireCount] = useState(1);
  const maxFireCount = 4;

  const getInstance = useCallback((instance: ConfettiInstance | null) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback(
    (particleRatio: number, options: ConfettiOptions) => {
      if (refAnimationInstance.current) {
        refAnimationInstance.current({
          ...options,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 + 0.2,
          },
          particleCount: Math.floor(200 * particleRatio),
          colors: [
            '#26ccff',
            '#a25afd',
            '#ff5e7e',
            '#88ff5a',
            '#fcff42',
            '#ffa62d',
            '#ff36ff',
          ],
        });
      }
    },
    []
  );

  const fireConfetti = useCallback(() => {
    makeShot(0.3, { angle: 90, spread: 26, startVelocity: 55 });
    makeShot(0.4, { angle: 120, spread: 60, startVelocity: 45 });
    makeShot(0.3, { angle: 60, spread: 100, startVelocity: 35 });
    makeShot(0.5, { angle: 75, spread: 120, startVelocity: 25 });
    makeShot(0.5, { angle: 45, spread: 120, startVelocity: 45 });
  }, [makeShot]);

  /**
   * useEffect for firing confetti
   */
  useEffect(() => {
    fireConfetti();

    const interval = setInterval(() => {
      if (fireCount < maxFireCount) {
        fireConfetti();
        setFireCount(fireCount + 1);
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [fireConfetti, fireCount]);

  return <ReactCanvasConfetti refConfetti={getInstance} className="canvas" />;
};

export default ConfettiCanon;
