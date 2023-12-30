// GameInitializer.js
import { useEffect } from 'react';
import { CountryService } from '../services/CountryService';

/**
 * Used for loading initial data.
 */
const GameInitializer: React.FC = () => {
  /**
   * useEffect is used to load initial data when mounting the component.
   */
  useEffect(() => {
    const loadInitialData = async () => {
      await CountryService.loadCountries();
    };

    loadInitialData();
  }, []);

  return null;
};

export default GameInitializer;
