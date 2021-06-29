import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDewPoint, getDirection } from '../functions';
import { loadType, unitType, weatherType } from '../types';

const Details: React.FC<{
  weather: weatherType | undefined;
  load: loadType;
  unit: unitType;
}> = ({ weather, load, unit }) => {
  const { t } = useTranslation();
  const [details, setDetails] = useState({
    pressure: 0,
    humidity: 0,
    feelsLike: 0,
    visibility: 0,
    windSpeed: t('LOADING'),
    windGust: t('LOADING'),
    windDir: t('LOADING'),
    windDirShort: t('LOADING'),
  });
  const [isShow, setShow] = useState<boolean>(true);
  useEffect(() => {
    const d: string = getDirection(weather?.wind?.deg || 99999);
    setDetails({
      pressure: weather?.main?.pressure || 0,
      humidity: weather?.main?.humidity || 0,
      feelsLike: weather?.main?.feels_like || 0,
      visibility: weather?.visibility || 0,
      windSpeed: `${weather?.wind?.speed || 0} ${t('METRIC')}`,
      windGust: `${weather?.wind?.gust || 0} ${t('METRIC')}`,
      windDir: d.length !== 0 ? t(`${d}_Long`) : t('ERROR_UNDEFINED'),
      windDirShort: d.length !== 0 ? t(d) : t('ERROR_UNDEFINED'),
    });
  }, [weather, load.fetch]);
  return (
    <div className="flex flex-col items-center text-black dark:text-white">
      <hr
        className={
          'mt-6 mb-2 border-gray-300 dark:border-gray-700' +
          (isShow ? ' opacity-100 w-4/5' : ' opacity-50 w-1/5')
        }
        style={{ borderWidth: 1.2 }}
      />
      <div
        className={
          'box-transparent' +
          (isShow ? ' opacity-100' : ' opacity-50 hover:opacity-75')
        }
      >
        <label
          className="text-xl font-medium select-text cursor-pointer"
          htmlFor="details_display"
        >
          {t('DETAILS')}
        </label>
        <input
          type="checkbox"
          id="details_display"
          className="info-display"
          onChange={() => {
            setShow(!isShow);
          }}
        />
        <div className="info-display-tip bg-gray-300 dark:bg-gray-700">
          {isShow ? t('CLICK_HIDE') : t('CLICK_SHOW')}
        </div>
        <div className="flex flex-col info-display-block">
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
              <div className="flex items-center info-h">
                <p className="bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl ml-1 info-short">
                  {details.windDirShort}
                </p>
                <p className="bg-white bg-opacity-100 dark:bg-black dark:bg-opacity-100 p-2 rounded-xl ml-1 info-long">
                  {details.windDir}
                </p>
              </div>
              <p className="ml-2">{details.windSpeed}</p>
              <p className="ml-4">{t('GUST') + ': ' + details.windGust}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex">
              <p>{t('DEW')}</p>&nbsp;
              <p className="font-medium">
                {getDewPoint(
                  unit,
                  weather?.main?.feels_like || 20,
                  weather?.main?.humidity || 50,
                ).toFixed(1)}
              </p>
              <p>° {unit.charAt(0).toUpperCase()}</p>
            </div>
            <div className="flex ml-4 items-center">
              <p>{t('VISIBILITY')}</p>
              <div className="flex info-h ml-2">
                <div className="flex bg-white bg-opacity-35 dark:bg-black dark:bg-opacity-35 p-2 rounded-xl info-short">
                  <p className="font-medium">
                    {details.visibility > 1000
                      ? (details.visibility / 1000).toFixed(1)
                      : details.visibility}
                  </p>
                  <p className="ml-2">
                    {details.visibility < 1000 ? t('M') : t('KM')}
                  </p>
                </div>
                <div className="flex bg-white bg-opacity-100 dark:bg-black dark:bg-opacity-100 p-2 rounded-xl info-long">
                  <p>{details.visibility}</p>
                  <p className="ml-2">{t('M')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
