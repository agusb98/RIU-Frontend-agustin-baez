import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '../hero.component';
import { Modal } from '../../modal/modal';
import { HeroDetail } from '../../../shared/models/interfaces/hero/HeroDetail';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'hero-delete-modal',
  imports: [Modal, JsonPipe],
  templateUrl: './delete-modal.html',
})
export class DeleteModal extends Hero {
  @Input({ required: true }) model!: HeroDetail;
  @Output() modelDeleted = new EventEmitter<HeroDetail | null>();

  protected onDelete() {
    this.heroSrv.remove(this.model).subscribe(
      (res) => {
        this.configSrv.notification(res.message);
        this.onClose();
      },
      (err) => {
        this.configSrv.notification(err.message);
      }
    );
  }

  protected onClose(): void {
    this.modelDeleted.emit(null);
  }
}
