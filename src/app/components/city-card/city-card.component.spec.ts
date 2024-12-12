import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CityCardComponent} from "./city-card.component";
import {MockWeatherService} from "../../services/moc-weather.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TruncatePipe} from "../truncate/truncate.pipe";
import {WeatherService} from "../../services/weather.service";
import {City} from "../../interfaces/weather.interface";

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;
  let mockWeatherService: MockWeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CityCardComponent,
        TruncatePipe,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: WeatherService, useClass: MockWeatherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    mockWeatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCityWeather when city input changes', () => {
    spyOn(component, 'getCityWeather');
    component.ngOnChanges();
    expect(component.getCityWeather).toHaveBeenCalled();
  });

  it('should update weather signal after fetching city weather', () => {
    const city: City = { name: 'City', id: 1, lat: 23, lon: 45, country: 'Country' };
    component.city = city;

    component.ngOnChanges();
    fixture.detectChanges();

    const weather = component.weather();
    expect(weather?.name).toBe('City');
    expect(weather?.main.temp).toBe(5);
  });
});
