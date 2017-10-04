import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBackgroundComponent } from './toggle-background.component';

describe('ToggleBackgroundComponent', () => {
  let component: ToggleBackgroundComponent;
  let fixture: ComponentFixture<ToggleBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
