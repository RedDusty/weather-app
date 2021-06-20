import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDirection, getUnitTemp } from '../functions';
import { directionType, loadType, unitType, weatherType } from '../types';

const ShortInfo: React.FC<{
  weather: weatherType | undefined;
  unit: unitType;
  setUnit: React.Dispatch<React.SetStateAction<unitType>>;
  load: loadType;
}> = ({ weather, unit, setUnit, load }) => {
  const { t } = useTranslation();
  const [weatherV, setWeatherV] = useState({
    temp: 0,
    feelsLike: 0,
    desc: t('LOADING'),
    windDir: t('LOADING'),
    windDirShort: t('LOADING'),
    city: t('LOADING'),
    country: t('LOADING'),
  });
  useEffect(() => {
    if (weather?.weather[0]?.id) {
      const id: number = weather.weather[0].id;
      if (id >= 200 && id < 300) {
        document.body.style.backgroundImage =
          'url(/img/weather/thunderstorm.jpg)';
      }
      if (id >= 300 && id < 400) {
        document.body.style.backgroundImage = 'url(/img/weather/drizzle.jpg)';
      }
      if (id >= 500 && id < 600) {
        document.body.style.backgroundImage = 'url(/img/weather/rain.jpg)';
      }
      if (id >= 600 && id < 700) {
        document.body.style.backgroundImage = 'url(/img/weather/snow.jpg)';
      }
      if (id === 701) {
        document.body.style.backgroundImage = 'url(/img/weather/mist.jpg)';
      }
      if (id === 711) {
        document.body.style.backgroundImage = 'url(/img/weather/smoke.jpg)';
      }
      if (id === 721) {
        document.body.style.backgroundImage = 'url(/img/weather/haze.jpg)';
      }
      // if (id === 731) {
      //   document.body.style.backgroundImage = '';
      // }
      if (id === 741) {
        document.body.style.backgroundImage = 'url(/img/weather/fog.jpg)';
      }
      if (id === 751) {
        document.body.style.backgroundImage = 'url(/img/weather/sand.jpg)';
      }
      if (id === 761) {
        document.body.style.backgroundImage = 'url(/img/weather/dust.jpg)';
      }
      if (id === 762) {
        document.body.style.backgroundImage =
          'url(/img/weather/volcanic_ash.jpg)';
      }
      if (id === 771) {
        document.body.style.backgroundImage = 'url(/img/weather/squalls.jpg)';
      }
      if (id === 781) {
        document.body.style.backgroundImage = 'url(/img/weather/tornado.jpg)';
      }
      if (id === 800) {
        document.body.style.backgroundImage = 'url(/img/weather/clear_sky.jpg)';
      }
      if (id >= 801 && id < 900) {
        document.body.style.backgroundImage = 'url(/img/weather/clouds.jpg)';
      }
    }
    const d: directionType = getDirection(weather?.wind?.deg || 0);
    if (load.fetch) {
      setWeatherV({
        temp: weather?.main?.temp || 0,
        feelsLike: weather?.main?.feels_like || 0,
        desc: weather?.weather[0]?.description
          ? weather.weather[0].description.charAt(0).toUpperCase() +
            weather.weather[0].description.slice(1)
          : t('ERROR_UNDEFINED'),
        city: weather?.name || t('ERROR_UNDEFINED'),
        country: weather?.sys?.country || t('ERROR_UNDEFINED'),
        windDir: d.long || t('ERROR_UNDEFINED'),
        windDirShort: d.short || t('ERROR_UNDEFINED'),
      });
    }
  }, [load.fetch]);

  return (
    <div className="w-full flex flex-col items-center text-white">
      <p className="text-3xl font-medium mt-2">
        {weatherV.city + ', ' + weatherV.country}
      </p>
      <div className="flex items-center flex-col mm:flex-row">
        {
          // eslint-disable-next-line
          weather?.cod == 200 ? (
            <img
              src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
              alt=""
            />
          ) : (
            <></>
          )
        }
        <div className="flex w-full h-full items-center relative -top-4 mm:top-0">
          <p className="text-6xl font-medium">
            {getUnitTemp(unit, weatherV.temp).toFixed(1)}&#176;
          </p>
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
      <p className="text-xl">{weatherV.desc}</p>
      <p className="text-lg">
        {t('FEELS_LIKE') + getUnitTemp(unit, weatherV.feelsLike).toFixed(1)}
        &#176;
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
            <div className="wind-h">
              <p className="bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl ml-1 wind-short">
                {weatherV.windDirShort}
              </p>
              <p className="bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl wind-long">
                {weatherV.windDir}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortInfo;
