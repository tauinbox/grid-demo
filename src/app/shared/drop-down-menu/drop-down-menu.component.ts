import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPanel } from './dropdown-trigger-for.directive';

@Component({
  selector: 'wkt-drop-down-menu',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownMenuComponent implements DropdownPanel {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<void>;
  @Output() closed = new EventEmitter<void>();
}
