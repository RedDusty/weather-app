import { unitType, cityType } from './types';

export const getCelsius: (arg0: number) => number = (kelvin: number) => {
  return kelvin - 273.15;
};

export const getFahrenheit: (arg0: number) => number = (kelvin: number) => {
  return 1.8 * (kelvin - 273.15) + 32;
};

/**
 * Scale of temperature.
 * @see https://en.wikipedia.org/wiki/Scale_of_temperature
 *
 * @param unit @type {'celsius'} @type {'fahrenheit'} @type {'kelvin'} @type {string}
 * @param temp @type {number} @type {'kelvin'}
 * @returns {number}
 */
export const getUnitTemp: (arg0: unitType, arg1: number) => number = (
  unit: unitType,
  temp: number,
) => {
  switch (unit) {
    case 'celsius':
      return getCelsius(temp);
    case 'fahrenheit':
      return getFahrenheit(temp);
    default:
      return temp;
  }
};

/**
 * Dew point calculation.
 * @see https://en.wikipedia.org/wiki/Dew_point
 *
 * @param unit @type {unitType}
 * @param temperature in celsius @type {number}
 * @param humidity @type {number}
 * @returns {number}
 */
export const getDewPoint: (
  arg0: unitType,
  arg1: number,
  arg3: number,
) => number = (unit: unitType, temperature: number, humidity: number) => {
  const temperatureCelsius = getUnitTemp('celsius', temperature);
  const a = 17.27;
  const b = 237.7;

  const temp =
    (a * temperatureCelsius) / (b + temperatureCelsius) +
    Math.log(humidity / 100);

  const dew = (b * temp) / (a - temp);

  switch (unit) {
    case 'celsius':
      return dew;
    case 'fahrenheit':
      return dew * 1.8 + 32;
    default:
      return dew + 273.15;
  }
};

export async function searchFetch(search: string) {
  const res: Response = await fetch('json/city.list.json');
  const json = await res.json();

  let matches: Array<cityType> = json.filter((city: cityType) => {
    const regex = new RegExp(`${search}`, 'gi');
    return city.name.match(regex);
  });

  if (search.length === 0) {
    matches = [];
  }

  return matches;
}

export async function getWeatherByCity(city: string, country: string = 'EN') {
  const res: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}$units=metric&appid=${process.env.REACT_APP_WEATHER}`)
  const json = await res.json();

  return json
}

export async function getWeatherByCoords(latitude: number = 0, longitude: number = 0) {
  const res: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER}`)
  const json = await res.json();

  return json
}

export const getDirection: (arg0: number) => string = (direction: number) => {
  let windDirectional: string | 'N';
  const d: number = direction;
  if (d >= 78 && d < 101) {
    windDirectional = 'E';
  } else if (d >= 101 && d < 123) {
    windDirectional = 'ESE';
  } else if (d >= 123 && d < 146) {
    windDirectional = 'SE';
  } else if (d >= 146 && d < 168) {
    windDirectional = 'SSE';
  } else if (d >= 168 && d < 191) {
    windDirectional = 'S';
  } else if (d >= 191 && d < 213) {
    windDirectional = 'SSW';
  } else if (d >= 213 && d < 236) {
    windDirectional = 'SW';
  } else if (d >= 236 && d < 258) {
    windDirectional = 'WSW';
  } else if (d >= 258 && d < 281) {
    windDirectional = 'W';
  } else if (d >= 281 && d < 303) {
    windDirectional = 'WNW';
  } else if (d >= 303 && d < 326) {
    windDirectional = 'NW';
  } else if (d >= 326 && d < 348) {
    windDirectional = 'NNW';
  } else if ((d >= 348 && d <= 360) || (d >= 0 && d < 11)) {
    windDirectional = 'N';
  } else if (d >= 11 && d < 33) {
    windDirectional = 'NNE';
  } else if (d >= 33 && d < 56) {
    windDirectional = 'NE';
  } else if (d >= 56 && d < 78) {
    windDirectional = 'EEN';
  } else {
    windDirectional = '';
    windDirectional = '';
  }
  return windDirectional;
};
