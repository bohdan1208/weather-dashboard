import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseUrl: string = 'https://api.openweathermap.org';

  getCityUrl(city: string): string {
    return `${this.baseUrl}/geo/1.0/direct?q=${city}&limit=99&appid=${environment.weatherApiKey}`;
  }

  getCurrentWeatherUrl(lat: number, lon: number): string {
    return `${this.baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${environment.weatherApiKey}`;
  }

  getHourlyForecast(lat: number, lon: number): string {
    return `${this.baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${environment.weatherApiKey}`;
  }
}
