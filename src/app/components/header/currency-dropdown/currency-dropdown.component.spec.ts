import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDropdownComponent } from './currency-dropdown.component';

describe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
