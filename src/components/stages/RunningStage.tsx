import React, { useContext, useCallback } from 'react';
import FlagOverlay from '../overlays/FlagOverlay';
import ClueOverlay from '../overlays/ClueOverlay';
import PointsOverlay from '../overlays/PointsOverlay';
import TimerOverlay from '../overlays/TimerOverlay';
import ClickWindow from '../ClickWindow';
import { GameContext } from '../../contexts/GameContext';
import { Flags } from '../../interfaces/Country';

interface RunningStageProps {
  isTimerRunning: boolean;
  onCountdownFinish: () => void;
  timeLeft: number;
  onUsedClue: () => void;
}

/**
 * Stage shown when the game is running.
 */
const RunningStage: React.FC<RunningStageProps> = ({
  isTimerRunning,
  onCountdownFinish,
  timeLeft,
  onUsedClue,
}) => {
  const {
    selectedPosition,
    wantedCountry,
    showClickWindow,
    roundNumber,
    dispatch,
  } = useContext(GameContext);

  const onCloseClickWindow = useCallback(() => {
    dispatch({
      type: 'SET_SHOW_CLICK_WINDOW',
      payload: false,
    });
  }, [dispatch]);

  return (
    <>
      <PointsOverlay />
      <FlagOverlay
        key={roundNumber}
        flags={(wantedCountry?.flags as Flags) || ''}
        onCountdownFinish={onCountdownFinish}
      />
      <TimerOverlay timeLeft={timeLeft} />
      <ClueOverlay onUseClue={onUsedClue} isTimerRunning={isTimerRunning} />

      {isTimerRunning && showClickWindow && selectedPosition && (
        <ClickWindow onCloseClick={onCloseClickWindow} />
      )}
    </>
  );
};

export default RunningStage;
