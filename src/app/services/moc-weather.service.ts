import {Observable, of} from "rxjs";
import {City, CityWeather, CityWeatherDetails} from "../interfaces/weather.interface";

export class MockWeatherService {
  getHourlyForecastWeather(city: City): Observable<CityWeatherDetails> {
    return of({
      city: {
        id: 1,
        name: 'City'
      },
      list: [
        {clouds: {all: 100}, dt_text: '01.01.2024 00:00:00', main: {temp: 5, feels_like: 6}, wind: {speed: 2.2}},
        {clouds: {all: 100}, dt_text: '01.01.2024 00:00:00', main: {temp: 5, feels_like: 6}, wind: {speed: 2.2}},
        {clouds: {all: 100}, dt_text: '01.01.2024 00:00:00', main: {temp: 5, feels_like: 6}, wind: {speed: 2.2}},
      ]
    });
  }

  getCityWeather({lat, lon}: City): Observable<CityWeather> {
    return of({
      id: 1,
      name: 'City',
      clouds: {all: 100},
      main: {
        temp: 5,
        feels_like: 6,
      },
      wind: {speed: 43},
      visibility: 456
    })
  }
}
