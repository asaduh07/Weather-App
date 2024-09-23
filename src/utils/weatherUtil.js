
export const processWeatherData = (list) => {
    // Initialize variables for processing the data
    const dailyData = {};
    let closestEntry = null;
    const currentTimeStamp = new Date().toISOString();

    // Process each entry in the list
    list.forEach((entry) => {
        const entryDate = new Date(entry.dt_txt);
        const entryISODate = entryDate.toISOString().split('T')[0];
        const [year, month, day] = entryISODate.split('-');
        const reversedDate = `${day}-${month}-${year}`;
        let time = entryDate.toLocaleTimeString();
        time = time.split(':').slice(0, 2).join(':') + ' ' + time.split(' ')[1];

        // Identify the closest entry to the current time that is not in the future
        if (entryDate <= new Date(currentTimeStamp)) {
            if (!closestEntry || Math.abs(new Date(closestEntry.dt_txt) - new Date(currentTimeStamp)) > Math.abs(entryDate - new Date(currentTimeStamp))) {
                closestEntry = entry;
            }
            closestEntry = { ...closestEntry, time };
        }

        // Group entries by date
        if (!dailyData[reversedDate]) {
            dailyData[reversedDate] = [];
        }
        dailyData[reversedDate].push(entry);
    });

    return { closestEntry, dailyData };
};

export const calculateDailyAverages = (dailyData) => {
    // Convert dailyData object into an array of days
    return Object.entries(dailyData).map(([date, entries]) => {
        const avgTemp = entries.reduce((sum, entry) => sum + entry.main.temp, 0) / entries.length;
        const avgHumidity = entries.reduce((sum, entry) => sum + entry.main.humidity, 0) / entries.length;
        const avgSpeed = entries.reduce((sum, entry) => sum + entry.wind.speed, 0) / entries.length;
        const avgDeg = entries.reduce((sum, entry) => sum + entry.wind.deg, 0) / entries.length;
        const avgFeelsLike = entries.reduce((sum, entry) => sum + entry.main.feels_like, 0) / entries.length;

        return {
            date,
            avgTemp: avgTemp.toFixed(2),
            avgHumidity: avgHumidity.toFixed(2),
            avgSpeed: avgSpeed.toFixed(2),
            avgFeelsLike: avgFeelsLike.toFixed(2),
            avgDeg: avgDeg.toFixed(2),
            minTemp: Math.min(...entries.map(entry => entry.main.temp_min)),
            maxTemp: Math.max(...entries.map(entry => entry.main.temp_max)),
            entries,
        };
    });
};
