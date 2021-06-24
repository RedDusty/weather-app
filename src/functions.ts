import { unitType } from './types';

export const getCelsius: (kelvin: number) => number = (kelvin: number) => {
  return kelvin - 273;
};

export const getFahrenheit: (kelvin: number) => number = (kelvin: number) => {
  return 1.8 * (kelvin - 273) + 32;
};

export const getUnitTemp: (unit: unitType, temp: number) => number = (
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

export const getDirection: (direction: number) => string = (
  direction: number,
) => {
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
