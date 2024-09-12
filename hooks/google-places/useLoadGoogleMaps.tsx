// hooks/useLoadGoogleMaps.js
import { useLoadScript } from '@react-google-maps/api';

const useLoadGoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'], // 'places' is required for Google Places Autocomplete
  });

  return { isLoaded, loadError };
};

export default useLoadGoogleMaps;
