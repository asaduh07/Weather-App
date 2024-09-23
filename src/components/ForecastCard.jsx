import React from "react";
import gradients from "../assets/gradients";

const ForecastCard = ({ date, weatherCondition, weatherIcon, description, avgTemp, minTemp, maxTemp, tempSymbol }) => {
    const gradient = gradients[weatherCondition] || gradients.default;

    return (
        <div className={`flex flex-col justify-between items-center ${gradient} rounded-lg p-4 shadow-md transition-transform transform hover:scale-105`}>
            <div className="text-lg font-bold">{date}</div>
            <img
                src={`${process.env.REACT_APP_ICON}/${weatherIcon}@2x.png`}
                alt="Weather Icon"
                className="w-16 h-16 my-2"
            />
            <div className="text-md mb-2 text-center">{description}</div>
            <div className="text-3xl font-bold">{Math.floor(avgTemp)}{tempSymbol}</div>
            <div className="text-sm text-center">Min: {Math.floor(minTemp)}{tempSymbol} | Max: {Math.floor(maxTemp)}{tempSymbol}</div>
        </div>
    );
};

export default ForecastCard;
