import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUnitTemp } from '../functions';
import { loadType, unitType, weatherType } from '../types';

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
    city: t('LOADING'),
    country: t('LOADING'),
  });
  const [tempWarning, setTempWarning] = useState({
    tempClassname: '',
    tempWarnImg: '',
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
      });
      if (weather?.main?.temp) {
        const temp = weather.main.temp;
        if (temp >= 298.15 && temp < 303.15) {
          // 25-30 Сelsius in Kelvin
          setTempWarning({
            tempClassname: 'text-yellow-300 dark:text-yellow-300',
            tempWarnImg: '',
          });
        }
        if (temp >= 303.15) {
          // 30 С in k
          setTempWarning({
            tempClassname: 'text-red-700 dark:text-red-300',
            tempWarnImg: '',
          });
        }
        if (temp <= 273.15 && temp > 258.15) {
          // 0 - -15 С in K
          setTempWarning({
            tempClassname: 'text-blue-600 dark:text-blue-200',
            tempWarnImg: '',
          });
        }
        if (temp <= 258.15) {
          // -15 С in K
          setTempWarning({
            tempClassname: 'text-blue-900 dark:text-blue-700',
            tempWarnImg: '',
          });
        }
        if (temp > 273.15 && temp < 298.15) {
          setTempWarning({
            tempClassname: 'text-black dark:text-white',
            tempWarnImg: '',
          })
        }
      }
    }
  }, [weather, load]);

  return (
    <div className="w-full flex flex-col items-center text-black dark:text-white mt-14">
      <div className="box-transparent mt-2">
        <p className="text-3xl font-medium">
          {weatherV.city + ', ' + weatherV.country}
        </p>
        <div className="flex items-center flex-col mm:flex-row my-2 px-2">
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
            <p className={`text-6xl font-medium ${tempWarning.tempClassname}`}>
              {getUnitTemp(unit, weatherV.temp).toFixed(1)}&#176;
            </p>
            <button
              className={`text-6xl btn-select font-medium outline-none bg-white hover:bg-gray-300 hover:bg-opacity-75 bg-opacity-35 dark:bg-black dark:hover:bg-gray-700 dark:hover:bg-opacity-75 dark:bg-opacity-35 ml-2 p-2 rounded-xl ${tempWarning.tempClassname}`}
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
      </div>
    </div>
  );
};

export default ShortInfo;
