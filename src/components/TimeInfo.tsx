import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTimeLeft } from '../functions';
import { loadType, timeType, weatherType } from '../types';
import TimeInfoTimer from './subcomponents/TimeInfoTimer';

const TimeInfo: React.FC<{ weather: weatherType | undefined; load: loadType }> =
  ({ weather, load }) => {
    const { t } = useTranslation();
    const [time, setTime] = useState<timeType>({
      timezone: 0,
      sunrise: new Date(),
      sunset: new Date(),
      dt: new Date(),
    });
    const [isShow, setShow] = useState<boolean>(true);

    useEffect(() => {
      setTime({
        dt: new Date(weather?.timezone || 0),
        sunrise: new Date((weather?.sys?.sunrise || 0) * 1000),
        sunset: new Date((weather?.sys?.sunset || 0) * 1000),
        timezone: weather?.timezone || 0,
      });
    }, [weather, load]);

    const renderSunset = time.sunset ? (
      <TimeInfoTimer time={time.sunset} timeString={t('SUNSET')} key="sunset" />
    ) : (
      <></>
    );
    const renderSunrise = time.sunrise ? (
      <TimeInfoTimer
        time={time.sunrise}
        timeString={t('SUNRISE')}
        key="sunrise"
      />
    ) : (
      <></>
    );
    return (
      <div className="flex flex-col items-center text-black dark:text-white">
        <hr
          className={
            'mt-6 mb-2 border-gray-300 dark:border-gray-700' +
            (isShow ? ' opacity-100 w-4/5' : ' opacity-50 w-1/5')
          }
          style={{ borderWidth: 1 }}
        />
        <div
          className={
            'box-transparent' +
            (isShow ? ' opacity-100' : ' opacity-50 hover:opacity-75')
          }
        >
          <label
            className="text-xl font-medium select-text cursor-pointer"
            htmlFor="time_display"
          >
            {t('TIME')}
          </label>
          <input
            type="checkbox"
            id="time_display"
            className="info-display"
            onChange={() => {
              setShow(!isShow);
            }}
          />
          <div className="info-display-tip bg-gray-300 dark:bg-gray-700">
            {isShow ? t('CLICK_HIDE') : t('CLICK_SHOW')}
          </div>
          <div className="info-display-block">
            {renderSunrise}
            {renderSunset}
          </div>
        </div>
      </div>
    );
  };

export default TimeInfo;
