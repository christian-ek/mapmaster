import axios from 'axios';

/**
 * Used for fetching country names from Google Maps API from a given position.
 */
const fetchCountryName = async (
  position: google.maps.LatLng
): Promise<string> => {
  if (!position) {
    throw new Error('Position not provided');
  }

  const lat = position.lat();
  const lng = position.lng();

  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not set in environment variables');
  }

  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&result_type=country&language=en`;
  const response = await axios.get(geocodeUrl);
  if (response.data.status === 'OK' && response.data.results[0]) {
    return response.data.results[0].address_components[0].short_name;
  }
  throw new Error('No country found for location.');
};

export default fetchCountryName;
