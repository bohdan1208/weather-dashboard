import {Component, Inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {City, CityWeatherDetailsItem} from '../../interfaces/weather.interface';
import {WeatherService} from '../../services/weather.service';
import {MatTableModule} from '@angular/material/table';
import {TruncatePipe} from '../truncate/truncate.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-weather-modal',
  imports: [MatDialogModule, MatButtonModule, MatTableModule, TruncatePipe, DatePipe],
  templateUrl: './weather-modal.component.html',
  styleUrl: './weather-modal.component.scss'
})
export class WeatherModalComponent implements OnInit {
  dataSource = signal<CityWeatherDetailsItem[]>([]);
  readonly displayedColumns: string[] = ['data', 'temperature', 'wind', 'clouds'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { city: City },
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.weatherService.getHourlyForecastWeather(this.data.city)
      .subscribe(hourlyForecast => this.dataSource.update(() => hourlyForecast.list));
  }
}
