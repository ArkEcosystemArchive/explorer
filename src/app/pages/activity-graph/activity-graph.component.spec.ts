import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGraphComponent } from './activity-graph.component';

describe('ActivityGraphComponent', () => {
  let component: ActivityGraphComponent;
  let fixture: ComponentFixture<ActivityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
