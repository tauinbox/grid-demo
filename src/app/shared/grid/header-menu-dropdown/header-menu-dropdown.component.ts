import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColDef, VisibleColumns } from '../grid.types';

@Component({
  selector: 'wkt-header-menu-drop-down',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header-menu-dropdown.component.html',
  styleUrls: ['./header-menu-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuDropdownComponent<T> implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;
  fields: { field: string; headerName: string }[] = [];

  @Input({ required: true }) set colDefs(value: ColDef<T>[] | null) {
    if (!value) return;
    this.fields = value.map((v) => ({
      field: String(v.field),
      headerName: v.headerName,
    }));
    this.formGroup = this.fb.group(
      value.reduce((acc, val) => {
        acc[val.field] = !val.hide;
        return acc;
      }, {} as VisibleColumns<T>),
    );
  }
  @Output() changes = new EventEmitter<VisibleColumns<T>>();

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          const val = this.formGroup.getRawValue();
          const visibleColumns = Object.keys(val).filter((k) => val[k]);
          if (visibleColumns.length === 1) {
            this.formGroup
              .get(visibleColumns[0])
              ?.disable({ emitEvent: false });
          } else {
            for (const key in this.formGroup.controls) {
              const control = this.formGroup.controls[key];
              if (control.disabled) {
                control.enable({ emitEvent: false });
              }
            }
          }
          this.changes.emit(val);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
