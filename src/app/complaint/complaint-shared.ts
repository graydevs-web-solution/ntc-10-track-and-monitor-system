import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ViolationsType } from '../deficiency-notice/models/violations.model';

export const initForm = (readState = false): FormGroup => {
  return new FormGroup({
    date: new FormControl({ value: '', disabled: false }),
    complainantName: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    clientName: new FormControl({ value: '', disabled: false }),
    respondentName: new FormControl({ value: '', disabled: false }),
    docketNumber: new FormControl({ value: '', disabled: false }),
    dateOfInspection: new FormControl({ value: '', disabled: false }),
    location: new FormControl({ value: '', disabled: false }),
    reason: new FormControl({ value: '', disabled: false }),
    transmitters: new FormArray([]),
    violationInfo: new FormGroup({
      operationWithoutRSL: new FormControl({ value: false, disabled: readState }),
      operationWithoutLRO: new FormControl({ value: false, disabled: readState }),
      operationUnauthorizedFrequency: new FormControl({ value: false, disabled: readState }),
      possessionTransmitterWithoutPP: new FormControl({ value: false, disabled: readState }),
      noNTCPertinentPapers: new FormControl({ value: false, disabled: readState }),
    }),
    dateOfHearing: new FormControl({ value: '', disabled: false }),
    timeOfHearing: new FormControl({ value: { hour: 8, minute: 0 }, disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
    isDone: new FormControl({ value: false, disabled: false }),
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
