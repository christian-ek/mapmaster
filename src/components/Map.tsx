import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { GameMode } from '../interfaces/GameState';

interface MapProps {
  onMapClick: (e: google.maps.MapMouseEvent) => void;
  children: ReactNode;
  gameMode: GameMode;
}

/**
 * Used for displaying the Google map
 */
const Map: React.FC<MapProps> = ({ onMapClick, children, gameMode }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const getInitialPosition = (mode: GameMode) => {
    switch (mode) {
      case GameMode.Africa:
        return { lat: -0.7832, lng: 19.5085 };
      case GameMode.Asia:
        return { lat: 34.0479, lng: 100.6197 };
      case GameMode.Europe:
        return { lat: 54.526, lng: 15.2551 };
      case GameMode.NorthAmerica:
        return { lat: 24.526, lng: -85.2551 };
      case GameMode.Oceania:
        return { lat: -22.7359, lng: 140.0188 };
      case GameMode.SouthAmerica:
        return { lat: -18.7832, lng: -55.4915 };
      case GameMode.World:
      default:
        return { lat: 50, lng: 15 };
    }
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  const [position, setPosition] = useState(getInitialPosition(gameMode));

  /**
   * useEffect to update map position when gameMode changes
   */
  useEffect(() => {
    setPosition(getInitialPosition(gameMode));
  }, [gameMode]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onCenter = useCallback(() => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    if (center) {
      setPosition({
        lat: center.lat(),
        lng: center.lng(),
      });
    }
  }, []);

  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not set in environment variables');
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} language="en">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={4}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
        onLoad={onLoad}
        onDragEnd={onCenter}
        onClick={onMapClick}
      >
        <div className="overlay-container">{children}</div>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
