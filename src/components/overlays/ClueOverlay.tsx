import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '../../contexts/GameContext';
import { fadeInAndOutVariant } from '../../constants/overlayVariants';

interface ClueOverlayProps {
  onUseClue: () => void;
  isTimerRunning: boolean;
}

/**
 * Used for displaying clues about the country the player needs to guess.
 */
const ClueOverlay: React.FC<ClueOverlayProps> = ({
  onUseClue,
  isTimerRunning,
}) => {
  const { wantedCountry } = useContext(GameContext);
  const [showClue, setShowClue] = useState<boolean>(false);

  if (!wantedCountry) {
    return null;
  }

  const toggleClue = () => {
    if (!showClue) {
      onUseClue();
    }
    setShowClue(!showClue);
  };

  const shouldDisplayCluesButton = isTimerRunning && wantedCountry;

  /*
   * Function used to get the currency details of the country.
   */
  const getCurrencyDetails = () => {
    const currencyKeys = Object.keys(wantedCountry.currencies || {});
    if (currencyKeys.length > 0) {
      const firstCurrencyKey = currencyKeys[0];
      const currency = wantedCountry.currencies[firstCurrencyKey];
      return `${currency.name} (${currency.symbol})`;
    }
    return 'N/A';
  };

  return (
    <>
      {shouldDisplayCluesButton && (
        <button
          onClick={toggleClue}
          className="button clues-button"
          type="button"
        >
          {showClue ? 'Hide Clues' : 'Show Clues'}
        </button>
      )}

      <AnimatePresence>
        {showClue && wantedCountry && (
          <motion.div
            className="overlay clues-overlay"
            variants={fadeInAndOutVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setShowClue(false)}
              className="close-button"
              type="button"
            >
              ×
            </button>
            <div>
              <h2 className="center">Clues about the Country</h2>
              <p>Here are some clues about the country you need to guess:</p>

              <p>
                <strong>Capital:</strong> {wantedCountry.capital.join(', ')}
              </p>
              <p>
                <strong>Continent:</strong>{' '}
                {wantedCountry.continents.join(', ')}
              </p>
              <p>
                <strong>Currency:</strong> {getCurrencyDetails()}
              </p>
              <p>
                <strong>Population:</strong>{' '}
                {wantedCountry.population.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClueOverlay;
