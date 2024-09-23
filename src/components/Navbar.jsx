import { useState, useEffect, useRef } from "react";
import TemperatureToggle from "./TempToggle";
import useWeatherFetcher from "../hooks/useWeatherFetcher";

const Navbar = () => {
  const [location, setLocation] = useState('');
  const weatherInput = useRef(null);
  const { fetchWeather } = useWeatherFetcher();

  useEffect(() => {
    if (weatherInput.current) {
      weatherInput.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    await fetchWeather(location);
  };

  const handleClear = () => {
    setLocation("");
    if (weatherInput.current) {
      weatherInput.current.focus();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto">
        <div className="flex flex-wrap w-full md:w-2/3 justify-between items-center mb-4 md:mb-0 md:pr-4">
          <h2 className="text-white text-2xl lg:text-3xl font-bold">Weather App</h2>
          <TemperatureToggle location={location} />
        </div>
        <div className="flex w-full md:w-1/3 justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 w-full max-w-xs lg:max-w-md rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={weatherInput}
          />
          <button
            onClick={handleSubmit}
            disabled={!location}
            className={`${
              location ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out`}
          >
            Search
          </button>
          <button
            onClick={handleClear}
            disabled={!location}
            className={`${
              location ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out`}
          >
            Clear
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
