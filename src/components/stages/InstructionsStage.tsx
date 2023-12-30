import React from 'react';
import InstructionsOverlay from '../overlays/InstructionsOverlay';

interface InstructionsStageProps {
  onInstructionsAcknowledged: () => void;
}

/**
 * Stage shown before the game starts, with instructions on how to play.
 */
const InstructionsStage: React.FC<InstructionsStageProps> = ({
  onInstructionsAcknowledged,
}) => {
  return (
    <InstructionsOverlay
      onInstructionsAcknowledged={onInstructionsAcknowledged}
    />
  );
};

export default InstructionsStage;
