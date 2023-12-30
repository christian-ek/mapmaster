import React from 'react';
import { motion } from 'framer-motion';
import { fadeInSlideLeftVariant } from '../../constants/overlayVariants';

interface InstructionsOverlayProps {
  onInstructionsAcknowledged: () => void;
}

/**
 * Used for displaying instructions.
 */
const InstructionsOverlay: React.FC<InstructionsOverlayProps> = ({
  onInstructionsAcknowledged,
}) => {
  return (
    <motion.div
      className="overlay info-overlay"
      variants={fadeInSlideLeftVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="padding-sides-1">
        <h1 className="rocher mapmaster center">MapMaster</h1>
        <div>
          <h3 className="center">Follow these steps to play:</h3>
          <ol>
            <li>
              <strong>Start the game:</strong> Guess the country of the
              displayed flag.
            </li>
            <li>
              <strong>Mark your answer:</strong> Click on the country on the
              world map that you think matches the displayed flag.
            </li>
            <li>
              <strong>Earn Points:</strong> Each correct guess awards 100
              points.
            </li>
            <li>
              <strong>Clues:</strong> Use &apos;Clues&apos; for help. Using a
              clue deducts 50 points from the reward for that flag.
            </li>
            <li>
              <strong>Time Limit:</strong> You have 3 minutes to collect as many
              points as possible. Act quickly and accurately!
            </li>
            <li>
              <strong>Stay Focused:</strong> Game ends if you move away from the
              game screen.
            </li>
          </ol>
          <p className="center no-margin-bottom">
            Test your skills and see how many flags you can identify in time!
          </p>
        </div>
        <div className="button-container">
          <button
            onClick={onInstructionsAcknowledged}
            className="button one-button-layout"
            type="button"
          >
            Let&apos;s Play!
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructionsOverlay;
