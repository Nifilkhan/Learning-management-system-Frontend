import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function passwordValidator():ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null => {
    const password= control.value;
     if(!password) {
      return null;
     }

     const errors:ValidationErrors = {};
     if (!/[A-Z]/.test(password)) {
      errors['missingUppercase'] = 'Password must contain at least one uppercase letter.';
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      errors['missingLowercase'] = 'Password must contain at least one lowercase letter.';
    }

    // Check for a number
    if (!/[0-9]/.test(password)) {
      errors['missingNumber'] = 'Password must contain at least one number.';
    }
    return Object.keys(errors).length ? errors : null;
  }
}
