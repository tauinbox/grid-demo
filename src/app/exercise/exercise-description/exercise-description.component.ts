import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wkt-exercise-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-description.component.html',
  styleUrls: ['./exercise-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDescriptionComponent {}
