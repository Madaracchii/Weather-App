
import type { WeatherData } from "../types/weather";

const API_KEY = '7fa9722a3d844c8d81b34514253004';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    const data = await response.json();
    return data as WeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function getWeatherConditionType(code: number): string {
  // Weather condition codes from WeatherAPI.com
  if (code === 1000) {
    return 'sunny';
  } else if ([1003, 1006, 1009, 1030].includes(code)) {
    return 'cloudy';
  } else if ([1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201].includes(code)) {
    return 'rainy';
  } else if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return 'stormy';
  } else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) {
    return 'snowy';
  } else {
    return 'misty';
  }
}