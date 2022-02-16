import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    ownerName: new FormControl({ value: '', disabled: false }, Validators.required),
    ownerPosition: new FormControl({ value: '', disabled: false }, Validators.required),
    businessName: new FormControl({ value: '', disabled: false }, Validators.required),
    businessAddress: new FormControl({ value: '', disabled: false }, Validators.required),
    cellphoneNumber: new FormControl({ value: '', disabled: false }, Validators.required),
    faxNumber: new FormControl({ value: '', disabled: false }),
    exactLocation: new FormControl({ value: '', disabled: false }),
    secDtiRegistrationNumber: new FormControl({ value: '', disabled: readState }),
    businessMayorPermitNumber: new FormControl({ value: '', disabled: readState }),
  });
};
