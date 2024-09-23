import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { weatherSelector, setUnit } from '../features/weather/weatherSlice';
import useWeatherFetcher from '../hooks/useWeatherFetcher';

const TemperatureToggle = ({ location }) => {
  const dispatch = useDispatch();
  const { unit, tempSymbol } = useSelector(weatherSelector);
  const { fetchWeather } = useWeatherFetcher();

  const handleToggle = async () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    dispatch(setUnit(newUnit)); // Toggle the unit state

    // Fetch weather data for the new unit
    await fetchWeather(location); 
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleToggle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none transition-all duration-200 ease-in-out"
      >
        {tempSymbol === '°C' ? '°F' : '°C'}
      </button>
      <span className="text-white text-lg font-medium">
        {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
      </span>
    </div>
  );
};

export default TemperatureToggle;
