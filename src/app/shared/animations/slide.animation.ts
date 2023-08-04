import { animate, style, transition, trigger } from '@angular/animations';

export const slideInOutHorizontalAnimation = trigger('slideInOutHorizontal', [
  transition(
    ':enter',
    [
      style({
        opacity: 0,
        width: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }),
      animate('{{ inDuration }}ms', style({ width: '*' })),
      animate('{{ inDuration }}ms', style({ opacity: 1 })),
    ],
    { params: { inDuration: 300 } },
  ),
  transition(
    ':leave',
    [
      style({ opacity: 1, width: '*' }),
      animate(
        '{{ outDuration }}ms',
        style({
          opacity: 0,
          width: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }),
      ),
    ],
    { params: { outDuration: 300 } },
  ),
]);

export const slideInOutVerticalAnimation = trigger('slideInOutVertical', [
  transition(
    ':enter',
    [
      style({ opacity: 0, height: '0', overflow: 'hidden' }),
      animate('{{ inDuration }}ms', style({ height: '*' })),
      animate('{{ inDuration }}ms', style({ opacity: 1 })),
    ],
    { params: { inDuration: 300 } },
  ),
  transition(
    ':leave',
    [
      style({ opacity: 1, height: '*' }),
      animate(
        '{{ outDuration }}ms',
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
      ),
    ],
    { params: { outDuration: 300 } },
  ),
]);
