import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../contexts/GameContext';
import { CLUE_PENALTY } from '../../constants/constants';
import { fadeInSlideDownVariant } from '../../constants/overlayVariants';

interface RoundWinOverlayProps {
  onNextRound: () => void;
}

/**
 * Used for displaying the points the player scored in the round.
 */
const RoundWinOverlay: React.FC<RoundWinOverlayProps> = ({ onNextRound }) => {
  const { points, wantedCountry } = useContext(GameContext);
  const [displayedTotalPoints, setDisplayedTotalPoints] = useState(
    points.totalPoints - points.netRoundPoints
  );

  /**
   * useEffect hook for adding an effect that counts the total points up to the new total points.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedTotalPoints((prev) => {
        const nextValue = prev + 1;
        if (nextValue >= points.totalPoints) {
          clearInterval(intervalId);
          return points.totalPoints;
        }
        return nextValue;
      });
    }, 30);
    return () => clearInterval(intervalId);
  }, [points.totalPoints]);

  return (
    <motion.div
      className="overlay round-win-overlay"
      variants={fadeInSlideDownVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>
        <h1 className="rocher round-win">Round won!</h1>
        <div className="round-win-country">
          <p className="wanted-country-title">The correct country was:</p>
          <div className="country-name">
            <strong>{wantedCountry?.name.common}</strong>
          </div>
        </div>

        <div className="score-calculation">
          {points.usedClue && (
            <div className="score-row">
              <p className="title">Earned Points:</p>
              <p className="points">{points.roundPoints} p</p>
            </div>
          )}

          {points.usedClue && (
            <div className="score-row">
              <p className="title">Clue Penalty:</p>
              <p className="points penalty-points">-{CLUE_PENALTY} p</p>
            </div>
          )}

          <div className="score-row">
            <p className="title">Round Points:</p>
            <p className="points">{points.netRoundPoints} p</p>
          </div>

          <div className="total-row">
            <p className="title">Total Points:</p>
            <p className="points points">{displayedTotalPoints} p</p>
          </div>
        </div>

        <div className="button-container">
          <button
            onClick={onNextRound}
            className="button one-button-layout"
            type="button"
          >
            Next Round
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoundWinOverlay;
