import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDirection, getUnitTemp } from '../functions';
import { directionType, loadType, unitType, weatherType } from '../types';

const ShortInfo: React.FC<{
  weather: weatherType | undefined;
  unit: unitType;
  setUnit: React.Dispatch<React.SetStateAction<unitType>>;
  load: loadType;
}> = ({ weather, unit, setUnit, load }) => {
  const [windHover, setWindHover] = useState<boolean>(false);
  const { t } = useTranslation();
  let temperature: number = 0;
  let feelsLike: number = 0;
  let description: string = t('LOADING');
  let windDirectional: string = t('LOADING');
  let windDirectionalShort: string = t('LOADING');
  let city: string = t('LOADING');
  let country: string = t('LOADING');
  if (load.fetch) {
    city = weather?.name || t('ERROR_UNDEFINED');
    country = weather?.sys?.country || t('ERROR_UNDEFINED');
    if (weather?.main?.temp || weather?.main?.temp === 0) {
      temperature = getUnitTemp(unit, weather.main.temp);
    }
    if (weather?.main?.feels_like || weather?.main?.feels_like === 0) {
      feelsLike = getUnitTemp(unit, weather.main.feels_like);
    }
    if (weather?.weather[0]?.description) {
      description =
        weather?.weather[0]?.description?.charAt(0).toUpperCase() +
        weather?.weather[0]?.description?.slice(1);
    } else {
      description = t('ERROR_UNDEFINED');
    }
    if (weather?.wind?.deg || weather?.wind?.deg === 0) {
      const d: directionType = getDirection(weather.wind.deg);
      windDirectional = d.long ? d.long : t('ERROR_UNDEFINED');
      windDirectionalShort = d.short ? d.short : t('ERROR_UNDEFINED');
    } else {
      windDirectional = t('ERROR_UNDEFINED');
      windDirectionalShort = t('ERROR_UNDEFINED');
    }
  }
  return (
    <div className="w-full flex flex-col items-center text-white">
      <p className="text-3xl font-medium mt-2">{city + ', ' + country}</p>
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
      <hr
        className="w-4/5 mt-6 mb-2 border-white"
        style={{ borderWidth: 1.2 }}
      />
      <div>
        <p className="text-xl font-medium">{t('DETAILS')}</p>
        <div className="flex mt-2">
          <div className="flex">
            <div className="flex flex-col leading-none text-sm">
              <p>{t('PRESSURE')}</p>
              <p>{t('BAROMETER')}</p>
            </div>
            <p className="text-lg ml-2 font-medium">
              {weather?.main?.pressure?.toFixed(2) || 0}
            </p>
            <div className="flex flex-col ml-2 leading-none text-sm">
              <p>hPa</p>
              <p>mb</p>
            </div>
          </div>
          <div className="flex ml-6">
            <p>{t('HUMIDITY')}</p>&nbsp;
            <p className="font-medium">
              {(weather?.main?.humidity?.toFixed(0) || 0) + '%'}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <p>{t('WIND') + ' '}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="ml-2 fill-current text-white"
              style={{
                transform: `rotate(${(weather?.wind?.deg || 0) + 90}deg)`,
              }}
            >
              <path d="M22 12l-20 12 7.289-12-7.289-12z" />
            </svg>
            <p
              className={`bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl ml-1 wind-short ${
                windHover ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {windDirectionalShort}
            </p>
            <p
              className="bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl hidden wind-long relative -left-8"
              onMouseEnter={() => {
                setWindHover(true);
              }}
              onMouseLeave={() => {
                setWindHover(false);
              }}
            >
              {windDirectional}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortInfo;
