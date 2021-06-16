import React, { useEffect, useState } from 'react';
import './App.css';
import { geoloc } from './types';
import http from 'http';

function App() {
  const [location, setLocation] = useState<geoloc>({
    latitude: 0,
    longitude: 0,
    isError: 'Loading',
    accuracy: 0,
    isLoading: true,
  });
  console.log(location.latitude);

  useEffect(() => {
    function getWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER}`,
      )
        .then((res) => res.json())
        .then((value) => console.log(value));
    }
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const locReturn: geoloc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isError: null,
          accuracy: pos.coords.accuracy,
          isLoading: false,
        };
        setLocation(locReturn);
        getWeather();
      },
      (error: GeolocationPositionError) => {
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
              fetch(
                `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IP}`,
              )
                .then((res) => res.json())
                .then((value) => {
                  locReturn.latitude = value.latitude;
                  locReturn.longitude = value.longitude;
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      locReturn.isError =
                        'Location: User denied the request for Geolocation.';
                      break;
                    case error.POSITION_UNAVAILABLE:
                      locReturn.isError =
                        'Location: Location information is unavailable.';
                      break;
                    case error.TIMEOUT:
                      locReturn.isError =
                        'Location: The request to get user location timed out.';
                      break;
                    default:
                      locReturn.isError =
                        'Location: An unknown error occurred.';
                      break;
                  }
                  setLocation(locReturn);
                  getWeather();
                });
            });
          },
        );
      },
    );
  }, [location.latitude, location.longitude]);
  return <div className="App"></div>;
}

export default App;
