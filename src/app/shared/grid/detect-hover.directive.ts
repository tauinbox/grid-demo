import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[wktDetectHover]',
  standalone: true,
})
export class DetectHoverDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseover')
  onMouseover() {
    this.elementRef.nativeElement.classList.add('hovered');
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.elementRef.nativeElement.classList.remove('hovered');
  }
}
