import axios from 'axios';
import { Country } from '../interfaces/Country';

/**
 * The API client for making requests to the restcountries API.
 */
const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  headers: {
    Accept: 'application/json',
  },
});

/**
 * Fetches all countries from the API.
 */
const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>('/all');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching countries.');
  }
};

export default fetchAllCountries;
