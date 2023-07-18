import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowItemMenuDropdownComponent } from './row-item-menu-dropdown.component';

describe('RowItemMenuDropdownComponent', () => {
  let component: RowItemMenuDropdownComponent;
  let fixture: ComponentFixture<RowItemMenuDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowItemMenuDropdownComponent],
    });
    fixture = TestBed.createComponent(RowItemMenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
