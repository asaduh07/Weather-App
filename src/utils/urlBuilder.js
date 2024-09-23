// urlUtils.js
export const buildGeocodingUrl = (location, limit, apiKey) => {
    return `${process.env.REACT_APP_SERVER_DOMAIN}/geo/1.0/direct?q=${location}&limit=${limit}&appid=${apiKey}`;
};

export const buildWeatherUrl = (lat, lon, unit, apiKey) => {
    return `${process.env.REACT_APP_SERVER_DOMAIN}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
};
