import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { HeaderMenuDropdownComponent } from './header-menu-dropdown/header-menu-dropdown.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { DropdownTriggerForDirective } from '../drop-down-menu/dropdown-trigger-for.directive';
import { RowItemMenuDropdownComponent } from '../../exercise/row-item-menu-dropdown/row-item-menu-dropdown.component';
import {
  CellValue,
  ColDef,
  GridCell,
  GridRow,
  VisibleColumns,
} from './grid.types';

@Component({
  selector: 'wkt-grid',
  standalone: true,
  imports: [
    CommonModule,
    EmptyStateComponent,
    DropDownMenuComponent,
    DropdownTriggerForDirective,
    HeaderMenuDropdownComponent,
    RowItemMenuDropdownComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T> {
  private rowDataSubject$ = new BehaviorSubject<T[]>([]);
  private colDefsSubject$ = new BehaviorSubject<ColDef<T>[]>([]);
  private visibleColumnsSubject$ =
    new BehaviorSubject<VisibleColumns<T> | null>(null);
  private activeColDefs$ = combineLatest([
    this.colDefsSubject$,
    this.visibleColumnsSubject$,
  ]).pipe(
    map(([colDefs, visibleColumns]) =>
      !visibleColumns
        ? colDefs.filter((col) => !col.hide)
        : colDefs.filter((col) => visibleColumns[col.field]),
    ),
  );
  colDefs$ = this.colDefsSubject$.asObservable();

  @Input({ required: true }) set rowData(value: T[]) {
    this.rowDataSubject$.next(value);
  }
  @Input({ required: true }) set colDefs(value: ColDef<T>[]) {
    this.colDefsSubject$.next(value);
  }
  @Input() rowItemMenu: TemplateRef<any> | null = null;
  @Input() emptyState?: TemplateRef<any>;

  headers$ = this.activeColDefs$.pipe(
    map((colDefs) => colDefs.map((col) => col.headerName)),
  );
  gridRows$: Observable<GridRow<T>[] | null> = combineLatest([
    this.rowDataSubject$,
    this.activeColDefs$,
  ]).pipe(
    map(([rowData, colDefs]) =>
      !!rowData.length && !!colDefs.length
        ? rowData.map((row, rowIndex) =>
            colDefs.map((col) => {
              let id: string | undefined;
              let value: CellValue<T> | string = row[col.field];

              if (col.valueGetter) value = col.valueGetter(value);
              if (col.valueFormatter) value = col.valueFormatter(value);
              if (col.isID) id = String(row[col.field]);

              const cell: GridCell<T> = {
                rowIndex,
                cellTemplate: col.cellTemplate,
                key: col.field,
                value,
              };

              if (id) cell.rowId = id;

              return cell;
            }),
          )
        : null,
    ),
  );

  trackByRowFn(index: number, row: GridRow<T>) {
    return row[0].rowId ?? String(row[0].rowIndex);
  }

  trackByCellFn(index: number, cell: GridCell<T>) {
    return cell.key;
  }

  onColumnSelectionChanges(e: VisibleColumns<T>) {
    this.visibleColumnsSubject$.next(e);
  }
}
