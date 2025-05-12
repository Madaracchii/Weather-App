import React from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex">
            <Sun className="h-8 w-8 text-weather-sunny animate-pulse-slow" />
            <Cloud className="h-8 w-8 text-white -ml-2" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Five-Spot Weather</h1>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm">Powered by WeatherAPI</span>
          <CloudRain className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
