import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import WeatherCard from "../components/WeatherCard";
import { Button } from "../components/ui/button";
import { getWeatherData } from "../services/weatherApi";
import type { LocationWeather, TemperatureUnit } from "../types/weather";

// Five fixed locations
const LOCATIONS = [
  { id: 1, name: "New York", country: "USA" },
  { id: 2, name: "London", country: "UK" },
  { id: 3, name: "Tokyo", country: "Japan" },
  { id: 4, name: "Sydney", country: "Australia" },
  { id: 5, name: "Rio de Janeiro", country: "Brazil" },
];

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<LocationWeather[]>(
    LOCATIONS.map((location) => ({
      id: location.id,
      location: location.name,
      country: location.country,
      loading: true,
    }))
  );
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllWeatherData = async () => {
    try {
      setIsRefreshing(true);

      // Update loading state
      setWeatherData((prev) =>
        prev.map((location) => ({
          ...location,
          loading: true,
          error: undefined,
        }))
      );

      // Fetch data for each location
      await Promise.all(
        LOCATIONS.map(async (location, index) => {
          try {
            const data = await getWeatherData(location.name);

            // Update the state for this specific location
            setWeatherData((prev) =>
              prev.map((item) =>
                item.id === location.id
                  ? { ...item, data, loading: false, error: undefined }
                  : item
              )
            );
          } catch (error) {
            console.error(`Error fetching data for ${location.name}:`, error);

            // Update with error state
            setWeatherData((prev) =>
              prev.map((item) =>
                item.id === location.id
                  ? {
                      ...item,
                      loading: false,
                      error: "Failed to load weather data",
                    }
                  : item
              )
            );
          }
        })
      );

      toast.success("Weather data refreshed");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to refresh weather data");
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => (prev === "C" ? "F" : "C"));
    toast.info(
      `Temperature unit changed to °${temperatureUnit === "C" ? "F" : "C"}`
    );
  };

  useEffect(() => {
    fetchAllWeatherData();

    // Refresh data every 30 minutes
    const intervalId = setInterval(fetchAllWeatherData, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Current Weather
          </h2>

          <div className="flex items-center space-x-4">
            <div className="flex rounded-md overflow-hidden border">
              <button
                onClick={() =>
                  temperatureUnit !== "C" && toggleTemperatureUnit()
                }
                className={`temperature-toggle ${
                  temperatureUnit === "C" ? "active" : "inactive"
                }`}
              >
                °C
              </button>
              <button
                onClick={() =>
                  temperatureUnit !== "F" && toggleTemperatureUnit()
                }
                className={`temperature-toggle ${
                  temperatureUnit === "F" ? "active" : "inactive"
                }`}
              >
                °F
              </button>
            </div>

            <Button
              onClick={fetchAllWeatherData}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((weather) => (
            <WeatherCard
              key={weather.id}
              weather={weather}
              temperatureUnit={temperatureUnit}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data provided by WeatherAPI.com</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
