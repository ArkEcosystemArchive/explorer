import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePriceChartComponent } from './toggle-price-chart.component';

describe('TogglePricechartComponent', () => {
  let component: TogglePriceChartComponent;
  let fixture: ComponentFixture<TogglePriceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglePriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglePriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
