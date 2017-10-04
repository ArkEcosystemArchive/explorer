import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDropdownComponent } from './tools-dropdown.component';

describe('ToolsDropdownComponent', () => {
  let component: ToolsDropdownComponent;
  let fixture: ComponentFixture<ToolsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
