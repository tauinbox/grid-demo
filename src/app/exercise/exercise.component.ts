import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseDescriptionComponent } from './exercise-description/exercise-description.component';
import { EmptyStateComponent } from '../shared/empty-state/empty-state.component';
import { RowItemMenuDropdownComponent } from './row-item-menu-dropdown/row-item-menu-dropdown.component';
import { MapPipe } from '../shared/map.pipe';
import {
  GridComponent,
  TemplateContextTypeDirective,
} from '../shared/grid/grid.component';
import { ColDef, GridRow } from '../shared/grid/grid.types';
import { CustomerEvent, EventStatus, mockData, User } from './excercise.types';
import { fadeInAnimation } from '../shared/animations/fade.animation';

const getStatusToChange = (status: EventStatus) =>
  status === EventStatus.COMPLETE ? EventStatus.PENDING : EventStatus.COMPLETE;

@Component({
  selector: 'wkt-exercise',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseDescriptionComponent,
    GridComponent,
    EmptyStateComponent,
    RowItemMenuDropdownComponent,
    MapPipe,
    TemplateContextTypeDirective,
  ],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseComponent implements OnInit {
  @ViewChild('userCellTemplate', { static: true }) userTemplate:
    | TemplateRef<User>
    | undefined;
  @ViewChild('statusCellTemplate', { static: true }) statusTemplate:
    | TemplateRef<string>
    | undefined;

  data: CustomerEvent[] = mockData;
  colDefs: ColDef<CustomerEvent>[] = [];

  ngOnInit(): void {
    this.colDefs = [
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
      { field: 'user', headerName: 'User', cellTemplate: this.userTemplate },
      {
        field: 'status',
        headerName: 'Status',
        valueGetter: (data: EventStatus) =>
          data === EventStatus.PENDING ? 'Pending' : 'Complete',
        cellTemplate: this.statusTemplate,
      },
    ];
  }

  getStatusToChange(row: GridRow<CustomerEvent>): string {
    const currentStatus = row.cells.find((c) => c.key === 'status')?.value;
    return currentStatus === 'Complete' ? 'pending' : 'complete';
  }

  onToggleStatus(row: GridRow<CustomerEvent>) {
    this.data = this.data.map((item, index) => {
      if (index === row.dataRowIndex)
        return { ...item, status: getStatusToChange(item.status) };
      return item;
    });
  }

  onDeleteCustomer(row: GridRow<CustomerEvent>) {
    this.data = this.data.filter((item, index) => index !== row.dataRowIndex);
  }

  onAddData() {
    this.data = mockData;
  }
}
