import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'exercise' },
  {
    path: 'exercise',
    loadComponent: () =>
      import('./exercise/exercise.component').then((c) => c.ExerciseComponent),
  },
];
