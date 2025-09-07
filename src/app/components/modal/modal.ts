import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';

@Component({
  selector: 'c-modal',
  standalone: true,
  imports: [NgClass, ClickOutsideDirective],
  templateUrl: './modal.html',
})
export class Modal {
  @Input() showCloseBtn = true;
  @Input() closeOutside = false;
  @Input() addClass = '';

  @Output() closed = new EventEmitter<void>();

  protected alertBtn = false;

  protected closeQuick(): void {
    this.closeOutside ? this.closeModal() : (this.alertBtn = true);
  }

  protected closeModal(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.closeOutside) {
      this.closeModal();
    }
  }
}
