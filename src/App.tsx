import React, { useEffect, useState } from 'react';
import './App.css';
import { geoloc, loadType, unitType, weatherType } from './types';
import Search from './components/Search';
import ShortInfo from './components/ShortInfo';
import publicIp from 'public-ip';
import { useTranslation } from 'react-i18next';

async function getIP(callback: Function) {
  callback(
    await publicIp.v4({
      fallbackUrls: [],
    }),
  );
}

function App() {
  const { t } = useTranslation();
  const locationStorage: geoloc = {
    latitude: Number(localStorage.getItem('latitude')) || 0,
    longitude: Number(localStorage.getItem('longitude')) || 0,
    isError: 'Loading',
    accuracy: 0,
    isLoading: true,
  };
  const [location, setLocation] = useState<geoloc>(locationStorage);
  const unitStorage: unitType =
    (localStorage.getItem('unit') as unitType) || 'celsius';
  const [unit, setUnit] = useState<unitType>(unitStorage);
  const [load, setLoad] = useState<loadType>({
    geoloc: false,
    ip: false,
    fetch: false,
    endLocation: false,
    error: false,
  });

  const [weather, setWeather] = useState<weatherType>();

  // EXAMPLE
  // useEffect(() => {
  //   setLoad({ ...load, geoloc: true, endLocation: true });
  //   fetch('json/example.json')
  //     .then((res) => res.json())
  //     .then((values: weatherType) => {
  //       setWeather(values);
  //       setLoad({ ...load, fetch: true });
  //       localStorage.setItem('latitude', String(values.coord?.lat));
  //       localStorage.setItem('longitude', String(values.coord?.lon));
  //     });
  // }, []);

  useEffect(() => {
    function getWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER}`,
      )
        .then((res) => res.json())
        .then((value) => {
          let dLoad: loadType = load;
          if (value.cod == 200) {
            setWeather(value);
          } else {
            console.log(value.cod, value.message);
          }
          localStorage.setItem('latitude', String(value.coord?.lat));
          localStorage.setItem('longitude', String(value.coord?.lon));
          dLoad.fetch = true;
          setLoad(dLoad);
        });
    }
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        let dLoad: loadType = load;
        dLoad.geoloc = true;
        dLoad.ip = false;
        setLoad(dLoad);
        const locReturn: geoloc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isError: null,
          accuracy: pos.coords.accuracy,
          isLoading: false,
        };
        setLocation(locReturn);
        dLoad.endLocation = true;
        setLoad(dLoad);
        getWeather();
      },
      (error: GeolocationPositionError) => {
        let dLoad: loadType = load;
        dLoad.geoloc = false;
        dLoad.ip = true;
        setLoad(dLoad);
        let locReturn: geoloc = {
          latitude: 0,
          longitude: 0,
          accuracy: 0,
          isError: null,
          isLoading: false,
        };
        getIP((ip: string) => {
          fetch(
            `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IP}`,
          )
            .then((res) => res.json())
            .then((value) => {
              locReturn.latitude = value.latitude;
              locReturn.longitude = value.longitude;
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  dLoad.error = true;
                  locReturn.isError =
                    'Location: User denied the request for Geolocation.';
                  break;
                case error.POSITION_UNAVAILABLE:
                  dLoad.error = true;
                  locReturn.isError =
                    'Location: Location information is unavailable.';
                  break;
                case error.TIMEOUT:
                  dLoad.error = true;
                  locReturn.isError =
                    'Location: The request to get user location timed out.';
                  break;
                default:
                  dLoad.error = true;
                  locReturn.isError = 'Location: An unknown error occurred.';
                  break;
              }
              setLocation(locReturn);
              dLoad.endLocation = true;
              setLoad(dLoad);
              getWeather();
            });
        });
      },
    );
  }, [location.latitude, location.longitude, navigator.geolocation]);
  console.log(load);
  return (
    <div className="App bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25">
      <Search />
      {load.geoloc === false && load.ip === false ? (
        <div className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg w-full bg-opacity-75 dark:bg-opacity-75 text-xl font-medium mt-6">
          <p>{t('LOCATION_ERROR')}</p>
        </div>
      ) : (
        <></>
      )}
      {load.geoloc || load.ip ? (
        <ShortInfo
          weather={weather}
          unit={unit}
          setUnit={setUnit}
          load={load}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
