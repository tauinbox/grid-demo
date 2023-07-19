import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowItemMenuDropdownComponent } from './row-item-menu-dropdown.component';
import { Component } from '@angular/core';

@Component({
  template: `<wkt-row-item-menu-dropdown></wkt-row-item-menu-dropdown>`,
})
class TestHostComponent {}

describe('RowItemMenuDropdownComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowItemMenuDropdownComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
