import { inject, OnDestroy, Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Hero } from './hero/hero.component';
import { ControlConfig, ɵNullableFormControls } from '../shared/models/interfaces/ControlConfig';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, AbstractControl, FormArray, } from '@angular/forms';

@Injectable()
export abstract class FormBase
  extends Hero
  implements OnDestroy {
  protected form: FormGroup;
  private destroy$ = new Subject<void>();
  private readonly fb = inject(FormBuilder);

  constructor() {
    super();
    this.form = this.initForm({});
  }

  /**
   * Inicializa el formulario con controles y opciones.
   */
  protected initForm<T extends Record<string, any>>(
    controls: T,
    options?: AbstractControlOptions | null,
  ): FormGroup<ɵNullableFormControls<T>> {
    this.form = this.fb.group(controls, options);
    return this.form;
  }

  /**
   * Marca todos los campos (y subcampos) como tocados y devuelve si el formulario es inválido.
   */
  protected hasErrors(): boolean {
    this.markAllAsTouched(this.form);
    return this.form.invalid;
  }

  private markAllAsTouched(group: FormGroup | FormArray): void {
    Object.values(group.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control); // recursivo
      } else {
        control.markAsTouched();
      }
    });
  }

  /**
   * Obtiene los errores de un control específico.
   */
  protected getControlErrors(controlName: string): any {
    const control = this.form.get(controlName);
    return control?.errors && control?.touched ? control.errors : null;
  }

  /**
   * Verifica si un control específico tiene errores.
   */
  protected hasControlError(controlName: string, errorType?: string): boolean {
    const control = this.form.get(controlName);
    if (!control || !control.touched) return false;

    return errorType ? control.hasError(errorType) : control.invalid;
  }

  /**
   * Resetea el formulario a su estado inicial.
   */
  protected resetForm(value?: any): void {
    this.form.reset(value);
  }

  /**
   * Establece errores en un control específico.
   */
  protected setControlError(controlName: string, errors: any): void {
    const control = this.form.get(controlName);
    if (control) {
      control.setErrors(errors);
    }
  }

  /**
   * Suscribirse a cambios del formulario con cleanup automático.
   */
  protected subscribeToFormChanges(callback: (value: any) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  /**
   * Suscribirse a cambios de un control específico con cleanup automático.
   */
  protected subscribeToControlChanges(
    controlName: string,
    callback: (value: any) => void,
  ): void {
    const control = this.form.get(controlName);
    if (control) {
      control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(callback);
    }
  }

  /**
   * Acceso a los validadores de Angular.
   */
  protected get validators() {
    return Validators;
  }

  /**
   * Compone múltiples validadores en uno solo.
   */
  protected composeValidators(validators: any[]): any {
    return this.validators.compose(validators);
  }

  /**
   * Crea un control con validadores automáticamente compuestos.
   */
  protected createControl(
    value: any = '',
    validators?: any[],
  ): AbstractControl {
    return this.fb.control(
      value,
      validators ? this.composeValidators(validators) : null,
    );
  }

  /**
   * Crea múltiples controles con sus validadores.
   */
  protected createControls(controlsConfig: ControlConfig[]): {
    [key: string]: AbstractControl;
  } {
    const controls: { [key: string]: AbstractControl } = {};

    controlsConfig.forEach((config) => {
      controls[config.name] = this.createControl(
        config.value,
        config.validators,
      );
    });

    return controls;
  }

  /**
   * Inicializa formulario con configuración simplificada.
   */
  protected initFormWithConfig(
    controlsConfig: ControlConfig[],
    options?: AbstractControlOptions | null,
  ): FormGroup {
    const controls = this.createControls(controlsConfig);
    this.form = this.fb.group(controls, options);
    return this.form;
  }

  /**
   * Verifica si el formulario es válido.
   */
  protected get isFormValid(): boolean {
    return this.form.valid;
  }

  /**
   * Verifica si el formulario ha sido modificado.
   */
  protected get isFormDirty(): boolean {
    return this.form.dirty;
  }

  /**
   * Verifica si el formulario ha sido tocado.
   */
  protected get isFormTouched(): boolean {
    return this.form.touched;
  }

  /**
   * Cleanup automático de suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
