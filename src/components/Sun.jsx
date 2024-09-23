import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../features/weather/weatherSlice";
import weatherIcons from "../assets/images";

const SunriseSunset = () => {
    const { weatherData } = useSelector(weatherSelector);

    if (!weatherData || !weatherData.city || !weatherData.city.sunrise || !weatherData.city.sunset) {
        return null;  // Return nothing if the data is not ready
    }

    const { Sunrise, Sunset } = weatherIcons;
    // Convert timestamps to readable time format
    const sunriseTime = new Date(weatherData.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(weatherData.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="flex flex-col w-full items-center p-4 bg-blue-50 rounded-lg shadow-md space-y-6">
            {/* Sunrise Card */}
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
                <img src={Sunrise} alt="Sunrise" className="w-14 h-14 mb-2" />
                <span className="text-xl font-bold text-gray-700">Sunrise</span>
                <span className="text-lg text-gray-500">{sunriseTime}</span>
            </div>

            {/* Line Separator */}
            <div className="w-full border-t border-gray-300 my-2"></div>

            {/* Sunset Card */}
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
                <img src={Sunset} alt="Sunset" className="w-14 h-14 mb-2" />
                <span className="text-xl font-bold text-gray-700">Sunset</span>
                <span className="text-lg text-gray-500">{sunsetTime}</span>
            </div>
        </div>
    );
};

export default SunriseSunset;
