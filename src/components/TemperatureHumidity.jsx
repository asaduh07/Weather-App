import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../features/weather/weatherSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-black text-white rounded shadow-md">
        <p>{label}</p>
        <p style={{ color: payload[0].color }}>
          Temperature: {payload[0].value}°C
        </p>
        <p style={{ color: payload[1].color }}>
          Humidity: {payload[1].value}%
        </p>
      </div>
    );
  }

  return null;
};

const TemperatureHumidityChart = () => {
  const { weatherData, tempSymbol } = useSelector(weatherSelector);

  if (!weatherData || !weatherData.today) {
    return null; // Return nothing if the data is not ready
  }

  const { today } = weatherData;
  // Map the `entries` to the required format
  const formattedData = today.entries.map((entry) => ({
    time: new Date(entry.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: entry.main.temp,
    humidity: entry.main.humidity,
  }));

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e0f7fa, #e0f7fa, #e1f5fe)", // Gradient background
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect for depth
      }}
    >
      <ResponsiveContainer width="100%" height={310}>
        <AreaChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {/* Gradient for Temperature Area */}
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF5722" stopOpacity={0} />
            </linearGradient>
            {/* Gradient for Humidity Area */}
            <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#03A9F4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#03A9F4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" domain={["dataMin", "dataMax"]} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} /> {/* Use custom tooltip */}
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            name="Temperature" // Custom name for Temperature
            stroke="#FF5722"
            fillOpacity={1}
            fill="url(#tempGradient)" // Apply temperature gradient
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            name="Humidity" // Custom name for Humidity
            stroke="#03A9F4"
            fillOpacity={1}
            fill="url(#humidityGradient)" // Apply humidity gradient
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureHumidityChart;
