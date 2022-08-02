import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    ownerName: new FormControl({ value: '', disabled: readState }, Validators.required),
    ownerPosition: new FormControl({ value: '', disabled: readState }, Validators.required),
    businessName: new FormControl({ value: '', disabled: readState }, Validators.required),
    businessAddress: new FormControl({ value: '', disabled: readState }, Validators.required),
    cellphoneNumber: new FormControl({ value: '', disabled: readState }, Validators.required),
    faxNumber: new FormControl({ value: '', disabled: readState }),
    exactLocation: new FormControl({ value: '', disabled: readState }),
    secDtiRegistrationNumber: new FormControl({ value: '', disabled: readState }),
    businessMayorPermitNumber: new FormControl({ value: '', disabled: readState }),
  });
};
