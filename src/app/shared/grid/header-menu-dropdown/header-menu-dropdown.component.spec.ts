import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDropdownComponent } from './header-menu-dropdown.component';

describe('HeaderMenuDropDownComponent', () => {
  let component: HeaderMenuDropdownComponent;
  let fixture: ComponentFixture<HeaderMenuDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderMenuDropdownComponent],
    });
    fixture = TestBed.createComponent(HeaderMenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
