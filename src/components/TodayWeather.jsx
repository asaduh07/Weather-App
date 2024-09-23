import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../features/weather/weatherSlice";
import WeatherDetail from "./WeatherDetail";
import AdditionalInfo from "./AdditionalInfo";
import gradients from "../assets/gradients";

const TodayWeather = () => {
    const { weatherData, tempSymbol, speedSymbol } = useSelector(weatherSelector);

    if (!weatherData || !weatherData.today) {
        return null; // Return nothing if the data is not ready
    }

    const { today, city } = weatherData;
    const weatherCondition = today.entries[0]?.weather[0]?.main;
    const weatherIcon = today.entries[0]?.weather[0]?.icon;
    const gradient = gradients[weatherCondition] || gradients.default;

    return (
        <div className={`flex flex-col justify-evenly items-center ${gradient} rounded-lg p-6 text-white space-y-6 shadow-lg`}>
            {/* Header */}
            <div className="flex justify-between items-center w-full mb-5">
                <div>
                    <h2 className="text-2xl font-bold">Today's Weather</h2>
                    <h3 className="text-sm">{today.date}</h3>
                </div>
                <span className="text-lg font-medium">{city?.name}, {city.country}</span>
            </div>

            {/* Weather Details */}
            <WeatherDetail
                icon={weatherIcon}
                temp={today.avgTemp}
                feelsLike={today.avgFeelsLike}
                condition={today.entries[0]?.weather[0]?.main}
                description={today.entries[0]?.weather[0]?.description}
                tempSymbol={tempSymbol}
            />

            {/* Additional Information */}
            <AdditionalInfo
                minTemp={today.minTemp}
                maxTemp={today.maxTemp}
                avgSpeed={today.avgSpeed}
                avgDeg={today.avgDeg}
                avgHumidity={today.avgHumidity}
                speedSymbol={speedSymbol}
                tempSymbol={tempSymbol}
            />
        </div>
    );
};

export default TodayWeather;
