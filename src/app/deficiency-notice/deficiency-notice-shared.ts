import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ViolationsType } from './models/violations.model';

export const initForm = (readState = false): FormGroup => {
  return new FormGroup({
    date: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    docketNumber: new FormControl({ value: '', disabled: false }),
    respondentName: new FormControl({ value: '', disabled: false }),
    dateOfInspection: new FormControl({ value: '', disabled: false }),
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
