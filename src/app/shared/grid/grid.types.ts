import { TemplateRef } from '@angular/core';

export type CellValue<T> = T[ColDef<T>['field']];
export type ColDef<T> = {
  field: keyof T;
  headerName: string;
  valueGetter?(data: CellValue<T>): string;
  valueFormatter?(data: CellValue<T> | string): string;
  cellTemplate?: TemplateRef<CellValue<T>>;
  hide?: boolean;
  isID?: boolean;
};
export type VisibleColumns<T> = Record<keyof T, boolean>;
export type GridCell<T> = {
  rowId?: string;
  rowIndex: number;
  cellTemplate?: TemplateRef<CellValue<T>>;
  key: keyof T;
  value: CellValue<T> | string;
};
export type GridRow<T> = GridCell<T>[];