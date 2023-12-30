import React from 'react';
import { motion } from 'framer-motion';
import useCountdown from '../../hooks/useCountdown';
import { Flags } from '../../interfaces/Country';
import { flyInFromTopVariant } from '../../constants/overlayVariants';

interface FlagOverlayProps {
  flags: Flags;
  onCountdownFinish: () => void;
}

/**
 * Used for displaying the flag of the country the player needs to guess.
 * Also used for displaying a countdown before the flag is shown.
 */
const FlagOverlay: React.FC<FlagOverlayProps> = ({
  flags,
  onCountdownFinish,
}) => {
  const countdown = useCountdown(3, onCountdownFinish);

  return (
    <motion.div
      className="overlay flag-overlay"
      variants={flyInFromTopVariant}
      initial="hidden"
      animate="visible"
    >
      {countdown > 0 ? (
        <div className="countdown">{countdown}</div>
      ) : (
        <img src={flags?.png} alt={flags?.alt} className="flag-image" />
      )}
    </motion.div>
  );
};

export default FlagOverlay;
