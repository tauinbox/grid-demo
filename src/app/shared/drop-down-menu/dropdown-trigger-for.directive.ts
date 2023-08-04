import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

export interface DropdownPanel {
  templateRef: TemplateRef<any>;
  readonly closed: EventEmitter<void>;
}

@Directive({
  selector: '[wktDropdownTriggerFor]',
  standalone: true,
  host: {
    '(click)': 'toggleDropdown()',
  },
  exportAs: 'wktDropdown',
})
export class DropdownTriggerForDirective implements OnDestroy {
  private isDropdownOpen = false;
  private overlayRef!: OverlayRef;
  private dropdownClosingActionsSub = Subscription.EMPTY;

  @Input('wktDropdownTriggerFor') public dropdownPanel!: DropdownPanel;

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);

  private closedSubject = new Subject<void>();
  closed$ = this.closedSubject.asObservable();

  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 8,
          },
        ]),
    });

    const templatePortal = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef,
    );
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(
      () => this.destroyDropdown(),
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const dropdownClosed = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) return;

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
    this.closedSubject.next();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) this.overlayRef.dispose();
    this.closedSubject.complete();
  }
}
