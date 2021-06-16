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
