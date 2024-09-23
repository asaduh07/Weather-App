import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../features/weather/weatherSlice";
import ForecastCard from "./ForecastCard";

const DailyForecast = () => {
    const { weatherData, tempSymbol } = useSelector(weatherSelector);

    if (!weatherData || !weatherData.daily || weatherData.daily.length === 0) {
        return null;
    }

    const { daily } = weatherData;

    return (
        <div className="flex flex-col items-center bg-gray-900 rounded-lg p-6 w-full mx-auto text-white shadow-lg">
            {/* Header */}
            <div className="flex w-full items-center justify-center mb-6">
                <h2 className="text-2xl font-bold">5-Day Forecast</h2>
            </div>

            {/* Forecast Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
                {daily.map((day) => {
                    const weatherCondition = day.entries[0].weather[0]?.main;
                    const weatherIcon = day.entries[0].weather[0]?.icon;
                    const description = day.entries[0].weather[0]?.description;

                    return (
                        <ForecastCard
                            key={day.date}
                            date={day.date}
                            weatherCondition={weatherCondition}
                            weatherIcon={weatherIcon}
                            description={description}
                            avgTemp={day.avgTemp}
                            minTemp={day.minTemp}
                            maxTemp={day.maxTemp}
                            tempSymbol={tempSymbol}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
