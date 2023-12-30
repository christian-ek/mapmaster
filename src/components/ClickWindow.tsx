import React, { useContext } from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { GameContext } from '../contexts/GameContext';

interface ClickWindowProps {
  onCloseClick: () => void;
}

/**
 * Window shown when the player clicks on the map.
 */
const ClickWindow: React.FC<ClickWindowProps> = ({ onCloseClick }) => {
  const { clickWindowContent, selectedPosition } = useContext(GameContext);

  /**
   * Renders the content of the click window.
   * If the content is a string, it will render a paragraph with the string.
   * If the content is an object, it will render the flag, name and a message.
   */
  const renderContent = (): JSX.Element => {
    if (typeof clickWindowContent === 'string') {
      return <p>{clickWindowContent}</p>;
    }

    return (
      <div className="click-window-container">
        {!clickWindowContent ? (
          <div className="loading-indicator" />
        ) : (
          <div className="click-window-content">
            <img
              className="click-window-flag"
              src={clickWindowContent?.flags.png}
              alt={`${clickWindowContent?.name.common} flag`}
            />
            <h2 className="click-window-header">
              {clickWindowContent?.name.common}
            </h2>
            <p className="incorrect-guess">Wrong guess, Try again!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <InfoWindowF
      position={selectedPosition}
      onCloseClick={onCloseClick}
      zIndex={2000}
    >
      {renderContent()}
    </InfoWindowF>
  );
};

export default ClickWindow;
