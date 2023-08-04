import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);

export const fadeOutAnimation = trigger('fadeOut', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms ease-out', style({ opacity: 0 })),
  ]),
]);
