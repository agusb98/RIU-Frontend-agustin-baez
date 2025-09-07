import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private firstTime = true;
  private elementRef = inject(ElementRef);

  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>(); // EventEmitter para emitir eventos cuando se hace clic fuera del elemento

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInsideModal = this.elementRef.nativeElement.contains(
      event.target as Node,
    ); // Verifica si se hizo clic dentro del elemento
    const isInsideOverlay = !!(event.target as HTMLElement).closest(
      '.cdk-overlay-container',
    ); // Verifica si se hizo clic dentro del overlay

    if (!clickedInsideModal && !isInsideOverlay) {
      if (!this.firstTime) {
        this.clickOutside.emit();
      } else {
        this.firstTime = false;
      }
    }
  }
}
