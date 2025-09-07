import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBase } from '../../form-base.component';
import { MatInputModule } from '@angular/material/input';
import { HeroForm } from '../../../shared/models/interfaces/hero/HeroForm';
import { HeroCreate } from '../../../shared/models/interfaces/hero/HeroCreate';
import { HeroUpdate } from '../../../shared/models/interfaces/hero/HeroUpdate';
import { UpperCaseDirective } from '../../../shared/directives/upperCase.directive';

@Component({
  selector: 'hero-form',
  imports: [MatInputModule, ReactiveFormsModule, UpperCaseDirective],
  templateUrl: './form.html',
})
export class Form extends FormBase implements OnInit {
  @Input() model: HeroCreate | HeroUpdate = {};
  @Output() newModel = new EventEmitter<HeroCreate>();

  @Input() title: string = 'Datos súper héroe';

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm() {
    this.form = super.initForm({
      id: super.createControl(this.model.id, []),
      name: super.createControl(this.model.name, [
        this.validators.required,
        this.validators.minLength(2),
        this.validators.maxLength(30),
      ]),
      secretIdentity: super.createControl(this.model.secretIdentity, [
        this.validators.required,
        this.validators.minLength(2),
        this.validators.maxLength(30),
      ]),
      mainPower: super.createControl(this.model.mainPower, [
        this.validators.required,
        this.validators.minLength(2),
        this.validators.maxLength(30),
      ]),
    });
  }

  protected onSubmit() {
    if (super.hasErrors()) {
      return;
    }
    const rValue = this.form.getRawValue() as HeroForm;

    return this.newModel.emit(rValue);
  }
}
