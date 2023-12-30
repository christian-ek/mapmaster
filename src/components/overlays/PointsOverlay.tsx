import { useContext, FC } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../contexts/GameContext';
import { slideInFromRightVariant } from '../../constants/overlayVariants';

/**
 * Used for displaying the total points the player scored.
 */
const PointsOverlay: FC = () => {
  const { points } = useContext(GameContext);

  return (
    <motion.div
      className="overlay points-overlay"
      variants={slideInFromRightVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="content">
        <p className="text">
          Total Points: <strong>{points.totalPoints}</strong>
        </p>
      </div>
    </motion.div>
  );
};

export default PointsOverlay;
