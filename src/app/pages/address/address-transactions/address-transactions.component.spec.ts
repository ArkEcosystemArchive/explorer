import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTransactionsComponent } from './address-transactions.component';

describe('AddressTransactionsComponent', () => {
  let component: AddressTransactionsComponent;
  let fixture: ComponentFixture<AddressTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
