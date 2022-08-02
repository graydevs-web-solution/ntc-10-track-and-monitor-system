import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ViolationsType } from './models/violations.model';

export const initForm = (readState = false): FormGroup => {
  return new FormGroup({
    date: new FormControl({ value: '', disabled: false }, Validators.required),
    clientId: new FormControl({ value: '', disabled: false }, Validators.required),
    docketNumberDescription: new FormControl({ value: '', disabled: false }, Validators.required),
    docketNumberStart: new FormControl({ value: '', disabled: false }, Validators.required),
    docketNumberEnd: new FormControl({ value: '', disabled: false }, Validators.required),
    respondentName: new FormControl({ value: '', disabled: false }, Validators.required),
    dateOfInspection: new FormControl({ value: '', disabled: false }, Validators.required),
    violationInfo: new FormGroup({
      operationWithoutRSL: new FormControl({ value: false, disabled: readState }),
      operationWithoutLRO: new FormControl({ value: false, disabled: readState }),
      operationUnauthorizedFrequency: new FormControl({ value: false, disabled: readState }),
      possessionTransmitterWithoutPP: new FormControl({ value: false, disabled: readState }),
      noNTCPertinentPapers: new FormControl({ value: false, disabled: readState }),
    }),
    transmitters: new FormArray([]),
    dateOfDeficiencyHearing: new FormControl({ value: '', disabled: false }, Validators.required),
    isDone: new FormControl({ value: false, disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: readState }, Validators.required),
    regionalDirectorApproved: new FormControl({ value: '', disabled: readState }),
  });
};

export const transmitterInput = (): FormGroup => {
  return new FormGroup({
    transmitter: new FormControl({ value: '', disabled: false }),
    serialNumber: new FormControl({ value: '', disabled: false }),
  });
};

export const violations: ViolationsType[] = [
  { name: 'Operation without Radio Station license/temporary permit.', formControlName: 'operationWithoutRSL' },
  { name: 'Operation without licensed radio operator.', formControlName: 'operationWithoutLRO' },
  { name: 'Operating on unauthorized frequency.', formControlName: 'operationUnauthorizedFrequency' },
  {
    name: 'Possession of transmitter/transceiver without permit to purchased/possess.',
    formControlName: 'possessionTransmitterWithoutPP',
  },
  {
    name: 'No NTC pertinent papers presented at the time of inspection of the units/s mentioned.',
    formControlName: 'noNTCPertinentPapers',
  },
];
