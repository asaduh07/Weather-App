import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCurrentLocation } from "../../utils/locationUtil";
import { buildGeocodingUrl, buildWeatherUrl } from "../../utils/urlBuilder";
import { processWeatherData, calculateDailyAverages } from "../../utils/weatherUtil";

// Thunk for fetching coordinates based on a location name
export const fetchCoordinatesAsync = createAsyncThunk("weather/coordinates", async (payload, { getState, rejectWithValue }) => {
    try {

        const state = getState();
        const limit = state.weather.limit;
        // Fetch coordinates from the geocoding API
        const response = await axios.get(buildGeocodingUrl(payload, limit, process.env.REACT_APP_API_KEY));

        // Check if the response is empty (i.e., no location found)
        if (response.data.length === 0) {
            return rejectWithValue("No Location Found");
        }
        // Return the data from the API
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        return rejectWithValue(error);
    }
});

// Thunk for fetching weather data based on coordinates (latitude, longitude)
export const fetchWeatherData = createAsyncThunk("weather/data", async (payload, { getState, rejectWithValue }) => {
    try {
        let lat, lon;

        // If payload is provided with lat/lon, use it, otherwise get current location
        if (payload && payload.lat && payload.lon) {
            lat = payload.lat;
            lon = payload.lon;
        } else {
            // Get current location using getCurrentLocation
            const position = await getCurrentLocation();
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        }
        const state = getState();

        // Retrieve the unit (metric/imperial) from the Redux state
        const unit = state.weather.unit;

        // Fetch weather data from the weather API
        const response = await axios.get(buildWeatherUrl(lat, lon, unit, process.env.REACT_APP_API_KEY));
        const data = response.data;
        console.log(data);
        // Extract city information from the data
        const { city, list } = data;

        // Process the weather data
        const { closestEntry, dailyData } = processWeatherData(list);

        // Calculate daily averages
        const dailyAverages = calculateDailyAverages(dailyData);

        // Separate today and future days from the daily forecast data
        const [today, ...futureDays] = dailyAverages;



        // Return the processed data
        return {
            current: closestEntry,
            today: today,
            daily: futureDays,
            city
        };
    } catch (error) {
        // Handle any errors that occur during the request
        return rejectWithValue(error);
    }
});