// useMapInteraction.js
import { useCallback, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import fetchCountryName from '../api/GeocodeApi';
import { CountryService } from '../services/CountryService';
import { isCorrectGuess } from '../components/GameUtils';
import { GameStage } from '../interfaces/GameState';

interface MapInteractionProps {
  onCorrectGuess: () => void;
}

/**
 * Custom hook for map interaction.
 */
function useMapInteraction({ onCorrectGuess }: MapInteractionProps) {
  const { dispatch, gameStage, wantedCountry } = useContext(GameContext);

  const updateMapPosition = useCallback(
    (latLng: google.maps.LatLng) => {
      const newPosition = new google.maps.LatLng(latLng.lat(), latLng.lng());
      dispatch({ type: 'SET_SELECTED_POSITION', payload: newPosition });
      dispatch({ type: 'SET_SHOW_CLICK_WINDOW', payload: true });
    },
    [dispatch]
  );

  const onMapClickError = useCallback(
    (error: Error) => {
      dispatch({ type: 'SET_CLICK_WINDOW_CONTENT', payload: error.message });
    },
    [dispatch]
  );

  const fetchCountryInfo = useCallback(
    async (latLng: google.maps.LatLng) => {
      try {
        const countryIso2 = await fetchCountryName(latLng);
        if (countryIso2) {
          return await CountryService.getCountryByIso2(countryIso2);
        }
      } catch (error) {
        onMapClickError(error as Error);
      }
    },
    [onMapClickError]
  );

  const onMapClick = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (gameStage !== GameStage.Running || !event.latLng) {
        return;
      }

      updateMapPosition(event.latLng);

      const selectedCountry = await fetchCountryInfo(event.latLng);
      if (
        selectedCountry &&
        isCorrectGuess(selectedCountry, wantedCountry, gameStage)
      ) {
        onCorrectGuess();
      }

      if (selectedCountry) {
        dispatch({
          type: 'SET_CLICK_WINDOW_CONTENT',
          payload: selectedCountry,
        });
      }
    },
    [
      updateMapPosition,
      fetchCountryInfo,
      gameStage,
      wantedCountry,
      onCorrectGuess,
      dispatch,
    ]
  );

  return { onMapClick };
}

export default useMapInteraction;
