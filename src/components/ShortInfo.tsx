import React from 'react';
import { useTranslation } from 'react-i18next';
import { getUnitTemp } from '../functions';
import { unitType, weatherType } from '../types';

const ShortInfo: React.FC<{
  weather: weatherType | undefined;
  unit: unitType;
  setUnit: React.Dispatch<React.SetStateAction<unitType>>;
}> = ({ weather, unit, setUnit }) => {
  const { t } = useTranslation();
  let temperature: number = 0;
  let feelsLike: number = 0;
  let description: string = t('ERROR_UNDEFINED');
  if (weather?.main?.temp) {
    temperature = getUnitTemp(unit, weather.main.temp);
  }
  if (weather?.main?.feels_like) {
    feelsLike = getUnitTemp(unit, weather.main.feels_like);
  }
  if (weather?.weather[0]?.description) {
    description =
      weather?.weather[0]?.description?.charAt(0).toUpperCase() +
      weather?.weather[0]?.description?.slice(1);
  }
  return (
    <div className="w-full flex flex-col items-center text-white dark:text-gray-300">
      <p className="text-3xl font-medium mt-2">
        {weather?.name + ', ' + weather?.sys?.country}
      </p>
      <div className="flex items-center flex-col mm:flex-row">
        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt=""
        />
        <div className="flex w-full h-full items-center relative -top-4 mm:top-0">
          <p className="text-6xl font-medium">{temperature.toFixed(1)}&#176;</p>
          <button
            className="text-6xl font-medium outline-none bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl"
            onClick={() => {
              switch (unit) {
                case 'celsius':
                  setUnit('fahrenheit');
                  localStorage.setItem('unit', 'fahrenheit');
                  break;
                case 'fahrenheit':
                  setUnit('kelvin');
                  localStorage.setItem('unit', 'kelvin');
                  break;
                case 'kelvin':
                  setUnit('celsius');
                  localStorage.setItem('unit', 'celsius');
                  break;
              }
            }}
          >
            {unit.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
      <p className="text-xl">{description}</p>
      <p className="text-lg">
        {t('FEELS_LIKE') + feelsLike.toFixed(1)}&#176;
        {unit.charAt(0).toUpperCase()}
      </p>
    </div>
  );
};

export default ShortInfo;
