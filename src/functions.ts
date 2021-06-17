import { directionType, unitType } from './types';

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

export const getDirection: (direction: number) => directionType = (
  direction: number,
) => {
  let windDirectional: string | null;
  let windDirectionalShort: string | null;
  const d: number = direction;
  let directions: directionType;
  if (d >= 78 && d < 101) {
    windDirectional = 'East';
    windDirectionalShort = 'E';
  } else if (d >= 101 && d < 123) {
    windDirectional = 'Ease South East';
    windDirectionalShort = 'ESE';
  } else if (d >= 123 && d < 146) {
    windDirectional = 'South East';
    windDirectionalShort = 'SE';
  } else if (d >= 146 && d < 168) {
    windDirectional = 'South South East';
    windDirectionalShort = 'SSE';
  } else if (d >= 168 && d < 191) {
    windDirectional = 'South';
    windDirectionalShort = 'S';
  } else if (d >= 191 && d < 213) {
    windDirectional = 'South South West';
    windDirectionalShort = 'SSW';
  } else if (d >= 213 && d < 236) {
    windDirectional = 'South West';
    windDirectionalShort = 'SW';
  } else if (d >= 236 && d < 258) {
    windDirectional = 'West South West';
    windDirectionalShort = 'WSW';
  } else if (d >= 258 && d < 281) {
    windDirectional = 'West';
    windDirectionalShort = 'W';
  } else if (d >= 281 && d < 303) {
    windDirectional = 'West North West';
    windDirectionalShort = 'WNW';
  } else if (d >= 303 && d < 326) {
    windDirectional = 'North West';
    windDirectionalShort = 'NW';
  } else if (d >= 326 && d < 348) {
    windDirectional = 'North North West';
    windDirectionalShort = 'NNW';
  } else if ((d >= 348 && d <= 360) || (d >= 0 && d < 11)) {
    windDirectional = 'North';
    windDirectionalShort = 'N';
  } else if (d >= 11 && d < 33) {
    windDirectional = 'North North East';
    windDirectionalShort = 'NNE';
  } else if (d >= 33 && d < 56) {
    windDirectional = 'North East';
    windDirectionalShort = 'NE';
  } else if (d >= 56 && d < 78) {
    windDirectional = 'East East North';
    windDirectionalShort = 'EEN';
  } else {
    windDirectional = null;
    windDirectionalShort = null;
  }
  directions = {
    long: windDirectional,
    short: windDirectionalShort,
  };
  return directions;
};
