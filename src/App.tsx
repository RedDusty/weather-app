import React, { useEffect, useState } from 'react';
import './App.css';
import { geoloc, loadType, unitType, weatherType } from './types';
import Search from './components/Search';
import ShortInfo from './components/ShortInfo';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [weatherUpdate, setWeatherUpdate] = useState<number>(0);
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
    function getWeatherCoords() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER}`,
      )
        .then((res) => res.json())
        .then((value) => {
          let dLoad: loadType = load;
          if (value.cod == 200) {
            setWeather(value);
            localStorage.setItem('latitude', String(value.coord?.lat));
            localStorage.setItem('longitude', String(value.coord?.lon));
            dLoad.fetch = true;
            setLoad(dLoad);
          } else {
            console.log(value.cod, value.message);
          }
        });
    }
    function getWeatherCity(city: string, country: string) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}$units=metric&APPID=198cd283dcf7843f856ffac9637c3bbd`,
      )
        .then((res) => res.json())
        .then((value) => {
          let dLoad: loadType = load;
          if (value.cod == 200) {
            setWeather(value);
            localStorage.setItem('latitude', String(value.coord?.lat));
            localStorage.setItem('longitude', String(value.coord?.lon));
            dLoad.fetch = true;
            setLoad(dLoad);
            setLocation({
              accuracy: 0,
              isError: null,
              isLoading: false,
              latitude: value.coord?.lat,
              longitude: value.coord?.lon,
            });
          } else {
            console.log(value.cod, value.message);
          }
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
        getWeatherCoords();
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
        fetch(`https://api.db-ip.com/v2/free/self`)
          .then((res) => res.json())
          .then((values) => {
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
            getWeatherCity(values.city, values.countryCode);
          });
      },
    );
  }, [navigator.geolocation, weatherUpdate]);
  return (
    <div className="App bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25">
      <Search />
      {load.geoloc === false && load.ip === false ? (
        <div className="bg-gray-300 dark:bg-black text-gray-800 dark:text-gray-300 shadow-lg w-full bg-opacity-30 dark:bg-opacity-30 text-xl font-medium mt-6 py-8">
          <p className="mx-8">{t('LOCATION_ERROR')}</p>
          <hr className="mt-2 w-2/3 mx-auto border-gray-500" />
          <div className="mt-8 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-gray-800 dark:text-gray-200"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
            </svg>
            <p className="font-normal text-base text-gray-800 dark:text-gray-200 ml-4">
              {location.isError}
            </p>
          </div>
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
