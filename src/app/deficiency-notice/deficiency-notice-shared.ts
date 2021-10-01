import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    date: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    docketNumber: new FormControl({ value: '', disabled: false }),
    violationInfo: new FormGroup({
      operationWithoutRSL: new FormControl({ value: false, disabled: readState }),
      operationWithoutLRO: new FormControl({ value: false, disabled: readState }),
      operationUnauthorizedFrequency: new FormControl({ value: false, disabled: readState }),
      possessionTransmitterWithoutPP: new FormControl({ value: false, disabled: readState }),
      noNTCPertinentPapers: new FormControl({ value: false, disabled: readState }),
    }),
    transmitters: new FormArray([]),
    dateOfDeficiencyHearing: new FormControl({ value: '', disabled: false }),
    isDone: new FormControl({ value: false, disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
  });
};

export const transmitterInput = (): FormGroup => {
  return new FormGroup({
    transmitter: new FormControl({ value: '', disabled: false }),
    serialNumber: new FormControl({ value: 0, disabled: false }),
  });
};
