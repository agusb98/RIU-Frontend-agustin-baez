import { ɵElement, AbstractControl, ValidatorFn, ValidationErrors, } from '@angular/forms';

export { AbstractControl };
export type { ValidatorFn, ValidationErrors };
export type ɵNullableFormControls<T> = { [K in keyof T]: ɵElement<T[K], null>; };

export interface ControlConfig {
  name: string;
  value?: any;
  validators?: any[];
}
