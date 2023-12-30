import React from 'react';
import ConfettiCanon from '../ConfettiCanon';
import RoundWinOverlay from '../overlays/RoundWinOverlay';

interface RoundWonStageProps {
  onNextRound: () => void;
}

/**
 * Stage shown when the player has won the round.
 */
const RoundWonStage: React.FC<RoundWonStageProps> = ({ onNextRound }) => {
  return (
    <>
      <ConfettiCanon />
      <RoundWinOverlay onNextRound={onNextRound} />{' '}
    </>
  );
};

export default RoundWonStage;
