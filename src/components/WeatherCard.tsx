import React from "react";
import {
  Sun,
  CloudRain,
  Cloud,
  Wind,
  CloudLightning,
  CloudSnow,
  Thermometer,
} from "lucide-react";
import type {
  LocationWeather,
  TemperatureUnit,
  WeatherCondition,
} from "../types/weather";
import { getWeatherConditionType } from "../services/weatherApi";

interface WeatherCardProps {
  weather: LocationWeather;
  temperatureUnit: TemperatureUnit;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  temperatureUnit,
}) => {
  if (weather.loading) {
    return (
      <div className="weather-card animate-pulse p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (weather.error || !weather.data) {
    return (
      <div className="weather-card p-6 border-red-200">
        <h3 className="text-lg font-semibold">{weather.location}</h3>
        <p className="text-red-500">
          Error: {weather.error || "Failed to load weather data"}
        </p>
      </div>
    );
  }

  const { data } = weather;
  const conditionType = getWeatherConditionType(data.current.condition.code);
  const temp =
    temperatureUnit === "C" ? data.current.temp_c : data.current.temp_f;
  const feelsLike =
    temperatureUnit === "C"
      ? data.current.feelslike_c
      : data.current.feelslike_f;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-10 w-10 text-weather-sunny" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-weather-rainy" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-weather-cloudy" />;
      case "stormy":
        return <CloudLightning className="h-10 w-10 text-weather-stormy" />;
      case "snowy":
        return <CloudSnow className="h-10 w-10 text-weather-snowy" />;
      default:
        return <Cloud className="h-10 w-10 text-weather-misty" />;
    }
  };

  return (
    <div className={`weather-card ${conditionType} p-6 animate-fade-in`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.location.name}</h3>
          <p className="text-sm text-gray-500">{data.location.country}</p>
        </div>
        <div className="flex space-x-2 items-center">
          {getWeatherIcon(conditionType)}
        </div>
      </div>

      <div className="flex items-end mt-4">
        <div className="mr-4">
          <p className="text-3xl font-bold">
            {Math.round(temp)}°{temperatureUnit}
          </p>
          <p className="text-sm text-gray-600">
            Feels like {Math.round(feelsLike)}°{temperatureUnit}
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-sm font-medium">{data.current.condition.text}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Wind className="h-4 w-4 mr-1 inline" />
            <span>{data.current.wind_kph} km/h</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Thermometer className="h-4 w-4 mr-1 inline" />
            <span>{data.current.humidity}% humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
