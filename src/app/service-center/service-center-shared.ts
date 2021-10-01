import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    dateInspected: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    permitNumber: new FormControl({ value: '', disabled: false }),
    permitExpiryDate: new FormControl({ value: '', disabled: false }),
    listOfServiceOrTestEquipments: new FormArray([]),
    employedElectronicsTechnicians: new FormArray([]),
    sundryOfInformation: new FormGroup({
      one: new FormControl({ value: '', disabled: readState }),
      two: new FormControl({ value: '', disabled: readState }),
      three: new FormControl({ value: '', disabled: readState }),
    }),
    remarksDeficienciesDiscrepanciesNoted: new FormControl({ value: '', disabled: readState }),
    inspectedBy: new FormControl({ value: '', disabled: readState }),
    ownerInfo: new FormGroup({
      name: new FormControl({ value: '', disabled: readState }),
      position: new FormControl({ value: '', disabled: readState }),
    }),
    recommendations: new FormControl({ value: '', disabled: readState }),
    notedBy: new FormControl({ value: '', disabled: readState }),
    isApproved: new FormControl({ value: false, disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
  });
};

export const serviceOrTestEquipmentInput = (): FormGroup => {
  return new FormGroup({
    particular: new FormControl({ value: '', disabled: false }),
    numberOfUnits: new FormControl({ value: 0, disabled: false }),
  });
};

export const employedETInput = (): FormGroup => {
  return new FormGroup({
    name: new FormControl({ value: '', disabled: false }),
    qualifications: new FormControl({ value: '', disabled: false }),
  });
};
