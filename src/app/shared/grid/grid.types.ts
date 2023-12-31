import { EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type CellValue<T> = T[ColDef<T>['field']];
export type ColDef<T> = {
  field: keyof T;
  headerName: string;
  valueGetter?(data: CellValue<T>): string;
  valueFormatter?(data: CellValue<T> | string): string;
  cellTemplate?: TemplateRef<CellValue<T>>;
  hide?: boolean;
};
export type VisibleColumns<T> = Record<keyof T, boolean>;
export type GridCell<T> = {
  cellTemplate?: TemplateRef<CellValue<T>>;
  key: keyof T;
  value: CellValue<T> | string;
};
export type GridRow<T> = { dataRowIndex: number; cells: GridCell<T>[] };
export type RowItemMenu<T> = {
  $implicit: GridRow<T>;
  closeEmitter: EventEmitter<void>;
  closed$: Observable<void>;
};
