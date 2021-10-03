import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    ownerName: new FormControl({ value: '', disabled: false }),
    ownerPosition: new FormControl({ value: '', disabled: false }),
    businessName: new FormControl({ value: '', disabled: false }),
    businessAddress: new FormControl({ value: '', disabled: false }),
    cellphoneNumber: new FormControl({ value: '', disabled: false }),
    faxNumber: new FormControl({ value: '', disabled: false }),
    exactLocation: new FormControl({ value: '', disabled: false }),
    secDtiRegistrationNumber: new FormControl({ value: '', disabled: readState }),
    businessMayorPermitNumber: new FormControl({ value: '', disabled: readState }),
  });
};
