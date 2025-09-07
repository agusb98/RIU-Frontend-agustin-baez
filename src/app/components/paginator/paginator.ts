import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'c-paginator',
  templateUrl: './paginator.html',
})
export class Paginator implements AfterViewInit, OnChanges {
  @Input() currentPageIndex = 0;
  @Input() pageSize: number = 1;
  @Input() total_pages!: number;

  @Output() changeCurrentIndex = new EventEmitter<number>();

  // Cambiar a itemWidth dinámico
  private itemWidth: number = 0;
  private gap: number = 0;

  //TODO:: luego preocupate de la logica del arrastre.

  // Bandera para prevenir clicks después de arrastre
  hasDragged = false;

  startX = 0;
  isDragging = false;
  prevTranslate = 0;
  currentTranslate = 0;
  animationID: any;
  minTranslate = 0;
  maxTranslate = 0;
  dragThreshold = 30; // Mínimo desplazamiento para considerar un arrastre válido

  @ViewChild('paginationContainer', { static: false })
  paginationContainer!: ElementRef;

  ngAfterViewInit() {
    this.calculateSizes();
    this.updatePosition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total_pages'] || changes['currentPageIndex']) {
      setTimeout(() => {
        this.calculateSizes();
        this.updatePosition();
      });
    }
  }

  get pages(): number[] {
    return this.total_pages
      ? Array.from({ length: this.total_pages }, (_, i) => i + 1)
      : [];
  }

  calculateSizes(): void {
    if (this.paginationContainer?.nativeElement) {
      const container = this.paginationContainer.nativeElement;
      const firstItem = container.querySelector('.btn');

      if (firstItem) {
        const containerStyle = window.getComputedStyle(container);
        this.gap = parseFloat(containerStyle.gap) || 0;
        this.itemWidth = firstItem.clientWidth + this.gap;
      }
    }
  }

  updatePosition(): void {
    const targetPosition = -this.currentPageIndex * this.itemWidth;
    this.currentTranslate = targetPosition;
    this.prevTranslate = targetPosition;
  }

  // Resto de métodos con mejoras...

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const clientX = this.getClientX(event);
    this.startX = clientX;
  }

  doDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const clientX = this.getClientX(event);
    const diff = clientX - this.startX;
    this.currentTranslate = this.prevTranslate + diff;
  }

  endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.prevTranslate = this.currentTranslate;
  }

  // Método auxiliar
  private getClientX(event: MouseEvent | TouchEvent): number {
    return (
      (event as TouchEvent).touches?.[0]?.clientX ??
      (event as MouseEvent).clientX
    );
  }

  protected setCurrentPage(index: number): void {
    // Prevenir cambio si fue arrastre
    if (this.hasDragged) return;

    this.currentPageIndex = index;
    this.changeCurrentIndex.emit(index);
    this.animateToPosition(-index * this.itemWidth);
  }

  private animateToPosition(targetPosition: number) {
    // ...código anterior...
    // Asegurar posición final exacta
    this.prevTranslate = targetPosition;
  }
}
