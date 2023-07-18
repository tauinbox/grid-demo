import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridRow } from '../../shared/grid/grid.types';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomerEvent } from '../excercise.types';

@Component({
  selector: 'wkt-row-item-menu-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './row-item-menu-dropdown.component.html',
  styleUrls: ['./row-item-menu-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowItemMenuDropdownComponent implements OnInit {
  @Input({ required: true }) row!: GridRow<CustomerEvent>;
  @Input() statusToChange!: string;
  @Input({ required: true }) closed$!: Observable<void>;
  @Output() closed = new EventEmitter<void>();
  @Output() toggleStatus = new EventEmitter<GridRow<CustomerEvent>>();
  @Output() deleteCustomer = new EventEmitter<GridRow<CustomerEvent>>();

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  confirmDeletion = false;

  onDeleteCustomer() {
    this.deleteCustomer.emit(this.row);
    this.closed.emit();
  }

  ngOnInit(): void {
    this.closed$
      .pipe(
        tap(() => {
          this.confirmDeletion = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
