import { useDispatch } from 'react-redux';
import { fetchCoordinatesAsync, fetchWeatherData } from '../features/weather/thunks';


const useWeatherFetcher = () => {
  const dispatch = useDispatch();

  const fetchWeather = async (location) => {
    if (location) {
      const resultAction = await dispatch(fetchCoordinatesAsync(location));
      if (fetchCoordinatesAsync.fulfilled.match(resultAction)) {
        const fetchedLocations = resultAction.payload;
        if (fetchedLocations && fetchedLocations.length > 0) {
          const { lat, lon } = fetchedLocations[0];
          await dispatch(fetchWeatherData({ lat, lon }));
        }
      }

    }else{
      await dispatch(fetchWeatherData());
    }

  };

  return { fetchWeather };
};

export default useWeatherFetcher;
