import {
  ChangeDetectionStrategy,
  Component,
  Directive,
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
  RowItemMenu,
  VisibleColumns,
} from './grid.types';
import { DetectHoverDirective } from './detect-hover.directive';
import {
  fadeInAnimation,
  fadeOutAnimation,
} from '../animations/fade.animation';

@Directive({
  selector: 'ng-template[typedTemplate]',
  standalone: true,
})
export class TemplateContextTypeDirective<T> {
  @Input('typedTemplate') templateRef?: TemplateRef<T>;

  static ngTemplateContextGuard<T>(
    dir: TemplateContextTypeDirective<T>,
    ctx: unknown,
  ): ctx is { $implicit: T } {
    return true;
  }
}

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
    DetectHoverDirective,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [fadeInAnimation, fadeOutAnimation],
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

  @Input() rowItemMenu: TemplateRef<RowItemMenu<T>> | null = null;
  @Input() emptyState?: TemplateRef<void>;

  headers$ = this.activeColDefs$.pipe(
    map((colDefs) => colDefs.map((col) => col.headerName)),
  );
  gridRows$: Observable<GridRow<T>[] | null> = combineLatest([
    this.rowDataSubject$.pipe(
      map((rowData) =>
        rowData.map((row, index) => ({ row, dataRowIndex: index })),
      ),
    ),
    this.activeColDefs$,
  ]).pipe(
    map(([rowItems, colDefs]) =>
      !!rowItems.length && !!colDefs.length
        ? rowItems.map((rowItem) => ({
            cells: colDefs.map((col) => {
              let value: CellValue<T> | string = rowItem.row[col.field];

              if (col.valueGetter) value = col.valueGetter(value);
              if (col.valueFormatter) value = col.valueFormatter(value);

              const cell: GridCell<T> = {
                cellTemplate: col.cellTemplate,
                key: col.field,
                value,
              };

              return cell;
            }),
            dataRowIndex: rowItem.dataRowIndex,
          }))
        : null,
    ),
  );

  trackByRowFn(index: number, row: GridRow<T>) {
    return row.dataRowIndex;
  }

  trackByCellFn(index: number, cell: GridCell<T>) {
    return cell.key;
  }

  onColumnSelectionChanges(e: VisibleColumns<T>) {
    this.visibleColumnsSubject$.next(e);
  }
}
