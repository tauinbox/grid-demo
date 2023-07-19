import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { Component } from '@angular/core';
import {
  CustomerEvent,
  EventStatus,
  mockData,
  User,
} from '../../exercise/excercise.types';
import { ColDef } from './grid.types';
import { GridComponentHarness } from './testing/grid.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

@Component({
  template: `<wkt-grid [rowData]="data" [colDefs]="colDefs"></wkt-grid>`,
  styles: [
    `
      :host {
        width: 640px;
        height: 480px;
      }
    `,
  ],
})
class TestHostComponent {
  data: CustomerEvent[] = mockData;
  colDefs: ColDef<CustomerEvent>[] = [
    {
      field: 'id',
      headerName: 'ID',
      isID: true,
      hide: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      valueFormatter: (data: number) => {
        const localDateString = new Date(data).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        return `${localDateString.slice(0, -3)}${localDateString
          .slice(-3)
          .trim()
          .toLowerCase()}`;
      },
    },
    { field: 'name', headerName: 'Name' },
    { field: 'folder', headerName: 'Folder' },
    {
      field: 'user',
      headerName: 'User',
      valueGetter: (data: User) => `${data.firstName} ${data.lastName}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: (data: EventStatus) =>
        data === EventStatus.PENDING ? 'Pending' : 'Complete',
    },
  ];
}

describe('GridComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let harness: GridComponentHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GridComponent],
      declarations: [TestHostComponent],
      providers: [],
      teardown: { destroyAfterEach: false },
    });
    fixture = TestBed.createComponent(TestHostComponent);
    harness = await TestbedHarnessEnvironment.loader(fixture).getHarness(
      GridComponentHarness,
    );
  });

  it('should render a grid', async () => {
    expect(await harness.grid()).toBeTruthy();
  });

  it('should render the correct number of rows', async () => {
    expect(await harness.rowsCount()).toEqual(4);
  });

  it('should render headers', async () => {
    expect(await harness.headersCount()).toEqual(5);
    expect(await harness.headers()).toEqual([
      'Date',
      'Name',
      'Folder',
      'User',
      'Status',
    ]);
  });

  it('should not render ID column by default', async () => {
    expect(await harness.headers()).not.toContain('ID');

    await harness.openHeaderContextMenu();
    const contextMenu = await harness.headerContextMenu();
    expect(contextMenu).toBeTruthy();

    const idField = await contextMenu?.getFieldLabelByText('ID');
    await idField?.click();
    await fixture.detectChanges();

    expect(await harness.headers()).toContain('ID');
    await harness.grid().then((g) => g.click());
  });

  it('should allow column selection', async () => {
    expect(await harness.headers()).toEqual([
      'Date',
      'Name',
      'Folder',
      'User',
      'Status',
    ]);

    await harness.openHeaderContextMenu();
    const contextMenu = await harness.headerContextMenu();
    expect(contextMenu).toBeTruthy();

    let field = await contextMenu?.getFieldLabelByText('Name');
    await field?.click();
    field = await contextMenu?.getFieldLabelByText('User');
    await field?.click();
    await fixture.detectChanges();

    expect(await harness.headers()).toEqual(['Date', 'Folder', 'Status']);
  });
});
