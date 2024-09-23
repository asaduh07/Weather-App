import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../features/weather/weatherSlice";
import WeatherDetail from "./WeatherDetail";
import AdditionalInfo from "./AdditionalInfo";
import gradients from "../assets/gradients";

const CurrentWeather = () => {
    const { weatherData, tempSymbol, speedSymbol } = useSelector(weatherSelector);

    if (!weatherData || !weatherData.current || !weatherData.city) {
        return null; // Return nothing if the data is not ready
    }

    const { current, city } = weatherData;
    const weatherCondition = current?.weather[0]?.main;
    const weatherIcon = current?.weather[0]?.icon;
    const gradient = gradients[weatherCondition] || gradients.default;

    return (
        <div className={`flex flex-col justify-start items-center ${gradient} rounded-lg p-6 w-full mx-auto space-y-6 text-white shadow-lg`}>
            {/* Header */}
            <div className="flex justify-between items-center w-full mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Current Weather</h2>
                    <h3 className="text-sm">{current.time}</h3>
                </div>
                <span className="text-lg font-medium">{city?.name}, {city.country}</span>
            </div>

            {/* Weather Details */}
            <WeatherDetail
                icon={weatherIcon}
                temp={current.main.temp}
                feelsLike={current.main.feels_like}
                condition={current.weather[0]?.main}
                description={current.weather[0]?.description}
                tempSymbol={tempSymbol}
            />

            {/* Additional Information */}
            <AdditionalInfo
                minTemp={current.main.temp_min}
                maxTemp={current.main.temp_max}
                avgSpeed={current.wind?.speed}
                avgDeg={current.wind?.deg}
                avgHumidity={current.main?.humidity}
                speedSymbol={speedSymbol}
                tempSymbol={tempSymbol}
            />
        </div>
    );
};

export default CurrentWeather;
