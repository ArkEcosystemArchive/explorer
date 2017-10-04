import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceFooterComponent } from './balance-footer.component';

describe('BalanceFooterComponent', () => {
  let component: BalanceFooterComponent;
  let fixture: ComponentFixture<BalanceFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
