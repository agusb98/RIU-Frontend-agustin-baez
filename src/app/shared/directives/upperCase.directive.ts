import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[upperCase]',
  standalone: true,
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.value = input.value.toUpperCase();

    // Restore cursor position
    input.setSelectionRange(start, end);
  }
}
