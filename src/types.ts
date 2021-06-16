export type geoloc = {
  latitude: number;
  longitude: number;
  isError: string | null;
  accuracy: number;
  isLoading: boolean;
};

export type unitType = 'kelvin' | 'celsius' | 'fahrenheit';

export type geoadress = {};

type weatherArrayType = {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
};

type coordType = {
  lon?: number;
  lat?: number;
};

type mainType = {
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  temp_min?: number;
  temp_max?: number;
  sea_level?: number;
  grnd_level?: number;
};

type windType = {
  speed?: number;
  deg?: number;
  gust?: number;
};

type cloudsType = {
  all?: number;
};

type sysType = {
  type: number;
  id: number;
  message?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
};

type hoursType = {
  '1h'?: number;
  '3h'?: number;
};

export type weatherType = {
  /**
   * @ lon?: number
   * @ lat?: number
   */
  coord?: coordType;
  /**
   * id?: number
   * main?: string
   *description?: string
   * icon?: string
   */
  weather: Array<weatherArrayType> | Array<undefined>;
  base: string;
  /**
   *  @ temp?: number
   *  @ feels_like?: number
   *  @ pressure?: number
   *  @ humidity?: number
   *  @ temp_min?: number
   *  @ temp_max?: number
   *  @ sea_level?: number
   *  @ grnd_level?: number
   */
  main?: mainType;
  visibility?: number;
  /**
   * @ speed?: number
   * @ deg?: number
   * @ gust?: number
   */
  wind?: windType;
  /**
   * @ all?: number
   */
  clouds?: cloudsType;
  /**
   * @ '1h'?: number
   * @ '3h'?: number
   */
  rain?: hoursType;
  /**
   * @ '1h'?: number
   * @ '3h'?: number
   */
  snow?: hoursType;
  dt?: number;
  /**
   * @ type: number
   * @ id: number
   * @ message?: number
   * @ country?: string
   * @ sunrise?: number
   * @ sunset?: number
   */
  sys?: sysType;
  timezone?: number;
  id?: number;
  name?: string;
  cod: number;
};
