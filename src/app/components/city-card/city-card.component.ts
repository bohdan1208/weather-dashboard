import {Component, EventEmitter, inject, Input, OnChanges, Output, signal} from '@angular/core';
import {City, CityWeather} from '../../interfaces/weather.interface';
import {WeatherService} from '../../services/weather.service';
import {TruncatePipe} from '../truncate/truncate.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {WeatherModalComponent} from '../weather-modal/weather-modal.component';

@Component({
  selector: 'app-city-card',
  imports: [TruncatePipe, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.scss'
})
export class CityCardComponent implements OnChanges {
  @Input() city: City | null = null;
  @Output() removeCity = new EventEmitter<void>();

  weather = signal<CityWeather | null>(null);
  readonly dialog = inject(MatDialog);

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(): void {
    this.getCityWeather();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WeatherModalComponent, {
      data: {city: this.city},
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private getCityWeather(): void {
    if (!this.city) return;

    this.weatherService.getCityWeather(this.city)
      .subscribe(weather => this.weather.update(() => weather));
  }
}
