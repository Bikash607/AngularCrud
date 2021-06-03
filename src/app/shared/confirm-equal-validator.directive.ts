import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,  /// opaque token angular
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { notEqual: true };
    }

    return null;
  }
}

/* equal validation can  directly be add to form group for that need modification in validation contron and there is not need to call
explicitely (i.e :  (input)="confirmPassword.control.updateValueAndValidity())

  validate(passwordGroup: AbstractControl): {[key: string]: any} | null {
    const passwordControl = control.get('password');
    cont confirmPasswordControl = control.get('confirmPassword');
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      return { notEqual: true };
    }
    return null;
  }

*/
