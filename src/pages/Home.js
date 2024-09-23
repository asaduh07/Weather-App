import CurrentWeather from "../components/CurrentWeatherCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "../features/weather/thunks";
import { weatherSelector } from "../features/weather/weatherSlice";
import DailyForecast from "../components/DailyForecast";
import LandingPage from "../components/Landing";
import TodayWeather from "../components/TodayWeather";
import SunriseSunset from "../components/Sun";
import LocationModal from "../components/LocationModal";
import { getCurrentLocation } from "../utils/locationUtil";
import TemperatureHumidityChart from "../components/TemperatureHumidity";
import gradients from "../assets/gradients";

const Home = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { error, loading, weatherData } = useSelector(weatherSelector);

    useEffect(() => {
        dispatch(fetchWeatherData());
    }, [dispatch]);



    useEffect(() => {
        if (error) {
            setShowModal(true);
        }
    }, [error]);
    useEffect(() => {
        // Trigger animation on component mount
        setTimeout(() => setIsVisible(true), 100); // Delay can be adjusted
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    

    const handleAllowLocation = async () => {
        const position = await getCurrentLocation();
        if (position) {
            // Dispatch an action to fetch weather data with the new location
            console.log('Location granted:', position);
            // Example: dispatch(fetchWeatherDataWithPosition(position));
            setShowModal(false);
        } else {
            // Handle the case when location access is denied
            console.error('Location access denied or error occurred');
            setShowModal(false);
        }
    };

    // Dynamic background based on time
    const [backgroundGradient, setBackgroundGradient] = useState(gradients.day);
    useEffect(() => {
        const updateBackground = () => {
            const now = new Date();
            const hour = now.getHours();
            if (hour >= 6 && hour < 18) {
                setBackgroundGradient(gradients.day);
            } else {
                setBackgroundGradient(gradients.night);
            }
        };
        updateBackground();
        const intervalId = setInterval(updateBackground, 60000); // Update every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen p-4 space-y-4 bg-slate-500"
            style={{ backgroundImage: backgroundGradient }}
        >
            {loading ? (
                <Loader />
            ) : weatherData && weatherData.daily.length > 0 ? (
                <>
                    <div className="flex flex-col lg:flex-row justify-center items-start w-full space-y-4 lg:space-y-0 lg:space-x-4">
                        {/* Left Column: CurrentWeather and SunriseSunset */}
                        <div className={`flex flex-col justify-between items-center space-y-4 w-full lg:w-1/3 ${isVisible ? "fade-in-up opacity-100" : "opacity-0"}`}>
                            {/* Current Weather */}
                            <CurrentWeather className="bg-white w-full rounded-lg shadow-lg p-6" />

                            {/* Sunrise and Sunset */}
                            <SunriseSunset className="bg-white w-full rounded-lg shadow-lg p-6" />
                        </div>

                        {/* Right Column: TodayWeather and TemperatureHumidityChart */}
                        <div className={`flex flex-col justify-between w-full lg:w-2/3 space-y-4  fade-in-right opacity-100`}>
                            {/* Today's Weather */}
                            <TodayWeather className="bg-white w-full rounded-lg shadow-lg p-6" />

                            {/* Temperature and Humidity Chart */}
                            <div className="bg-white w-full rounded-lg shadow-lg p-6">
                                <TemperatureHumidityChart />
                            </div>
                        </div>
                    </div>


                    {/* Daily Forecast */}
                    <div className="w-full flex justify-center items-center mt-4">
                        <DailyForecast className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-4" />
                    </div>
                </>
            ) : (
                <LandingPage />
            )}

            {/* Location Modal */}
            {showModal && (
                <LocationModal
                    onClose={handleCloseModal}
                    onAllow={handleAllowLocation}
                    style={{
                        backgroundColor: "#1e1e1e", // Dark modal background
                        color: "#ffffff", // White text color
                    }}
                />
            )}
        </div>

    );
};

export default Home;