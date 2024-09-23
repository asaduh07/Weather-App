import React from "react";

const WeatherDetail = ({ icon, temp, feelsLike, condition, description, tempSymbol }) => (
    <div className="flex flex-wrap justify-between items-center w-full mb-5">
        <img
            src={`${process.env.REACT_APP_ICON}/${icon}@2x.png`}
            alt="Weather Icon"
            className="w-24 h-24"
        />
        <div className="flex flex-col justify-center items-start mx-4">
            <h1 className="text-5xl font-bold leading-none">{Math.floor(temp)}{tempSymbol}</h1>
            <div className="text-lg font-medium">Feels like {Math.floor(feelsLike)}{tempSymbol}</div>
        </div>
        <div className="flex flex-col justify-center items-start mx-4 text-center lg:text-left">
            <div className="text-xl font-semibold">{condition}</div>
            <div className="text-md text-gray-200">{description}</div>
        </div>
    </div>
);

export default WeatherDetail;
