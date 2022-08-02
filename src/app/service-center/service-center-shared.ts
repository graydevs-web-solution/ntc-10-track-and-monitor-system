import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    dateInspected: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    permitNumber: new FormControl({ value: '', disabled: readState }),
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
    regionalDirector: new FormControl({ value: '', disabled: readState }),
    notedByApproved: new FormControl({ value: '', disabled: false }),
    regionalDirectorApproved: new FormControl({ value: '', disabled: false }),
  });
};

export const serviceOrTestEquipmentInput = (readState = false): FormGroup => {
  return new FormGroup({
    particular: new FormControl({ value: '', disabled: readState }),
    numberOfUnits: new FormControl({ value: 0, disabled: readState }),
  });
};

export const employedETInput = (readState = false): FormGroup => {
  return new FormGroup({
    name: new FormControl({ value: '', disabled: readState }),
    qualifications: new FormControl({ value: '', disabled: readState }),
  });
};
