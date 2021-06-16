export type geoloc = {
  latitude: number;
  longitude: number;
  isError: string | null;
  accuracy: number;
  isLoading: boolean;
};

export type geoadress = {};

type weatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type coordType = {
  lon: number;
  lat: number;
};

type mainType = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
};

type windType = {
  speed: number;
  deg: number;
  dust: number;
};

type cloudsType = {
  all: number;
};

type sysType = {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type hoursType = {
  '1h': number;
  '3h': number;
};

export type responseJson = {
  coord: coordType;
  weather: Array<weatherType>;
  base: string;
  main: mainType;
  visibility: number;
  wind: windType;
  clouds: cloudsType;
  rain: hoursType;
  snow: hoursType;
  dt: number;
  sys: sysType;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
