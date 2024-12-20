import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
import {City, CityWeather, CityWeatherDetails} from '../interfaces/weather.interface';

@Injectable({providedIn: 'root'})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  getCities(city: string): Observable<City[]> {
    const url = this.configService.getCityUrl(city);

    return this.http.get<City[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }

  getCityWeather({lat, lon}: City): Observable<CityWeather> {
    const url = this.configService.getCurrentWeatherUrl(lat, lon);

    return this.http.get<CityWeather>(url).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }

  getHourlyForecastWeather({lat, lon}: City): Observable<CityWeatherDetails> {
    const url = this.configService.getHourlyForecast(lat, lon);

    return this.http.get<CityWeatherDetails>(url).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }
}
