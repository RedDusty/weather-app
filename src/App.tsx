import React, { useEffect, useState } from 'react';
import './App.css';
import { geoloc, loadType, unitType, weatherType } from './types';
import http from 'http';
import Search from './components/Search';
import ShortInfo from './components/ShortInfo';

function App() {
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
      // fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER}`,
      // )
      //   .then((res) => res.json())
      //   .then((value) => {
      //     if (value.cod == 200) {
      //       setWeather(value);
      //     } else {
      //       console.log(value.cod, value.message);
      //     }
      //     localStorage.setItem('latitude', String(value.coord?.lat));
      //     localStorage.setItem('longitude', String(value.coord?.lon));
      //     load.fetch = true;
      //   });
    }
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        load.geoloc = true;
        load.ip = false;
        const locReturn: geoloc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isError: null,
          accuracy: pos.coords.accuracy,
          isLoading: false,
        };
        setLocation(locReturn);
        load.endLocation = true;
        getWeather();
      },
      (error: GeolocationPositionError) => {
        load.geoloc = false;
        load.ip = true;
        let locReturn: geoloc = {
          latitude: 0,
          longitude: 0,
          accuracy: 0,
          isError: null,
          isLoading: false,
        };
        http.get(
          { host: 'api.ipify.org', port: 80, path: '/' },
          function (resp) {
            resp.on('data', function (ip) {
              console.log(ip);
              // fetch(
              //   `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IP}`,
              // )
              //   .then((res) => res.json())
              //   .then((value) => {
              //     locReturn.latitude = value.latitude;
              //     locReturn.longitude = value.longitude;
              //     switch (error.code) {
              //       case error.PERMISSION_DENIED:
              //         load.error = true;
              //         locReturn.isError =
              //           'Location: User denied the request for Geolocation.';
              //         break;
              //       case error.POSITION_UNAVAILABLE:
              //         load.error = true;
              //         locReturn.isError =
              //           'Location: Location information is unavailable.';
              //         break;
              //       case error.TIMEOUT:
              //         load.error = true;
              //         locReturn.isError =
              //           'Location: The request to get user location timed out.';
              //         break;
              //       default:
              //         load.error = true;
              //         locReturn.isError =
              //           'Location: An unknown error occurred.';
              //         break;
              //     }
              //     setLocation(locReturn);
              //     load.endLocation = true;
              //     getWeather();
              //   });
            });
          },
        );
      },
    );
  }, [location.latitude, location.longitude]);
  return (
    <div className="App bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25">
      <Search />
      <ShortInfo weather={weather} unit={unit} setUnit={setUnit} load={load} />
    </div>
  );
}

export default App;
