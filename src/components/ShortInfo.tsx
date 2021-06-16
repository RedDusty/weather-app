import React from 'react';
import { unitType, weatherType } from '../types';

const ShortInfo: React.FC<{
  weather: weatherType | undefined;
  unit: unitType;
  setUnit: React.Dispatch<React.SetStateAction<unitType>>;
}> = ({ weather, unit, setUnit }) => {
  let temperature: number = 0;
  if (weather?.main?.temp) {
    switch (unit) {
      case 'celsius':
        temperature = weather.main.temp - 273;
        break;
      case 'fahrenheit':
        temperature = 1.8 * (weather.main.temp - 273) + 32;
        break;
      default:
        temperature = weather.main.temp;
        break;
    }
  }
  return (
    <div className="w-full flex flex-col items-center text-white dark:text-gray-300">
      <p className="text-3xl font-medium mt-2">
        {weather?.name + ', ' + weather?.sys?.country}
      </p>
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt=""
        />
        <p className="text-6xl font-medium">
          {temperature.toFixed(1)}&#176;{unit.charAt(0).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default ShortInfo;
