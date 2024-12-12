import {Component, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {WeatherService} from './services/weather.service';
import {City} from './interfaces/weather.interface';
import {CityCardComponent} from './components/city-card/city-card.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CityCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myControl = new FormControl<string | City | null>('');
  cities = signal<City[]>([]);
  selectedCities = signal<City[]>([]);
  readonly storageKey: string = 'saved-cities';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getSaveCities();

    this.myControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(value => {
          if (typeof(value) === 'string') {
            this.getCities();
          } else {
            this.selectCity(value as City);
          }
      });
  }

  selectCity(city: City | null) {
    if (!city) return;

    this.myControl.setValue(null);
    this.selectedCities.update((cities: City[]) => [...cities, {...city, id: city.lat + city.lon}]);
    this.cities.update(() => []);
    this.updateLocaleStorage();
  }

  removeCity(cityId: number | undefined) {
    if (!cityId) return;

    this.selectedCities.update((cities: City[]) => cities.filter(item => item.id !== cityId));
    this.updateLocaleStorage();
  }

  getCities(): void {
    if (!this.myControl.value) {
      this.cities.update(() => []);

      return;
    };

    this.weatherService.getCities(this.myControl.value as string)
      .subscribe((data) => this.cities.update(() => data))
  }

  private getSaveCities(): void {
    const savedCities = localStorage.getItem(this.storageKey);

    if (!savedCities) return;

    this.selectedCities.update(() => JSON.parse(savedCities));
  }

  private updateLocaleStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.selectedCities()));
  }
}
