import { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { slideAndPulseVariant } from '../../constants/overlayVariants';

interface TimerOverlayProps {
  timeLeft: number;
}

/*
 * Used for displaying the time left before the game ends.
 */
const TimerOverlay: FC<TimerOverlayProps> = ({ timeLeft }) => {
  const controls = useAnimation();
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    controls.start('visible');

    if (timeLeft <= 10) {
      controls.start('pulse');
    }
  }, [timeLeft, controls]);

  const initialVariant = window.innerWidth > 768 ? 'hiddenLeft' : 'hiddenRight';

  return (
    <motion.div
      className="overlay timer-overlay"
      variants={slideAndPulseVariant}
      initial={initialVariant}
      animate={controls}
    >
      <div className="content">
        <p className="text">
          Time left:{' '}
          <strong>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </strong>
        </p>
      </div>
    </motion.div>
  );
};

export default TimerOverlay;
