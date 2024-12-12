export interface City {
  id?: number;
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
}

export interface CityWeather {
  id: number;
  name: string;
  clouds: {all: number};
  main: {
    temp: number;
    feels_like: number;
  }
  wind: {speed: number};
  visibility: number;
}

export interface CityWeatherDetails {
  city: {
    id: number;
    name: string;
  },
  list: CityWeatherDetailsItem[];
}

export interface CityWeatherDetailsItem {
  clouds: {all: number};
  dt_text: string;
  main: {
    temp: number;
    feels_like: number;
  },
  wind: {speed: number};
}
