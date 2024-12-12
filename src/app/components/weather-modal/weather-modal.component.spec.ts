import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherModalComponent } from './weather-modal.component';
import { WeatherService } from '../../services/weather.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../truncate/truncate.pipe';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MockWeatherService } from '../../services/moc-weather.service';

describe('WeatherModalComponent', () => {
  let component: WeatherModalComponent;
  let fixture: ComponentFixture<WeatherModalComponent>;
  let mockWeatherService: MockWeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        HttpClientTestingModule,
        TruncatePipe,
        DatePipe,
        WeatherModalComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { city: { name: 'London', country: "UK" } } },
        { provide: WeatherService, useClass: MockWeatherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherModalComponent);
    component = fixture.componentInstance;
    mockWeatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data and update dataSource on init', () => {
    spyOn(mockWeatherService, 'getHourlyForecastWeather').and.callThrough();
    component.ngOnInit();

    expect(mockWeatherService.getHourlyForecastWeather).toHaveBeenCalled();

    const dataSourceValue = component.dataSource()
    expect(dataSourceValue.length).toBe(3);
  });
});
