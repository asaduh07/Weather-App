import { createSlice } from "@reduxjs/toolkit";
import { fetchCoordinatesAsync,fetchWeatherData } from "./thunks";


const INITIAL_STATE = {
    unit: 'metric',            // Default unit for temperature
    tempSymbol: '°C',          // Symbol for temperature
    speedSymbol: 'm/s',        // Symbol for wind speed

    // Weather data
    weatherData: {
        current: {},          // Data for current weather
        today: {},           // Data for today's weather
        daily: [],           // Array of daily forecasts
        city: {},            // City information
    },

    // UI and request states
    loading: false,           // Indicates if data is currently being fetched
    limit: 1,                 // Limit for location search
    error: null               // Error message if an error occurs
};

const weatherSlice = createSlice({
    name: "weather",
    initialState: INITIAL_STATE,
    reducers: {
        setUnit: (state, action) => {
            state.unit = action.payload;
            state.tempSymbol = action.payload === 'metric' ? '°C' : '°F';
            state.speedSymbol = action.payload === 'metric' ? 'm/s' : 'mph';
        },
    },
    extraReducers: (builder) => {
        builder
            // handle fetching coordinates of location
            .addCase(fetchCoordinatesAsync.pending, (state, action) => {
                state.loading = true;
                state.error = null;

            })
            
            .addCase(fetchCoordinatesAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;

            })
            // handle fetching data of selected location
            .addCase(fetchWeatherData.pending, (state, action) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                const { current, today, daily, city } = action.payload;

                state.weatherData = {
                    ...state.weatherData,
                    city,
                    current,
                    today,
                    daily
                };
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;

            })
    }

})

const weatherReducer = weatherSlice.reducer;

export default weatherReducer;
export const { setUnit } = weatherSlice.actions;

export const weatherSelector = (state) => state.weather;