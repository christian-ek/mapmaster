import { Country } from '../interfaces/Country';
import { GameMode } from '../interfaces/GameState';
import { getGameModeName } from '../components/GameUtils';
import fetchAllCountries from '../api/CountriesApi';

/**
 * Service class for managing country data.
 */
export class CountryService {
  private static countriesCache: Country[] = [];

  private static countriesByContinent: { [key: string]: Country[] } = {};

  /**
   * Countries that are not recognized by the Google Geocoding API.
   */
  private static excludedCountries: string[] = [
    'XK', // Kosovo
    'PS', // Palestine
    'SJ', // Svalbard and Jan Mayen, excluded since they have the same flag as Norway.
  ];

  /**
   * Loads all countries from the API, sorts them by continent, and caches them.
   * Skips repopulating if the map is already populated.
   * Supports countries that are listed in multiple continents.
   */
  public static async loadCountries() {
    if (this.countriesCache.length === 0) {
      this.countriesCache = await fetchAllCountries();

      // Exclude countries from the excludedCountries list
      this.countriesCache = this.countriesCache.filter(
        (country) => !this.excludedCountries.includes(country.cca2)
      );

      if (Object.keys(this.countriesByContinent).length === 0) {
        this.countriesCache.forEach((country) => {
          country.continents.forEach((continent) => {
            if (!this.countriesByContinent[continent]) {
              this.countriesByContinent[continent] = [];
            }
            this.countriesByContinent[continent].push(country);
          });
        });
      }
    }
  }

  /**
   * Get countries by continent.
   */
  public static getCountriesByContinent(continent: string): Country[] {
    return this.countriesByContinent[continent] || [];
  }

  /**
   * Retrieves a country by its ISO2 (cca2) code from the cache.
   */
  public static async getCountryByIso2(
    iso2: string
  ): Promise<Country | undefined> {
    await this.loadCountries();
    return this.countriesCache.find((c) => c.cca2 === iso2);
  }

  /**
   * Retrieves a random country from the list of loaded countries.
   */
  public static async getRandomCountry(gameMode?: GameMode): Promise<Country> {
    await this.loadCountries();
    let countries = this.countriesCache;

    if (gameMode && gameMode !== GameMode.World) {
      const continentName = getGameModeName(gameMode);
      countries = this.getCountriesByContinent(continentName);
    }

    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }
}

export default CountryService;
