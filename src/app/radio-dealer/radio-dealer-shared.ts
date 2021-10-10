import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    dateInspected: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    permitNumber: new FormControl({ value: '', disabled: false }),
    permitExpiryDate: new FormControl({ value: '', disabled: false }),
    supervisingECE: new FormArray([]),
    radioTechnicians: new FormArray([]),
    diagnosticTestEquipmentAndMeasuringInstrumentInfo: new FormGroup({
      reflectometer: new FormControl({ value: false, disabled: readState }),
      frequencyCounter: new FormControl({ value: false, disabled: readState }),
      powerMeter: new FormControl({ value: false, disabled: readState }),
      vtvmDigitalMultimeter: new FormControl({ value: false, disabled: readState }),
      signalGenerator: new FormControl({ value: false, disabled: readState }),
      oscilloscope: new FormControl({ value: false, disabled: readState }),
      vomDigitalMultimeter: new FormControl({ value: false, disabled: readState }),
      dummyLoadAntenna: new FormControl({ value: false, disabled: readState }),
    }),
    isLaboratoryRoomShielded: new FormControl({ value: false, disabled: readState }),
    remarks: new FormControl({ value: '', disabled: readState }),
    radioRegulationInspector: new FormControl({ value: '', disabled: readState }),
    ownerName: new FormControl({ value: '', disabled: readState }),
    recommendations: new FormControl({ value: '', disabled: readState }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
  });
};

export const supervisingECEInput = (): FormGroup => {
  return new FormGroup({
    name: new FormControl({ value: '', disabled: false }),
    licenseNumber: new FormControl({ value: '', disabled: false }),
    expiryDate: new FormControl({ value: '', disabled: false }),
    ptrNumber: new FormControl({ value: '', disabled: false }),
    dateIssued: new FormControl({ value: '', disabled: false }),
  });
};

export const techniciansInput = (): FormGroup => {
  return new FormGroup({
    name: new FormControl({ value: '', disabled: false }),
    particularsOfLicense: new FormControl({ value: '', disabled: false }),
    expiryDate: new FormControl({ value: '', disabled: false }),
  });
};
