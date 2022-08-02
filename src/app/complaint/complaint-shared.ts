import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ViolationsType } from '../deficiency-notice/models/violations.model';

export const initForm = (readState = false): FormGroup => {
  return new FormGroup({
    date: new FormControl({ value: '', disabled: false }, Validators.required),
    complainantName: new FormControl({ value: '', disabled: false }, Validators.required),
    clientId: new FormControl({ value: '', disabled: false }, Validators.required),
    clientName: new FormControl({ value: '', disabled: false }, Validators.required),
    respondentName: new FormControl({ value: '', disabled: false }, Validators.required),
    docketNumberDescription: new FormControl({ value: '', disabled: false }, Validators.required),
    docketNumberStart: new FormControl({ value: '', disabled: false }),
    docketNumberEnd: new FormControl({ value: '', disabled: false }),
    dateOfInspection: new FormControl({ value: '', disabled: false }, Validators.required),
    location: new FormControl({ value: '', disabled: false }, Validators.required),
    reason: new FormControl({ value: '', disabled: false }, Validators.required),
    transmitters: new FormArray([]),
    violationInfo: new FormGroup({
      operationWithoutRSL: new FormControl({ value: false, disabled: readState }),
      operationWithoutLRO: new FormControl({ value: false, disabled: readState }),
      operationUnauthorizedFrequency: new FormControl({ value: false, disabled: readState }),
      possessionTransmitterWithoutPP: new FormControl({ value: false, disabled: readState }),
      noNTCPertinentPapers: new FormControl({ value: false, disabled: readState }),
    }),
    dateOfHearing: new FormControl({ value: '', disabled: false }, Validators.required),
    timeOfHearing: new FormControl({ value: { hour: 8, minute: 0 }, disabled: false }, Validators.required),
    regionalDirector: new FormControl({ value: '', disabled: readState }, Validators.required),
    isDone: new FormControl({ value: false, disabled: false }, Validators.required),
  });
};

export const transmitterInput = (readOnly = false): FormGroup => {
  console.log(readOnly);
  if (readOnly) {
    console.log('ok');
    return new FormGroup({
      transmitter: new FormControl({ value: '', disabled: false }, Validators.required),
      serialNumber: new FormControl({ value: '', disabled: false }, Validators.required),
    });
  }
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
