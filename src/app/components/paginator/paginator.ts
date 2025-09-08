import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'c-paginator',
  standalone: true,
  imports: [MatTooltip],
  templateUrl: './paginator.html',
})
export class Paginator implements OnInit {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 1;
  @Input() quantity: number = 5;

  @Output() nextPage = new EventEmitter<number>();

  protected items: number[] = [];

  ngOnInit(): void {
    this.generate();
  }

  private generate(): void {
    const arr: number[] = [];
    const adjustedGroupNum = Math.min(this.quantity, this.totalPages);
    const halfGroup = Math.floor(adjustedGroupNum / 2);

    let start = Math.max(1, this.currentPage - halfGroup);
    let end = Math.min(this.totalPages, this.currentPage + halfGroup);

    if (end - start < adjustedGroupNum) {
      if (end < this.totalPages) {
        end++;
      } else {
        start--;
      }
    }

    for (let i = start; i <= end; i++) {
      if (i > 0) { arr.push(i); }
    }

    this.items = arr;
  }

  protected onNext(page: number) {
    if (page > 0 && page !== this.currentPage && page <= this.totalPages) {
      this.currentPage = page;
      this.nextPage.emit(page);
    }
  }
}
