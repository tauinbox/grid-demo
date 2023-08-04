import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true,
})
export class MapPipe implements PipeTransform {
  transform<R, V, A extends any[]>(
    value: V,
    fn: (value: V, ...args: A) => R,
    ...args: A
  ): R {
    return fn(value, ...args);
  }
}
