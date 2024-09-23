import React from "react";
import getWindDirection from "../utils/windDirection";

const AdditionalInfo = ({ minTemp, maxTemp, avgSpeed, avgDeg, avgHumidity, speedSymbol, tempSymbol }) => (
    <div className="grid grid-cols-2 gap-4 w-full text-md">
        <div className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-md">
            <span className="font-bold">Min Temp</span>
            <span>{Math.floor(minTemp)}{tempSymbol}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-md">
            <span className="font-bold">Max Temp</span>
            <span>{Math.floor(maxTemp)}{tempSymbol}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-md">
            <span className="font-bold">Wind</span>
            <span>{avgSpeed} {speedSymbol} {getWindDirection(avgDeg)}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-md">
            <span className="font-bold">Humidity</span>
            <span>{Math.floor(avgHumidity)}%</span>
        </div>
    </div>
);

export default AdditionalInfo;
