import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateMonitorComponent } from './delegate-monitor.component';

describe('DelegateMonitorComponent', () => {
  let component: DelegateMonitorComponent;
  let fixture: ComponentFixture<DelegateMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
