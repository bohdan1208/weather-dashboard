import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {MockWeatherService} from "./services/moc-weather.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CityCardComponent} from "./components/city-card/city-card.component";
import {WeatherService} from "./services/weather.service";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockWeatherService: MockWeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CityCardComponent,
        AppComponent,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: WeatherService, useClass: MockWeatherService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockWeatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cities and selectedCities', () => {
    expect(component.cities()).toEqual([]);
    expect(component.selectedCities()).toEqual([]);
  });
});
