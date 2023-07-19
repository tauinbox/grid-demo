import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderMenuDropdownComponent } from './header-menu-dropdown.component';
import { Component } from '@angular/core';
import { HeaderMenuDropdownHarness } from './testing/header-menu-dropdown.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

@Component({
  template: `<wkt-header-menu-drop-down
    [colDefs]="colDefs"
    (changes)="onColumnSelectionChanges()"
  ></wkt-header-menu-drop-down>`,
})
class TestHostComponent {
  colDefs = [];
  onColumnSelectionChanges = () => {};
}

describe('HeaderMenuDropDownComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let harness: HeaderMenuDropdownHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderMenuDropdownComponent],
      declarations: [TestHostComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    harness = await TestbedHarnessEnvironment.loader(fixture).getHarness(
      HeaderMenuDropdownHarness,
    );
  });

  it('should create', () => {
    expect(harness.host).toBeTruthy();
  });
});
