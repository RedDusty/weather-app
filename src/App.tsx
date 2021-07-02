import React, { useEffect, useState } from 'react';
import './App.css';
import { geoloc, loadType, unitType, weatherType } from './types';
import Search from './components/Search';
import ShortInfo from './components/ShortInfo';
import { useTranslation } from 'react-i18next';
import TimeInfo from './components/TimeInfo';
import Details from './components/Details';
import { getWeatherByCity, getWeatherByCoords } from './functions';
import Loading from './components/subcomponents/Loading';

function App() {
  const { t } = useTranslation();
  const locationStorage: geoloc = {
    coord: {
      lat: Number(localStorage.getItem('latitude')) || 0,
      lon: Number(localStorage.getItem('longitude')) || 0,
    },
    accuracy: 0,
  };
  const [location, setLocation] = useState<geoloc>(locationStorage);
  const unitStorage: unitType =
    (localStorage.getItem('unit') as unitType) || 'celsius';
  const [unit, setUnit] = useState<unitType>(unitStorage);
  const [load, setLoad] = useState<loadType>({
    geoloc: false,
    ip: false,
    fetch: false,
    error: false,
    search: Boolean(localStorage.getItem('search')),
    isLoading: true,
    errorMessage: '',
  });

  const [weather, setWeather] = useState<weatherType>();

  const isDev: boolean = false;

  useEffect(() => {
    // fetch functions
    async function getWeatherCity(city: string, country: string) {
      setLoad({
        error: false,
        fetch: true,
        geoloc: false,
        ip: true,
        isLoading: true,
        search: load.search,
        errorMessage: load.errorMessage,
      });
      const resCity: weatherType = await getWeatherByCity(city, country);
      if (resCity.cod === 200) {
        setLoad({
          error: false,
          fetch: true,
          geoloc: false,
          ip: true,
          isLoading: false,
          search: load.search,
          errorMessage: load.errorMessage,
        });
        localStorage.setItem('latitude', String(resCity.coord?.lat || 0));
        localStorage.setItem('longitude', String(resCity.coord?.lon || 0));
        setWeather(resCity);
      } else {
        setLoad({
          error: true,
          errorMessage: t('SERVER_ERROR'),
          fetch: true,
          geoloc: false,
          ip: true,
          isLoading: false,
          search: load.search,
        });
      }
    }
    async function getWeatherCoord(lat: number, lon: number) {
      setLoad({
        error: false,
        fetch: true,
        geoloc: true,
        ip: false,
        isLoading: true,
        search: load.search,
        errorMessage: '',
      });
      const resCoords: weatherType = await getWeatherByCoords(lat, lon);
      if (resCoords.cod === 200) {
        setLoad({
          error: false,
          fetch: true,
          geoloc: false,
          ip: true,
          isLoading: false,
          search: load.search,
          errorMessage: load.errorMessage,
        });
        localStorage.setItem('latitude', String(resCoords.coord?.lat || 0));
        localStorage.setItem('longitude', String(resCoords.coord?.lon || 0));
        setWeather(resCoords);
      } else {
        setLoad({
          error: true,
          errorMessage: t('SERVER_ERROR'),
          fetch: true,
          geoloc: true,
          ip: false,
          isLoading: false,
          search: load.search,
        });
      }
    }
    // DEV
    if (isDev) {
      setLoad({
        error: false,
        fetch: false,
        geoloc: true,
        ip: false,
        isLoading: true,
        search: load.search,
        errorMessage: '',
      });
      fetch('json/example.json')
        .then((resExample) => resExample.json())
        .then((values: weatherType) => {
          setWeather(values);
          setLoad({
            error: false,
            fetch: true,
            geoloc: true,
            ip: false,
            isLoading: false,
            search: load.search,
            errorMessage: '',
          });
          localStorage.setItem('latitude', String(values.coord?.lat));
          localStorage.setItem('longitude', String(values.coord?.lon));
        })
        .catch((error) => console.log(error));
    }
    // NOT DEV
    if (!isDev) {
      // IF SEARCH
      if (Boolean(localStorage.getItem('search'))) {
        getWeatherCoord(location.coord.lat || 0, location.coord.lon || 0);
      }
      // STANDARD LOADING
      if (!load.search) {
        // GET GEOLOCATION
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLoad({
              error: false,
              fetch: false,
              geoloc: true,
              ip: false,
              isLoading: true,
              search: load.search,
              errorMessage: '',
            });
            setLocation({
              accuracy: pos.coords.accuracy,
              coord: { lat: pos.coords.latitude, lon: pos.coords.longitude },
            });
            getWeatherCoord(pos.coords.latitude, pos.coords.longitude);
          },
          // GET LOCATION BY IP, BECAUSE GEOLOCATION IS BLOCKED
          async (error: GeolocationPositionError) => {
            const resIp: Response = await fetch(
              `https://api.db-ip.com/v2/free/self`,
            );
            const json = await resIp.json();
            const dummyLoad: loadType = {
              error: false,
              fetch: false,
              geoloc: false,
              ip: true,
              isLoading: true,
              search: load.search,
              errorMessage: load.errorMessage,
            };
            switch (error.code) {
              case error.PERMISSION_DENIED:
                dummyLoad.errorMessage =
                  'Location: User denied the request for Geolocation.';
                break;
              case error.POSITION_UNAVAILABLE:
                dummyLoad.errorMessage =
                  'Location: Location information is unavailable.';
                break;
              case error.TIMEOUT:
                dummyLoad.errorMessage =
                  'Location: The request to get user location timed out.';
                break;
              default:
                dummyLoad.errorMessage = 'Location: An unknown error occurred.';
                break;
            }
            // If {city: '...'} exist -> pass
            if (json.city) {
              setLoad(dummyLoad);
              getWeatherCity(json.city, json.countryCode);
            } else {
              setLoad({
                error: true,
                errorMessage: t('SERVER_ERROR'),
                fetch: false,
                geoloc: false,
                ip: false,
                isLoading: false,
                search: load.search,
              });
            }
          },
        );
      }
    }
  }, [navigator.geolocation, location.coord]);
  let render = (
    <div className="center">
      <Loading size={500} />
    </div>
  );
  let loading = (
    <div className="w-screen h-screen z-50 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 fixed top-0 left-0 center">
      <Loading size={500} />
    </div>
  );
  if (load.error) {
    render = (
      <div className="center">
        <div className="bg-gray-300 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 w-full sm:w-auto py-4 sm:px-4 sm:py-8 md:p-12 sm:rounded-xl shadow-lg">
          <p className="font-medium text-xl text-black dark:text-white">
            {load.errorMessage}
          </p>
        </div>
      </div>
    );
  }
  if (load.geoloc === false && load.ip === false) {
    render = (
      <div className="center">
        <div className="font-medium text-xl text-black dark:text-white shadow-lg bg-gray-300 dark:bg-gray-700 w-full sm:w-auto sm:m-4 sm:p-4 sm:rounded-xl">
          <p className="m-2">{t('LOCATION_ERROR')}</p>
          <hr className="mt-2 w-2/3 mx-auto border-gray-500" />
          <div className="mt-8 mb-4 flex justify-center">
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
              {load.errorMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (
    load.fetch === true &&
    load.error !== true &&
    (load.ip === true || load.geoloc === true)
  ) {
    render = (
      <>
        <ShortInfo
          weather={weather}
          unit={unit}
          setUnit={setUnit}
          load={load}
        />
        <Details weather={weather} load={load} unit={unit} />
        <TimeInfo weather={weather} load={load} />
      </>
    );
  }
  const renderDev = (<div className="absolute top-16 right-16 font-medium text-lg select-none bg-white dark:bg-black text-red-700 dark:text-red-300 px-2 py-0.5 rounded-md">DEV</div>)
  return (
    <div className="App bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25">
      {isDev ? renderDev : <></>}
      <Search setLocation={setLocation} setLoad={setLoad} load={load} />
      {render}
      {load.isLoading ? loading : <></>}
    </div>
  );
}

export default App;
