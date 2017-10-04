import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAccountsComponent } from './top-accounts.component';

describe('TopAccountsComponent', () => {
  let component: TopAccountsComponent;
  let fixture: ComponentFixture<TopAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
