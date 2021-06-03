import { Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
import { Directive, Input } from '@angular/core';
@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,  /// opaque token angular
    useExisting: SelectRequireValidatorDirective,
    multi: true
  }]
})
export class SelectRequireValidatorDirective implements Validator {
  @Input() appSelectValidator: string;  /////   @Input('appSelectValidator) defaultSelected: string;  alias name can be used
  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value === this.appSelectValidator ? {defaultSelected: true} : null;
  }
}
