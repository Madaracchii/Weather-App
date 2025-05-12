
export interface WeatherLocation {
  id: number;
  name: string;
  country: string;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
}

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'misty';

export interface LocationWeather {
  id: number;
  location: string;
  country: string;
  data?: WeatherData;
  loading: boolean;
  error?: string;
}

export type TemperatureUnit = 'C' | 'F';
